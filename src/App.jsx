import { useEffect, useRef, useState } from 'react'
import './App.css'
import logoLightIcon from '../img/logo-light-icon.png'

const menuEntries = [
  {
    label: 'Desk',
    icon: 'monitor',
    children: [
      { label: 'Dashboard general', icon: 'dashboard' },
      { label: 'Empresas', icon: 'briefcase' },
      { label: 'Notificaciones', icon: 'bell' },
    ],
  },
  {
    label: 'Sujetos',
    icon: 'users',
    children: [
      { label: 'Clientes', icon: 'users' },
      { label: 'Puntos de origen', icon: 'route' },
    ],
  },
  {
    label: 'Sostenibilidad',
    icon: 'leaf',
    children: [
      { label: 'Dashboards', icon: 'dashboard' },
      { label: 'Notas de recolección', icon: 'document' },
      { label: 'ISCC', icon: 'shield' },
      { label: 'Autodeclaraciones y firmas digitales', icon: 'shield' },
    ],
  },
  {
    label: 'Planta de reciclaje',
    icon: 'factory',
    children: [
      { label: 'Control de descargas y balance de masa', icon: 'factory' },
    ],
  },
  {
    label: 'Rutas',
    icon: 'route',
    children: [
      { label: 'Dashboard rutas', icon: 'dashboard' },
      {
        label:
          'Rutas (Integración de planilla Excel: KM inicial/final, horómetros y estado del vehículo)',
        icon: 'route',
      },
      { label: 'Solicitud de recolección', icon: 'swap' },
    ],
  },
  {
    label: 'Comercial',
    icon: 'chart',
    children: [
      { label: 'Dashboard comercial (Pipeline de ventas)', icon: 'chart' },
    ],
  },
  {
    label: 'Económico',
    icon: 'coins',
    children: [
      {
        label: 'Caja Diaria: ingresos, egresos, viáticos y saldos de recolectores',
        icon: 'coins',
      },
      {
        label: 'Auditoría de Gastos: validación de fotos de facturas y recibos',
        icon: 'document',
      },
      {
        label:
          'Entradas/Salidas Almacén: inventario de insumos (guantes, bidones, limpieza)',
        icon: 'factory',
      },
      { label: 'Liquidación de Ruta: conciliación financiera diaria', icon: 'report' },
    ],
  },
  {
    label: 'Logística',
    icon: 'truck',
    children: [{ label: 'Gestión de flota y mantenimientos', icon: 'truck' }],
  },
  {
    label: 'Contratos',
    icon: 'document',
    children: [{ label: 'Repositorio de documentos legales', icon: 'document' }],
  },
  {
    label: 'Formación',
    icon: 'report',
    children: [{ label: 'Cursos y capacitaciones del personal', icon: 'report' }],
  },
  {
    label: 'Compliance',
    icon: 'shield',
    children: [{ label: 'Auditoría de normas y cumplimiento legal', icon: 'shield' }],
  },
  {
    label: 'Actualizaciones',
    icon: 'bell',
  },
]

const shortcutItems = [
  'Accesos directos',
  'Favoritos',
  'Sincronización',
  'Mapa',
]

const monthlyColumns = [
  'ABRIL 2025',
  'MAYO 2025',
  'JUNIO 2025',
  'JULIO 2025',
  'AGOSTO 2025',
  'SEPTIEMBRE 2025',
  'OCTUBRE 2025',
  'NOVIEMBRE 2025',
  'DICIEMBRE 2025',
  'ENERO 2026',
  'FEBRERO 2026',
  'MARZO 2026',
]

const originMonthlyRows = []

function Icon({ name }) {
  const icons = {
    menu: (
      <path d="M4 7h16M4 12h16M4 17h16" />
    ),
    dashboard: (
      <path d="M4 13h7V4H4zm9 7h7V11h-7zM4 20h7v-5H4zm9-11h7V4h-7z" />
    ),
    home: (
      <path d="M3 11.5 12 4l9 7.5M6.5 10.5V20h11v-9.5" />
    ),
    monitor: (
      <path d="M4 5h16v11H4zm6 11v3m4-3v3m-5 0h6" />
    ),
    users: (
      <path d="M16 19a4 4 0 0 0-8 0M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 8a3.5 3.5 0 0 0-3-3.46M17 5.5a2.5 2.5 0 0 1 0 5" />
    ),
    document: (
      <path d="M7 3.5h7l5 5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Zm7 0v5h5" />
    ),
    shield: (
      <path d="M12 3 5 6v5c0 4.5 2.8 7.9 7 10 4.2-2.1 7-5.5 7-10V6l-7-3Z" />
    ),
    factory: (
      <path d="M3 21h18M5 21V10l5 3V9l5 3V6l4 2v13" />
    ),
    route: (
      <path d="M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 17h3a4 4 0 0 0 4-4V8" />
    ),
    swap: (
      <path d="M7 7h11m0 0-3-3m3 3-3 3M17 17H6m0 0 3-3m-3 3 3 3" />
    ),
    chart: (
      <path d="M5 20V10M12 20V4M19 20v-7" />
    ),
    briefcase: (
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M4 9h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Zm0 0a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2" />
    ),
    coins: (
      <path d="M12 6c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3Zm8 4c0 1.7-3.6 3-8 3s-8-1.3-8-3m16 5c0 1.7-3.6 3-8 3s-8-1.3-8-3" />
    ),
    truck: (
      <path d="M3 7h11v8H3zm11 3h3l3 3v2h-2m-10 0h6m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
    ),
    report: (
      <path d="M6 19h12M8 15l2-2 2 2 4-5" />
    ),
    bell: (
      <path d="M12 4a4 4 0 0 0-4 4v2.5c0 .8-.3 1.6-.9 2.2L6 14h12l-1.1-1.3a3.2 3.2 0 0 1-.9-2.2V8a4 4 0 0 0-4-4Zm0 17a2.5 2.5 0 0 0 2.4-2h-4.8A2.5 2.5 0 0 0 12 21Z" />
    ),
    search: (
      <path d="m21 21-4.2-4.2M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />
    ),
    plus: (
      <path d="M12 5v14M5 12h14" />
    ),
    download: (
      <path d="M12 4v10m0 0 4-4m-4 4-4-4M5 20h14" />
    ),
    print: (
      <path d="M7 9V4h10v5M6 17H5a1 1 0 0 1-1-1v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a1 1 0 0 1-1 1h-1M7 14h10v6H7z" />
    ),
    leaf: (
      <path d="M19 5c-4.5.5-8.2 2.9-10.4 6.7C7.4 14 7 16 7 18c2-.1 4-.5 5.8-1.6C16.6 14.2 19 10.5 19 5ZM5 13c-1.7 1.5-2.5 3.4-2 6 2.6.4 4.5-.4 6-2" />
    ),
    close: (
      <path d="M6 6l12 12M18 6 6 18" />
    ),
    chevron: (
      <path d="m9 6 6 6-6 6" />
    ),
    chevronDown: (
      <path d="m6 9 6 6 6-6" />
    ),
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  )
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

function formatQuantity(value) {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return true
    return true
  })
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.innerWidth > 1080
  })
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)
  const [periodFilter, setPeriodFilter] = useState('Total recolección')
  const [statusFilter, setStatusFilter] = useState('Media/P.O')
  const [viewMode, setViewMode] = useState('País')
  const [activeMenu, setActiveMenu] = useState('Dashboard general')
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState([
    'Desk',
    'Sujetos',
    'Sostenibilidad',
  ])
  const userMenuRef = useRef(null)

  const refreshView = () => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear()
      window.sessionStorage.clear()
      window.location.reload()
    }
  }

  const toggleMenuGroup = (label) => {
    setExpandedMenus((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    )
  }

  const isDeskDashboardView =
    activeMenu === menuEntries.find((entry) => entry.label === 'Desk')?.children?.[0]?.label

  useEffect(() => {
    const onResize = () => {
      const desktop = window.innerWidth > 1080
      setIsDesktop(desktop)
      if (!desktop) {
        setSidebarOpen(true)
      }
    }

    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!isDesktop || !sidebarOpen || isSidebarHovered) return undefined

    const timer = window.setTimeout(() => {
      setSidebarOpen(false)
    }, 5000)

    return () => window.clearTimeout(timer)
  }, [isDesktop, sidebarOpen, isSidebarHovered])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const summaryCards = [
    {
      label: 'Total rango',
      value: '--',
      trend: 'Pendiente de conexión',
      tone: 'green',
    },
    {
      label: 'Total semana',
      value: '--',
      trend: 'Pendiente de conexión',
      tone: 'emerald',
    },
    {
      label: 'Total mes',
      value: '--',
      trend: 'Pendiente de conexión',
      tone: 'teal',
    },
    {
      label: 'Total anual',
      value: '--',
      trend: 'Pendiente de conexión',
      tone: 'amber',
    },
    {
      label: 'Total histórico',
      value: '--',
      trend: 'Pendiente de conexión',
      tone: 'green',
    },
  ]

  return (
    <div className={`dashboard ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <aside
        className="sidebar"
        onMouseEnter={() => {
          if (isDesktop) {
            setIsSidebarHovered(true)
            setSidebarOpen(true)
          }
        }}
        onMouseLeave={() => {
          if (isDesktop) {
            setIsSidebarHovered(false)
          }
        }}
      >
        <div className="sidebar__brand">
          <div className="brand-mark">
            <img src={logoLightIcon} alt="Greenside logo" className="brand-logo" />
          </div>
          <div className="brand-copy">
            <strong>GREENSIDE</strong>
            <span>Solutions</span>
          </div>
        </div>

        <nav className="sidebar__nav" aria-label="Navegación principal">
          {menuEntries.map((item) => {
            if (item.children) {
              const isExpanded = expandedMenus.includes(item.label)
              const hasActiveChild = item.children.some((child) => child.label === activeMenu)

              return (
                <div className="nav-group nav-group--nested" key={item.label}>
                  <button
                    className={`nav-item nav-item--parent ${hasActiveChild ? 'is-active-root' : ''}`}
                    type="button"
                    onClick={() => toggleMenuGroup(item.label)}
                  >
                    <span className="nav-item__icon">
                      <Icon name={item.icon} />
                    </span>
                    <span className="nav-item__label">{item.label}</span>
                    <span className="nav-item__arrow">
                      <Icon name={isExpanded ? 'chevronDown' : 'chevron'} />
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="nav-submenu">
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          className={`nav-item nav-item--child ${activeMenu === child.label ? 'is-active' : ''}`}
                          type="button"
                          onClick={() => setActiveMenu(child.label)}
                        >
                          <span className="nav-item__icon">
                            <Icon name={child.icon} />
                          </span>
                          <span className="nav-item__label">{child.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <button
                key={item.label}
                className={`nav-item nav-item--root ${activeMenu === item.label ? 'is-active' : ''}`}
                type="button"
                onClick={() => setActiveMenu(item.label)}
              >
                <span className="nav-item__icon">
                  <Icon name={item.icon} />
                </span>
                <span className="nav-item__label">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="sidebar__footer">
          <span className="status-dot"></span>
          <span>Monitoreo en tiempo real</span>
        </div>
      </aside>

      <div
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <main className="main-content">
        <header className="topbar">
          <div className="topbar__right">
            <button className="secondary-button secondary-button--sm" type="button" onClick={refreshView}>
              <Icon name="swap" />
              Actualizar
            </button>

            <div className="topbar-user-menu" ref={userMenuRef}>
              <button
                className="topbar-user"
                type="button"
                onClick={() => setIsUserMenuOpen((current) => !current)}
                aria-haspopup="menu"
                aria-expanded={isUserMenuOpen}
              >
                <div className="avatar">OP</div>
                <div className="topbar-user__copy">
                  <strong>Operador</strong>
                  <span>greensidesolutions@gmail.com</span>
                </div>
                <span className="topbar-user__chevron" aria-hidden="true">
                  <Icon name="chevronDown" />
                </span>
              </button>

              {isUserMenuOpen && (
                <div className="topbar-user-menu__dropdown" role="menu" aria-label="Opciones de usuario">
                  <button
                    className="topbar-user-menu__item"
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsUserMenuOpen(false)
                      handleLogout()
                    }}
                  >
                    <Icon name="close" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {isDeskDashboardView ? (
          <>
            <section className="shortcut-strip" aria-label="Acciones rápidas">
              {shortcutItems.map((item, index) => (
                <button className={`shortcut-pill ${index === 0 ? 'is-active' : ''}`} key={item} type="button">
                  {item}
                </button>
              ))}
            </section>

            <section className="panel">
              <div className="panel__header compact">
                <div>
                  <h3>Dashboard general</h3>
                </div>
                <div className="toolbar-pill">
                  <Icon name="bell" /> El recálculo de datos se actualiza cada 5 minutos.
                </div>
              </div>
            </section>

            <section className="panel">
              <div className="panel__header compact">
                <div>
                  <p className="eyebrow">Filtros</p>
                </div>
              </div>
            </section>

            <section className="stats-grid" aria-label="Resumen general">
              {summaryCards.map((card) => (
                <article className={`stat-card stat-card--${card.tone}`} key={card.label}>
                  <span>{card.label}</span>
                  <strong>{card.value}</strong>
                  <small>{card.trend}</small>
                </article>
              ))}
            </section>

            <section className="content-grid">
              <article className="panel panel--table">
                <div className="filter-bar">
                  <div className="chip-group">
                    {['Total recolección', 'Media/P.O', 'Stops por P.O'].map((option) => (
                      <button
                        key={option}
                        className={`chip ${periodFilter === option ? 'is-selected' : ''}`}
                        type="button"
                        onClick={() => setPeriodFilter(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  <div className="chip-group">
                    {['Media Stop', 'Tasa recolección', 'Comparativo'].map((option) => (
                      <button
                        key={option}
                        className={`chip ${statusFilter === option ? 'is-selected' : ''}`}
                        type="button"
                        onClick={() => setStatusFilter(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="table-wrapper">
                  <table className="notes-table">
                    <thead>
                      <tr>
                        <th>Notas</th>
                        <th>Valor</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={3}>Gráfica pendiente de datos desde Supabase.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>

              <article className="panel">
                <div className="chip-group chip-group--view">
                  {['País', 'Franquicia', 'Almacén'].map((option) => (
                    <button
                      key={option}
                      className={`chip ${viewMode === option ? 'is-selected' : ''}`}
                      type="button"
                      onClick={() => setViewMode(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="table-wrapper">
                  <table className="notes-table">
                    <thead>
                      <tr>
                        <th>Total recolección</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Distribución pendiente de datos desde Supabase.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>
            </section>

            <section className="panel panel--table">
              <div className="panel__header">
                <div>
                  <h3>Total mes por punto de origen</h3>
                </div>
              </div>

              <div className="filter-bar">
                <div className="chip-group">
                  {['Total recolección', 'Media/Stop', 'Stops por P.O', 'Residuo nuevo', 'Tasa recolección'].map((option) => (
                    <button
                      key={option}
                      className={`chip ${statusFilter === option ? 'is-selected' : ''}`}
                      type="button"
                      onClick={() => setStatusFilter(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="table-toolbar">
                <div className="toolbar-pill">
                  <Icon name="leaf" /> Mostrar 10 resultados por página
                </div>
                <div className="panel__actions">
                  <button className="secondary-button" type="button">
                    <Icon name="download" /> Excel
                  </button>
                </div>
              </div>

              <div className="table-toolbar">
                <div className="toolbar-pill muted">
                  Mostrando 0 de 0 elementos
                </div>
                <label className="searchbox">
                  <Icon name="search" />
                  <input type="text" placeholder="Buscar" />
                </label>
              </div>

              <div className="table-wrapper">
                <table className="notes-table is-complete">
                  <thead>
                    <tr>
                      <th>Punto de origen</th>
                      {monthlyColumns.map((month) => (
                        <th key={month}>{month}</th>
                      ))}
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {originMonthlyRows.map((row) => {
                      const total = row.values.reduce((sum, value) => sum + value, 0)

                      return (
                        <tr key={row.origin}>
                          <td>{row.origin}</td>
                          {row.values.map((value, index) => (
                            <td key={`${row.origin}-${monthlyColumns[index]}`}>{formatQuantity(value)}</td>
                          ))}
                          <td>{formatQuantity(total)}</td>
                        </tr>
                      )
                    })}
                    {originMonthlyRows.length === 0 && (
                      <tr>
                        <td colSpan={monthlyColumns.length + 2}>Sin datos por el momento.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          <section className="panel">
            <div className="panel__header compact">
              <div>
                <p className="eyebrow">Vista seleccionada</p>
                <h3>{activeMenu}</h3>
                <span>Esta sección aún no tiene contenido detallado en esta versión.</span>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
