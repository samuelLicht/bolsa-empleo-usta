import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import mascota from '../../assets/mascotaSantoto.png';

const icons = {
  home: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  ),
  jobs: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
    </svg>
  ),
  profile: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  history: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  logout: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
      <polyline points="16,17 21,12 16,7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
};

const navItems = [
  { path: '/student/dashboard', icon: icons.home, label: 'Inicio', sub: 'Panel principal' },
  { path: '/student/jobs', icon: icons.jobs, label: 'Ofertas', sub: 'Explora oportunidades' },
  { path: '/student/profile', icon: icons.profile, label: 'Mi Perfil', sub: 'Gestiona tu información' },
  { path: '/student/history', icon: icons.history, label: 'Mis Aplicaciones', sub: 'Seguimiento de postulaciones' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="navbar">
      <div className="navbar-header">
        <div className="navbar-logo">
          <span className="navbar-logo-text">Bolsa</span>
          <span className="navbar-logo-accent">USTA</span>
        </div>
        <p className="navbar-logo-sub">Portal Estudiantil</p>
        <div className="navbar-user">
          <div className="navbar-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="navbar-user-info">
            <span className="navbar-user-name">{user?.name}</span>
            <span className="navbar-user-role">Estudiante</span>
          </div>
        </div>
      </div>

      <nav className="navbar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `navbar-item ${isActive ? 'navbar-item-active' : ''}`
            }
          >
            <span className="navbar-item-icon">{item.icon}</span>
            <span className="navbar-item-text">
              <span className="navbar-item-label">{item.label}</span>
              <span className="navbar-item-sub">{item.sub}</span>
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="navbar-footer">
        <img src={mascota} alt="Tomasino" className="navbar-mascota-img" />
        <button onClick={handleLogout} className="navbar-logout">
          {icons.logout}
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Navbar;