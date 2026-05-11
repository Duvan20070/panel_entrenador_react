import { NavLink } from 'react-router-dom';
import './Sidebar.css';


export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sb-logo">
        
        <div>
          <div className="sb-logo-name">VolleyAI</div>
          <div className="sb-logo-role">Entrenador</div>
        </div>
      </div>

      <nav className="sb-nav">
        <div className="sb-group-label">Principal</div>
        <NavLink className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')} to="/dashboard">
          <i className="fa-solid fa-house"></i><span>Dashboard</span>
        </NavLink>
        <NavLink className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')} to="/gestion">
          <i className="fa-solid fa-people-group"></i><span>Deportistas</span>
        </NavLink>

        <div className="sb-group-label">Análisis</div>
        <NavLink className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')} to="/estadisticas">
          <i className="fa-solid fa-chart-bar"></i><span>Estadísticas</span>
        </NavLink>
        <NavLink className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')} to="/analisis">
          <i className="fa-solid fa-microchip"></i><span>Análisis IA</span>
        </NavLink>

        <div className="sb-group-label">Sistema</div>
        <NavLink className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')} to="/configuracion">
          <i className="fa-solid fa-gear"></i><span>Configuración</span>
        </NavLink>
      </nav>

      <div className="sb-footer">
        <div className="sb-avatar">AL</div>
        <div className="sb-foot-info">
          <div className="sb-foot-name">Agustín Luligo</div>
          <div className="sb-foot-role">Entrenador principal</div>
        </div>
        <span className="sb-online-dot"></span>
      </div>
    </aside>
  );
}
