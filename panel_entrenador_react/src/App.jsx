import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Gestion from './pages/Gestion';
import Estadisticas from './pages/Estadisticas';
import Analisis from './pages/Analisis';
import Configuracion from './pages/Configuracion';
import Perfil from './pages/Perfil';
import Horario from './pages/Horario';
import Rutinas from './pages/Rutinas';
import Reportes from './pages/Reportes';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/gestion" element={<Gestion />} />
          <Route path="/horario" element={<Horario />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/rutinas" element={<Rutinas />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/analisis" element={<Analisis />} />
          <Route path="/configuracion" element={<Configuracion />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
