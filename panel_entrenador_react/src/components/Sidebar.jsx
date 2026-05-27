import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const nav = [
  {
    group: 'Principal', items: [
      { to: '/dashboard', icon: 'fa-house', label: 'Dashboard' },
      { to: '/perfil', icon: 'fa-user', label: 'Perfil' },
      { to: '/gestion', icon: 'fa-people-group', label: 'Deportistas' },
      { to: '/horario', icon: 'fa-calendar-days', label: 'Horario' },
    ]
  },
  {
    group: 'Análisis', items: [
      { to: '/estadisticas', icon: 'fa-chart-bar', label: 'Estadísticas' },
      { to: '/rutinas', icon: 'fa-dumbbell', label: 'Rutinas' },
      { to: '/reportes', icon: 'fa-file-lines', label: 'Reportes' },
      { to: '/analisis', icon: 'fa-microchip', label: 'Análisis IA' },
    ]
  },
  {
    group: 'Sistema', items: [
      { to: '/configuracion', icon: 'fa-gear', label: 'Configuración' },
    ]
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sb-logo">
        <img src="Vollei.jpeg" alt="VolleyAI" className="sb-logo-icon" style={{ width: '42px', height: '42px', borderRadius: '12px', objectFit: 'cover' }} /><div>
          <div className="sb-logo-name">VolleyAI</div>
          <div className="sb-logo-role">Entrenador</div>
        </div>
      </div>

      <nav className="sb-nav">
        {nav.map(({ group, items }) => (
          <div key={group}>
            <div className="sb-group-label">{group}</div>
            {items.map(({ to, icon, label }) => (
              <NavLink key={to} className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')} to={to}>
                <i className={`fa-solid ${icon}`}></i><span>{label}</span>
              </NavLink>
            ))}
          </div>
        ))}
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
