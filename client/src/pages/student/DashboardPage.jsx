import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/student/Navbar';
import { getHistory, getJobs } from '../../services/student.service';
import mascotaEstudiante from '../../assets/mascotaSantotoAmorYPaz.png';
import edificio from '../../assets/santotoSolo1.png';
import universidad from '../../assets/UniversidadSantoto.png';


const StatIcon = ({ type }) => {
  const icons = {
    pending: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
    accepted: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
        <polyline points="22,4 12,14.01 9,11.01"/>
      </svg>
    ),
    rejected: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    ),
    total: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  };
  return icons[type];
};

const DashboardPage = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ pending: 0, accepted: 0, rejected: 0 });
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historyRes, jobsRes] = await Promise.all([
          getHistory(token),
          getJobs(token),
        ]);
        const applications = historyRes.data.applications;
        setStats({
          pending: applications.filter(a => a.status === 'Pendiente').length,
          accepted: applications.filter(a => a.status === 'Aceptado').length,
          rejected: applications.filter(a => a.status === 'Rechazado').length,
        });
        setRecentJobs(jobsRes.data.jobs.slice(0, 3));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  if (loading) return (
    <div className="page-layout">
      <Navbar />
      <div className="page-content loading-screen">
        <div className="spinner" />
        <p>Cargando tu espacio...</p>
      </div>
    </div>
  );

  const totalApps = stats.pending + stats.accepted + stats.rejected;

  return (
    <div className="page-layout">
      <Navbar />
      <main className="page-content">

    {/* Hero Banner */}
<div className="hero-banner">
 <img src={universidad} alt="" className="hero-bg-img" />

  <div className="hero-banner-content">
    <span className="hero-eyebrow">Portal Estudiantil USTA</span>
    <h1 className="hero-title">
      {getGreeting()},<br />
      <span className="hero-name">{user?.name?.split(' ')[0]}.</span>
    </h1>
    <p className="hero-subtitle">
      Tu próxima oportunidad profesional está a un paso.<br />
      Conecta con empresas que valoran el talento Tomasino.
    </p>
    <div className="hero-actions">
      <button className="btn-hero-primary" onClick={() => navigate('/student/jobs')}>
        Explorar ofertas
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12,5 19,12 12,19"/>
        </svg>
      </button>
      <button className="btn-hero-secondary" onClick={() => navigate('/student/profile')}>
        Completar perfil
      </button>
    </div>
  </div>
  <div className="hero-banner-image">
    <div className="hero-tomasino-bubble">
  Tienes <strong>{recentJobs.length}</strong> oferta{recentJobs.length !== 1 ? 's' : ''} nueva{recentJobs.length !== 1 ? 's' : ''} disponible{recentJobs.length !== 1 ? 's' : ''}.
</div>
    <img src={mascotaEstudiante} alt="Tomasino estudiante" className="hero-mascota" />
  </div>
</div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap stat-icon-pending">
              <StatIcon type="pending" />
            </div>
            <div className="stat-info">
              <span className="stat-number">{stats.pending}</span>
              <span className="stat-label">En revisión</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrap stat-icon-accepted">
              <StatIcon type="accepted" />
            </div>
            <div className="stat-info">
              <span className="stat-number">{stats.accepted}</span>
              <span className="stat-label">Aceptadas</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrap stat-icon-rejected">
              <StatIcon type="rejected" />
            </div>
            <div className="stat-info">
              <span className="stat-number">{stats.rejected}</span>
              <span className="stat-label">No seleccionado</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrap stat-icon-total">
              <StatIcon type="total" />
            </div>
            <div className="stat-info">
              <span className="stat-number">{totalApps}</span>
              <span className="stat-label">Total postulaciones</span>
            </div>
          </div>
        </div>

        {/* Ofertas recientes */}
        <div className="section-header">
          <div>
            <h2 className="section-title">Ofertas recientes</h2>
            <p className="section-sub">Las últimas oportunidades publicadas para ti</p>
          </div>
          <button className="btn-link" onClick={() => navigate('/student/jobs')}>
            Ver todas
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12,5 19,12 12,19"/>
            </svg>
          </button>
        </div>

        {recentJobs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon-wrap">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <p>No hay ofertas disponibles por el momento.</p>
            <span>Vuelve pronto para encontrar nuevas oportunidades.</span>
          </div>
        ) : (
          <div className="jobs-grid">
            {recentJobs.map((job) => (
              <div key={job._id} className="job-card">
                <div className="job-card-top">
                  <div className="job-company-initial">
                    {(job.company?.companyName || 'E').charAt(0)}
                  </div>
                  <span className={`modality-badge modality-${job.modality.toLowerCase().replace('í','i')}`}>
                    {job.modality}
                  </span>
                </div>
                <h3 className="job-title">{job.title}</h3>
                <p className="job-company">{job.company?.companyName || 'Empresa'}</p>
                <div className="job-tags">
                  <span className="job-tag">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {job.location}
                  </span>
                  <span className="job-tag">{job.contractType}</span>
                </div>
                <button className="btn-card" onClick={() => navigate('/student/jobs')}>
                  Ver oferta
                </button>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default DashboardPage;