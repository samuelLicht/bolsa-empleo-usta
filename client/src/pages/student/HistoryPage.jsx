import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/student/Navbar';
import { getHistory } from '../../services/student.service';

const HistoryPage = () => {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('Todos');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getHistory(token);
        setApplications(res.data.applications);
      } catch {
        setError('Error al cargar el historial');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [token]);

  const statusConfig = {
    Pendiente: { color: 'status-pending', icon: '⏳' },
    Aceptado: { color: 'status-accepted', icon: '✅' },
    Rechazado: { color: 'status-rejected', icon: '❌' },
  };

  const filtered = filter === 'Todos'
    ? applications
    : applications.filter(a => a.status === filter);

  if (loading) return (
    <div className="page-layout">
      <Navbar />
      <div className="page-content loading-screen">
        <div className="spinner" />
        <p>Cargando historial...</p>
      </div>
    </div>
  );

  return (
    <div className="page-layout">
      <Navbar />
      <main className="page-content">

        <div className="dashboard-header">
          <div>
            <h1 className="page-title">Mis Aplicaciones</h1>
            <p className="dashboard-subtitle">
              Seguimiento de todas tus postulaciones.
            </p>
          </div>
          <span className="jobs-count">{applications.length} aplicaciones</span>
        </div>

        {error && <div className="alert-error">{error}</div>}

        {/* Filtros de estado */}
        <div className="status-filters">
          {['Todos', 'Pendiente', 'Aceptado', 'Rechazado'].map(status => (
            <button
              key={status}
              className={`status-filter-btn ${filter === status ? 'status-filter-active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status === 'Todos' ? '📋' : statusConfig[status]?.icon} {status}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <p>
              {filter === 'Todos'
                ? 'Aún no has aplicado a ninguna oferta.'
                : `No tienes aplicaciones con estado "${filter}".`}
            </p>
          </div>
        ) : (
          <div className="history-list">
            {filtered.map((app) => (
              <div key={app._id} className="history-card">
                <div className="history-card-left">
                  <div className={`status-indicator ${statusConfig[app.status]?.color}`}>
                    {statusConfig[app.status]?.icon}
                  </div>
                </div>
                <div className="history-card-content">
                  <div className="history-card-header">
                    <h3 className="job-title">
                      {app.jobOffer?.title || 'Oferta eliminada'}
                    </h3>
                    <span className={`status-badge ${statusConfig[app.status]?.color}`}>
                      {app.status}
                    </span>
                  </div>
                  <p className="job-company">
                    🏢 {app.jobOffer?.company?.companyName || 'Empresa'}
                  </p>
                  <div className="job-tags">
                    {app.jobOffer?.location && (
                      <span className="job-tag">📍 {app.jobOffer.location}</span>
                    )}
                    {app.jobOffer?.modality && (
                      <span className="job-tag">{app.jobOffer.modality}</span>
                    )}
                    {app.jobOffer?.contractType && (
                      <span className="job-tag">{app.jobOffer.contractType}</span>
                    )}
                  </div>
                  {app.coverLetter && (
                    <div className="cover-letter">
                      <strong>Tu carta:</strong>
                      <p>{app.coverLetter}</p>
                    </div>
                  )}
                  <p className="application-date">
                    Aplicado el {new Date(app.createdAt).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HistoryPage;