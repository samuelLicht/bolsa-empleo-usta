import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import CompanyLogin from './components/company-login/CompanyLogin'
import CompanyRegister from './components/company-register/CompanyRegister'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/company/register" replace />} />
      <Route path="/company/login" element={<CompanyLogin />} />
      <Route path="/company/register" element={<CompanyRegister />} />
    </Routes>
  )
}

export default App
