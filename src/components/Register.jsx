import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Button } from '@/components/ui/button.jsx';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

function Register({ onNavigate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Criar usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Salvar informações adicionais no Firestore
      // IMPORTANTE: Nunca armazene senhas em texto plano no Firestore
      // O Firebase Authentication já gerencia as senhas de forma segura (hash)
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        createdAt: new Date().toISOString(),
        // Não armazenamos a senha aqui - ela é gerenciada pelo Firebase Authentication
      });

      // Adicionar à lista de usuários registrados
      setRegisteredUsers([...registeredUsers, { name, email }]);
      
      setSuccess(true);
      setName('');
      setEmail('');
      setPassword('');
      
      // Fazer logout do usuário recém-criado
      await auth.signOut();

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Este e-mail já está cadastrado.');
          break;
        case 'auth/invalid-email':
          setError('E-mail inválido.');
          break;
        case 'auth/weak-password':
          setError('A senha deve ter pelo menos 6 caracteres.');
          break;
        default:
          setError('Erro ao cadastrar usuário. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <div className="company-logo">
            <div className="logo-icon">
              <div className="logo-cube"></div>
            </div>
            <span className="company-name">Company</span>
          </div>
          <div className="user-avatar">
            <User size={24} />
          </div>
        </div>

        <h1 className="auth-title">Cadastro de Usuários</h1>

        <form onSubmit={handleRegister} className="auth-form">
          <div className="input-group">
            <User className="input-icon" size={20} />
            <input
              type="text"
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <div className="input-group password-group">
            <Lock className="input-icon" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="auth-input password-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Usuário cadastrado com sucesso!</div>}

          <Button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>

        {registeredUsers.length > 0 && (
          <div className="registered-users">
            <h3>Registrados Users</h3>
            <table className="users-table">
              <thead>
                <tr>
                  <th>☐</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {registeredUsers.map((user, index) => (
                  <tr key={index}>
                    <td>☐</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button onClick={() => onNavigate('login')} className="back-button">
          ← Voltar para Login
        </button>
      </div>
    </div>
  );
}

export default Register;
