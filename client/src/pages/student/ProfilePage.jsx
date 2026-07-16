import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/student/Navbar';
import { getProfile, updateProfile } from '../../services/student.service';

const ProfilePage = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    career: '',
    semester: '',
    description: '',
    cvLink: '',
    skills: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile(token);
        const data = res.data.student;
        setProfile(data);
        setForm({
          name: data.name || '',
          career: data.career || '',
          semester: data.semester || '',
          description: data.description || '',
          cvLink: data.cvLink || '',
          skills: data.skills?.join(', ') || '',
        });
      } catch (err) {
        setError('Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const updates = {
        ...form,
        semester: Number(form.semester),
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
      };
      const res = await updateProfile(token, updates);
      setProfile(res.data.student);
      setSuccess('Perfil actualizado correctamente');
      setEditing(false);
    } catch {
      setError('Error al actualizar el perfil');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="page-layout">
      <Navbar />
      <div className="page-content loading-screen">
        <div className="spinner" />
        <p>Cargando perfil...</p>
      </div>
    </div>
  );

  return (
    <div className="page-layout">
      <Navbar />
      <main className="page-content">

        <div className="dashboard-header">
          <div>
            <h1 className="page-title">Mi Perfil</h1>
            <p className="dashboard-subtitle">Gestiona tu información personal y profesional.</p>
          </div>
          {!editing ? (
            <button className="btn-primary" onClick={() => setEditing(true)}>
              ✏️ Editar perfil
            </button>
          ) : (
            <div className="btn-group">
              <button className="btn-secondary" onClick={() => setEditing(false)}>
                Cancelar
              </button>
              <button className="btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Guardando...' : '💾 Guardar'}
              </button>
            </div>
          )}
        </div>

        {success && <div className="alert-success">{success}</div>}
        {error && <div className="alert-error">{error}</div>}

        <div className="profile-grid">
          {/* Avatar */}
          <div className="profile-card profile-avatar-card">
            <div className="profile-avatar-circle">
              {profile?.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="profile-name">{profile?.name}</h2>
            <p className="profile-email">{profile?.email}</p>
            <span className="profile-badge">Estudiante USTA</span>
          </div>

          {/* Info */}
          <div className="profile-card profile-info-card">
            <h3 className="card-title">Información académica</h3>

            <div className="form-group">
              <label>Nombre completo</label>
              {editing ? (
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="form-input"
                />
              ) : (
                <p className="profile-value">{profile?.name || '—'}</p>
              )}
            </div>

            <div className="form-group">
              <label>Carrera</label>
              {editing ? (
                <input
                  value={form.career}
                  onChange={e => setForm({ ...form, career: e.target.value })}
                  className="form-input"
                  placeholder="Ej: Ingeniería de Sistemas"
                />
              ) : (
                <p className="profile-value">{profile?.career || '—'}</p>
              )}
            </div>

            <div className="form-group">
              <label>Semestre</label>
              {editing ? (
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={form.semester}
                  onChange={e => setForm({ ...form, semester: e.target.value })}
                  className="form-input"
                />
              ) : (
                <p className="profile-value">{profile?.semester || '—'}</p>
              )}
            </div>

            <div className="form-group">
              <label>Descripción</label>
              {editing ? (
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="form-input form-textarea"
                  placeholder="Cuéntanos sobre ti..."
                  rows={3}
                />
              ) : (
                <p className="profile-value">{profile?.description || '—'}</p>
              )}
            </div>

            <div className="form-group">
              <label>Habilidades <span className="label-hint">(separadas por coma)</span></label>
              {editing ? (
                <input
                  value={form.skills}
                  onChange={e => setForm({ ...form, skills: e.target.value })}
                  className="form-input"
                  placeholder="JavaScript, React, Node.js"
                />
              ) : (
                <div className="skills-list">
                  {profile?.skills?.length > 0
                    ? profile.skills.map((s, i) => (
                        <span key={i} className="skill-badge">{s}</span>
                      ))
                    : <p className="profile-value">—</p>
                  }
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Link CV</label>
              {editing ? (
                <input
                  value={form.cvLink}
                  onChange={e => setForm({ ...form, cvLink: e.target.value })}
                  className="form-input"
                  placeholder="https://drive.google.com/..."
                />
              ) : (
                profile?.cvLink
                  ? <a href={profile.cvLink} target="_blank" rel="noreferrer" className="cv-link">
                      📄 Ver CV
                    </a>
                  : <p className="profile-value">—</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;