import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Button } from '@/components/ui/button.jsx';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

function Login({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login bem-sucedido - o estado de autenticação será gerenciado pelo Firebase
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      switch (error.code) {
        case 'auth/user-not-found':
          setError('Usuário não encontrado.');
          break;
        case 'auth/wrong-password':
          setError('Senha incorreta.');
          break;
        case 'auth/invalid-email':
          setError('E-mail inválido.');
          break;
        case 'auth/invalid-credential':
          setError('Credenciais inválidas.');
          break;
        default:
          setError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="company-logo">
            <div className="logo-icon">
              <div className="logo-cube"></div>
            </div>
            <span className="company-name">Company</span>
          </div>
        </div>

        <h1 className="auth-title">Login</h1>

        <form onSubmit={handleLogin} className="auth-form">
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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

          <div className="remember-me">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember">Remember me</label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <Button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Login'}
          </Button>
        </form>

        <p className="auth-footer">
          Não tem uma conta?{' '}
          <button onClick={() => onNavigate('register')} className="link-button">
            Cadastre-se aqui
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
