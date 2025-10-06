import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Button } from '@/components/ui/button.jsx';
import { LogOut, User } from 'lucide-react';
import './Dashboard.css';

function Dashboard({ user }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div className="company-logo">
            <div className="logo-icon">
              <div className="logo-cube"></div>
            </div>
            <span className="company-name">Company</span>
          </div>
          <Button onClick={handleLogout} className="logout-button">
            <LogOut size={20} />
            Sair
          </Button>
        </div>

        <div className="welcome-section">
          <div className="user-icon">
            <User size={48} />
          </div>
          <h1 className="welcome-title">Bem-vindo!</h1>
          <p className="user-email">{user.email}</p>
        </div>

        <div className="dashboard-content">
          <div className="info-card">
            <h3>Autenticação Bem-Sucedida</h3>
            <p>Você está logado no sistema com sucesso.</p>
          </div>

          <div className="info-card">
            <h3>Informações da Conta</h3>
            <div className="info-list">
              <div className="info-item">
                <span className="info-label">E-mail:</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">ID do Usuário:</span>
                <span className="info-value">{user.uid}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Última Autenticação:</span>
                <span className="info-value">
                  {new Date(user.metadata.lastSignInTime).toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
