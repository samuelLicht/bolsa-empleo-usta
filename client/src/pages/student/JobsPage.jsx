import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/student/Navbar';
import { getJobs, applyToJob } from '../../services/student.service';

const JobsPage = () => {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    location: '',
    modality: '',
    contractType: '',
    salaryCurrency: '',
  });

  const fetchJobs = async (activeFilters = {}) => {
    setLoading(true);
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(activeFilters).filter(([, v]) => v !== '')
      );
      const res = await getJobs(token, cleanFilters);
      setJobs(res.data.jobs);
    } catch {
      setError('Error al cargar las ofertas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [token]);

  const handleFilter = () => fetchJobs(filters);

  const handleClearFilters = () => {
    setFilters({ location: '', modality: '', contractType: '', salaryCurrency: '' });
    fetchJobs();
  };

  const handleApply = async () => {
    if (!selectedJob) return;
    setApplying(selectedJob._id);
    setError('');
    setSuccess('');
    try {
      await applyToJob(token, selectedJob._id, coverLetter);
      setSuccess(`Aplicaste exitosamente a "${selectedJob.title}"`);
      setSelectedJob(null);
      setCoverLetter('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al aplicar');
    } finally {
      setApplying(null);
    }
  };

  return (
    <div className="page-layout">
      <Navbar />
      <main className="page-content">

        <div className="dashboard-header">
          <div>
            <h1 className="page-title">Ofertas de trabajo</h1>
            <p className="dashboard-subtitle">
              Encuentra la oportunidad ideal para ti.
            </p>
          </div>
          <span className="jobs-count">{jobs.length} ofertas disponibles</span>
        </div>

        {success && <div className="alert-success">{success}</div>}
        {error && <div className="alert-error">{error}</div>}

        {/* Filtros */}
        <div className="filters-card">
          <h3 className="filters-title">🔍 Filtrar ofertas</h3>
          <div className="filters-grid">
            <div className="form-group">
              <label>Ciudad</label>
              <input
                className="form-input"
                placeholder="Ej: Bogotá"
                value={filters.location}
                onChange={e => setFilters({ ...filters, location: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Modalidad</label>
              <select
                className="form-input"
                value={filters.modality}
                onChange={e => setFilters({ ...filters, modality: e.target.value })}
              >
                <option value="">Todas</option>
                <option value="Presencial">Presencial</option>
                <option value="Remoto">Remoto</option>
                <option value="Hibrido">Híbrido</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tipo de contrato</label>
              <select
                className="form-input"
                value={filters.contractType}
                onChange={e => setFilters({ ...filters, contractType: e.target.value })}
              >
                <option value="">Todos</option>
                <option value="Tiempo completo">Tiempo completo</option>
                <option value="Medio tiempo">Medio tiempo</option>
                <option value="Contrato temporal">Contrato temporal</option>
              </select>
            </div>
            <div className="form-group">
              <label>Moneda</label>
              <select
                className="form-input"
                value={filters.salaryCurrency}
                onChange={e => setFilters({ ...filters, salaryCurrency: e.target.value })}
              >
                <option value="">Todas</option>
                <option value="COP">COP</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
          <div className="filters-actions">
            <button className="btn-secondary" onClick={handleClearFilters}>
              Limpiar
            </button>
            <button className="btn-primary" onClick={handleFilter}>
              Buscar
            </button>
          </div>
        </div>

        {/* Lista de ofertas */}
        {loading ? (
          <div className="loading-screen">
            <div className="spinner" />
            <p>Buscando ofertas...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <p>No hay ofertas disponibles con estos filtros.</p>
            <button className="btn-link" onClick={handleClearFilters}>
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="jobs-list">
            {jobs.map((job) => (
              <div key={job._id} className="job-card-full">
                <div className="job-card-full-header">
                  <div>
                    <h3 className="job-title">{job.title}</h3>
                    <p className="job-company">
                      🏢 {job.company?.companyName || 'Empresa'}
                    </p>
                  </div>
                  <span className={`modality-badge modality-${job.modality.toLowerCase()}`}>
                    {job.modality}
                  </span>
                </div>

                <p className="job-description">{job.description}</p>

                <div className="job-tags">
                  <span className="job-tag">📍 {job.location}</span>
                  <span className="job-tag">📄 {job.contractType}</span>
                  {job.salary && (
                    <span className="job-tag">
                      💰 {job.salary.toLocaleString()} {job.salaryCurrency}
                    </span>
                  )}
                </div>

                <div className="job-requirements">
                  <strong>Requisitos:</strong> {job.requirements}
                </div>

                <button
                  className="btn-primary"
                  onClick={() => {
                    setSelectedJob(job);
                    setSuccess('');
                    setError('');
                  }}
                >
                  Aplicar ahora →
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Modal aplicar */}
        {selectedJob && (
          <div className="modal-overlay" onClick={() => setSelectedJob(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h2 className="modal-title">Aplicar a: {selectedJob.title}</h2>
              <p className="modal-company">
                🏢 {selectedJob.company?.companyName || 'Empresa'}
              </p>
              <div className="form-group">
                <label>Carta de presentación <span className="label-hint">(opcional)</span></label>
                <textarea
                  className="form-input form-textarea"
                  rows={5}
                  placeholder="Cuéntale a la empresa por qué eres el candidato ideal..."
                  value={coverLetter}
                  onChange={e => setCoverLetter(e.target.value)}
                />
              </div>
              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setSelectedJob(null)}>
                  Cancelar
                </button>
                <button
                  className="btn-primary"
                  onClick={handleApply}
                  disabled={applying === selectedJob._id}
                >
                  {applying === selectedJob._id ? 'Enviando...' : 'Enviar aplicación →'}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default JobsPage;