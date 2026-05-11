import { useState, useEffect } from 'react';
import './Configuracion.css';

const THEMES = [
  { id:'dark', name:'Oscuro', colors:['#0d0f1a','#131629','#7c5cfc'] },
  { id:'amoled', name:'AMOLED', colors:['#000000','#0a0a0a','#7c5cfc'] },
  { id:'navy', name:'Navy', colors:['#0f1923','#162032','#00d4ff'] },
  { id:'midnight', name:'Midnight', colors:['#12111a','#1a1828','#e056fd'] },
];

const ACCENT_COLORS = [
  { name:'Violeta', val:'#7c5cfc' },{ name:'Cian', val:'#00d4ff' },
  { name:'Verde', val:'#26de81' },  { name:'Naranja', val:'#ff9f43' },
  { name:'Rojo', val:'#ff6b6b' },   { name:'Rosa', val:'#e056fd' },
];

const NOTIF_TYPES = [
  'Nuevas rutinas asignadas','Recordatorio de sesión (30 min antes)',
  'Reportes generados por IA','Inasistencias de deportistas',
  'Actualizaciones del sistema','Consejos de entrenamiento semanales',
];

export default function Configuracion() {
  const [section, setSection] = useState('perfil');
  const [dirty, setDirty] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [selectedAccent, setSelectedAccent] = useState('#7c5cfc');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ nombre:'Agustín', apellido:'Luligo', email:'agustin@volleyai.com', telefono:'+57 300 123 4567', rol:'Entrenador principal', bio:'Entrenador de voleibol con 8 años de experiencia.' });

  function toast(icon, msg, color='var(--accent)') {
    const id = Date.now();
    setToasts(prev => [...prev, { id, icon, msg, color }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }

  function markDirty() { setDirty(true); }

  function saveAll() {
    setDirty(false);
    toast('✅', 'Configuración guardada correctamente', 'var(--accent5)');
  }

  const navItems = [
    { id:'perfil', label:'Perfil', icon:'👤' },
    { id:'seguridad', label:'Seguridad', icon:'🔐' },
    { id:'tema', label:'Tema', icon:'🎨' },
    { id:'notificaciones', label:'Notificaciones', icon:'🔔' },
    { id:'equipo', label:'Equipo', icon:'👥' },
    { id:'peligro', label:'Eliminar', icon:'⚠️' },
  ];

  return (
    <main className="conf-main">
      <header className="topbar">
        <div className="topbar-left">
          <div className="page-title">⚙ <span>Configuración</span></div>
          {dirty && <div className="unsaved-badge show">Cambios sin guardar</div>}
        </div>
        <div className="topbar-actions">
          <button className="btn btn-ghost" onClick={() => { setDirty(false); toast('↩','Cambios descartados','var(--muted)'); }}>↺ Descartar</button>
          <button className="btn btn-primary" onClick={saveAll}>Guardar cambios</button>
        </div>
      </header>

      <div className="content">
        <nav className="settings-nav">
          {navItems.map(n => (
            <div key={n.id} className={`snav-item ${section===n.id?'active':''}`} onClick={() => setSection(n.id)}>
              <span className="sni">{n.icon}</span> {n.label}
            </div>
          ))}
        </nav>

        <section className="settings-content">

          {/* PERFIL */}
          {section === 'perfil' && (
            <div className="settings-section active">
              <header className="section-header">
                <div className="section-title">Perfil personal</div>
                <div className="section-desc">Administra tu información pública y datos de contacto.</div>
              </header>
              <div className="setting-card">
                <div className="setting-card-title">Foto de perfil</div>
                <div className="avatar-section">
                  <div className="avatar-preview">AL<div className="avatar-overlay">📷</div></div>
                  <div>
                    <div className="avatar-name">{form.nombre} {form.apellido}</div>
                    <div className="avatar-role">Entrenador principal · VolleyAI</div>
                  </div>
                </div>
              </div>
              <div className="setting-card">
                <div className="setting-card-title">Información básica</div>
                <div className="grid2" style={{gap:'12px'}}>
                  {[['NOMBRE','nombre'],['APELLIDO','apellido'],['EMAIL','email'],['TELÉFONO','telefono']].map(([label,key]) => (
                    <div key={key}>
                      <div style={{fontSize:'11px',color:'var(--muted)',marginBottom:'5px'}}>{label}</div>
                      <input className="field-input" value={form[key]} onChange={e => { setForm(f=>({...f,[key]:e.target.value})); markDirty(); }} style={{width:'100%'}} />
                    </div>
                  ))}
                  <div>
                    <div style={{fontSize:'11px',color:'var(--muted)',marginBottom:'5px'}}>ROL</div>
                    <select className="field-select" value={form.rol} onChange={e=>{setForm(f=>({...f,rol:e.target.value}));markDirty();}} style={{width:'100%'}}>
                      {['Entrenador principal','Asistente técnico','Preparador físico','Analista de datos'].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{marginTop:'12px'}}>
                  <div style={{fontSize:'11px',color:'var(--muted)',marginBottom:'5px'}}>BIO</div>
                  <textarea className="field-input" value={form.bio} onChange={e=>{setForm(f=>({...f,bio:e.target.value}));markDirty();}} style={{width:'100%',resize:'vertical',minHeight:'64px'}}/>
                </div>
              </div>
            </div>
          )}

          {/* SEGURIDAD */}
          {section === 'seguridad' && (
            <div className="settings-section active">
              <header className="section-header">
                <div className="section-title">Seguridad</div>
                <div className="section-desc">Protege tu cuenta con contraseñas seguras.</div>
              </header>
              <div className="setting-card">
                <div className="setting-card-title">Contraseña</div>
                {['CONTRASEÑA ACTUAL','NUEVA CONTRASEÑA','CONFIRMAR CONTRASEÑA'].map(l=>(
                  <div key={l} style={{marginBottom:'10px'}}>
                    <div style={{fontSize:'11px',color:'var(--muted)',marginBottom:'5px'}}>{l}</div>
                    <input className="field-input" type="password" placeholder="••••••••" style={{width:'100%'}} onChange={markDirty}/>
                  </div>
                ))}
                <button className="btn btn-success" onClick={() => toast('🔑','Contraseña actualizada correctamente','var(--accent5)')}>Cambiar contraseña</button>
              </div>
              <div className="setting-card">
                <div className="setting-card-title">📱 Autenticación de dos factores</div>
                {[['Activar 2FA','Protección adicional al iniciar sesión',false],['2FA por SMS','Código vía mensaje de texto',true]].map(([name,desc,checked])=>(
                  <div key={name} className="field-row">
                    <div className="field-info"><div className="field-name">{name}</div><div className="field-desc">{desc}</div></div>
                    <label className="toggle"><input type="checkbox" defaultChecked={checked} onChange={markDirty}/><div className="toggle-slider"></div></label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TEMA */}
          {section === 'tema' && (
            <div className="settings-section active">
              <header className="section-header">
                <div className="section-title">Tema & Apariencia</div>
                <div className="section-desc">Personaliza la apariencia visual de VolleyAI.</div>
              </header>
              <div className="setting-card">
                <div className="setting-card-title">Modo de pantalla</div>
                <div className="theme-options">
                  {THEMES.map(t => (
                    <div key={t.id} className={`theme-card ${selectedTheme===t.id?'selected':''}`} onClick={()=>{setSelectedTheme(t.id);markDirty();toast('',`Tema "${t.name}" aplicado`,'var(--accent)');}}>
                      <div className="theme-preview" style={{background:`linear-gradient(135deg,${t.colors[0]} 0%,${t.colors[1]} 100%)`}}>
                        <div style={{position:'absolute',bottom:'6px',left:'8px',right:'8px',height:'4px',borderRadius:'4px',background:t.colors[2],opacity:.7}}></div>
                      </div>
                      <div className="theme-check">✓</div>
                      <div className="theme-name">{t.name}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="setting-card">
                <div className="setting-card-title">Color de acento</div>
                <div className="accent-options">
                  {ACCENT_COLORS.map(a => (
                    <div key={a.val} className={`accent-dot ${selectedAccent===a.val?'selected':''}`}
                      style={{background:a.val}} title={a.name}
                      onClick={()=>{setSelectedAccent(a.val);markDirty();toast('',`Acento: ${a.name}`,'var(--accent)');}}>
                      {selectedAccent===a.val?'✓':''}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICACIONES */}
          {section === 'notificaciones' && (
            <div className="settings-section active">
              <header className="section-header">
                <div className="section-title">Notificaciones</div>
                <div className="section-desc">Controla qué alertas recibes y por qué canal.</div>
              </header>
              <div className="setting-card">
                <div className="setting-card-title">Canales</div>
                {[['Notificaciones push','Alertas en el navegador',true],['Email','Resumen diario',true],['SMS','Solo alertas críticas',false]].map(([name,desc,def])=>(
                  <div key={name} className="field-row">
                    <div className="field-info"><div className="field-name">{name}</div><div className="field-desc">{desc}</div></div>
                    <label className="toggle"><input type="checkbox" defaultChecked={def} onChange={markDirty}/><div className="toggle-slider"></div></label>
                  </div>
                ))}
              </div>
              <div className="setting-card">
                <div className="setting-card-title">Tipo de alertas</div>
                {NOTIF_TYPES.map(n => (
                  <div key={n} className="field-row">
                    <div className="field-info"><div className="field-name">{n}</div></div>
                    <label className="toggle"><input type="checkbox" defaultChecked onChange={markDirty}/><div className="toggle-slider"></div></label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EQUIPO */}
          {section === 'equipo' && (
            <div className="settings-section active">
              <header className="section-header">
                <div className="section-title">Equipo</div>
                <div className="section-desc">Gestiona los miembros y roles del equipo técnico.</div>
              </header>
              <div className="setting-card">
                <div className="setting-card-title">Miembros del equipo</div>
                <div style={{overflowX:'auto'}}>
                  <table className="member-table">
                    <thead><tr><th>Miembro</th><th>Email</th><th>Rol</th><th>Acciones</th></tr></thead>
                    <tbody>
                      {[{name:'Agustín Luligo',email:'agustin@volleyai.com',role:'Admin',color:'#7c5cfc'},
                        {name:'Carla Ríos',email:'carla@volleyai.com',role:'Entrenador',color:'#26de81'},
                        {name:'Pedro Gómez',email:'pedro@volleyai.com',role:'Analista',color:'#f7b731'}].map(m=>(
                        <tr key={m.name}>
                          <td><div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                            <div className="member-avatar" style={{background:m.color+'20',color:m.color,border:`1px solid ${m.color}30`}}>{m.name.split(' ').map(p=>p[0]).join('')}</div>
                            <span>{m.name}</span></div></td>
                          <td style={{color:'var(--muted)'}}>{m.email}</td>
                          <td><span className="role-badge" style={{background:m.color+'18',color:m.color,border:`1px solid ${m.color}30`}}>{m.role}</span></td>
                          <td>{m.role!=='Admin'?<button className="btn btn-ghost" style={{fontSize:'11px',padding:'4px 10px'}} onClick={()=>toast('✏️',`Editando rol de ${m.name}`,'var(--accent2)')}>Editar</button>:<span style={{color:'var(--muted)',fontSize:'12px'}}>—</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PELIGRO */}
          {section === 'peligro' && (
            <div className="settings-section active">
              <header className="section-header">
                <div className="section-title">Zona peligrosa</div>
                <div className="section-desc">Acciones irreversibles. Procede con extrema cautela.</div>
              </header>
              <div className="danger-zone">
                <div className="setting-card-title" style={{color:'var(--danger)'}}>Acciones irreversibles</div>
                {[
                  ['Eliminar todos los reportes','Borra permanentemente todos los reportes generados','Eliminar'],
                  ['Restablecer configuración','Vuelve a los valores predeterminados','↺ Restablecer'],
                  ['Desactivar cuenta','Pausa tu cuenta — tus datos se conservan','⏸ Desactivar'],
                ].map(([name,desc,btn])=>(
                  <div key={name} className="danger-item">
                    <div className="field-info"><div className="field-name">{name}</div><div className="field-desc">{desc}</div></div>
                    <button className="btn btn-danger" onClick={() => toast('⚠️', `Acción: ${name}`, 'var(--accent3)')}>{btn}</button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>
      </div>

      {/* Toasts */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className="toast">
            <span style={{fontSize:'18px'}}>{t.icon}</span>
            <div style={{flex:1}}>
              <div>{t.msg}</div>
              <div className="toast-bar" style={{background:t.color}}></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
