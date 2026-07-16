import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import DashboardPage from './pages/student/DashboardPage';
import ProfilePage from './pages/student/ProfilePage';
import JobsPage from './pages/student/JobsPage';
import HistoryPage from './pages/student/HistoryPage';

const ProtectedRoute = ({ children }) => {
  const { user, token, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;
  if (!token || !user) return <Navigate to="/login" replace />;
  if (user.role !== 'student') return <Navigate to="/login" replace />;
  return children;
};

// Página temporal de login para pruebas
const TempLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch('http://localhost:3000/api/students/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'samuel@usta.edu.co', password: '123456' }),
    });
    const data = await res.json();
    login(data.token, { ...data.student, role: 'student' });
    navigate('/student/dashboard');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button onClick={handleLogin} style={{ padding: '1rem 2rem', fontSize: '1rem', cursor: 'pointer' }}>
        Entrar como estudiante (prueba)
      </button>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<TempLogin />} />
      <Route path="/student/dashboard" element={
        <ProtectedRoute><DashboardPage /></ProtectedRoute>
      } />
      <Route path="/student/profile" element={
        <ProtectedRoute><ProfilePage /></ProtectedRoute>
      } />
      <Route path="/student/jobs" element={
        <ProtectedRoute><JobsPage /></ProtectedRoute>
      } />
      <Route path="/student/history" element={
        <ProtectedRoute><HistoryPage /></ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;