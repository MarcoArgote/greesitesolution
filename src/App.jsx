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
  const defaultExpandedMenus = ['Desk', 'Sujetos', 'Sostenibilidad']

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
  const [currentView, setCurrentView] = useState('onboarding')
  const [activeMenu, setActiveMenu] = useState(() => {
    if (typeof window === 'undefined') return 'Dashboard general'
    return window.sessionStorage.getItem('activeMenu') || 'Dashboard general'
  })
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [refreshTick, setRefreshTick] = useState(0)
  const [expandedCoords, setExpandedCoords] = useState({})
  const [routesHistory, setRoutesHistory] = useState([])
  const [routesLoading, setRoutesLoading] = useState(false)
  const [routesError, setRoutesError] = useState('')
  const [expandedMenus, setExpandedMenus] = useState(() => {
    if (typeof window === 'undefined') return defaultExpandedMenus
    try {
      const saved = window.sessionStorage.getItem('expandedMenus')
      if (!saved) return defaultExpandedMenus
      const parsed = JSON.parse(saved)
      return Array.isArray(parsed) ? parsed : defaultExpandedMenus
    } catch {
      return defaultExpandedMenus
    }
  })
  const userMenuRef = useRef(null)

  const refreshView = () => {
    setIsUserMenuOpen(false)
    setRefreshTick((current) => current + 1)
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
  const isDeskCompaniesView = activeMenu === 'Empresas'
  const isDeskNotificationsView = activeMenu === 'Notificaciones'
  const isSubjectsClientsView = activeMenu === 'Clientes'
  const isSubjectsOriginsView = activeMenu === 'Puntos de origen'
  const isRoutesDashboardView = activeMenu === 'Dashboard rutas'
  const isRoutesListView =
    activeMenu === 'Rutas' || activeMenu.startsWith('Rutas (Integración de planilla Excel')

  const companyRows = [
    { id: 10, name: 'SUCRE_BO', location: 'Bolivia', phone: '+59178312506', status: 'En servicio' },
    { id: 2, name: 'TARIJA_BO', location: 'Bolivia', phone: '+59178312506', status: 'En servicio' },
    { id: 1, name: 'BOLIVIA_GSS', location: 'Bolivia', phone: '+59178312506', status: 'En servicio' },
  ]

  const clientRows = [
    { id: 22411, name: 'POLLOS EL CHAVO DEL 8', company: 'BOLIVIA_GSS', location: 'Bolivia, Santa Cruz', phone: '+59173214463', email: 'cliente1@mail.com', status: 'En servicio' },
    { id: 22409, name: 'PENSION TERESITA', company: 'BOLIVIA_GSS', location: 'Bolivia, Santa Cruz', phone: '+59168817701', email: 'cliente2@mail.com', status: 'En servicio' },
    { id: 22403, name: 'LENY MONTAÑO', company: 'BOLIVIA_GSS', location: 'Bolivia, Cochabamba', phone: '+59171469503', email: 'cliente3@mail.com', status: 'En servicio' },
    { id: 22401, name: 'NOEMI VASQUEZ', company: 'BOLIVIA_GSS', location: 'Bolivia, Cochabamba', phone: '+59171663038', email: 'cliente4@mail.com', status: 'En servicio' },
    { id: 22400, name: '3/4 GRILL RESTOBAR', company: 'BOLIVIA_GSS', location: 'Bolivia, Cochabamba', phone: '+59172213536', email: 'cliente5@mail.com', status: 'En servicio' },
    { id: 22399, name: 'ACAI DO RIO JANEIRO', company: 'BOLIVIA_GSS', location: 'Bolivia, Cochabamba', phone: '+59172213536', email: 'cliente6@mail.com', status: 'En servicio' },
    { id: 22398, name: 'SABOR CRUCEÑO', company: 'BOLIVIA_GSS', location: 'Bolivia, Santa Cruz', phone: '+59169020004', email: 'cliente7@mail.com', status: 'En servicio' },
    { id: 22397, name: 'EMPANADA DOÑA SARA', company: 'BOLIVIA_GSS', location: 'Bolivia, Santa Cruz', phone: '+59174266114', email: 'cliente8@mail.com', status: 'En servicio' },
    { id: 22396, name: 'SALTEÑERIA LA CHOQUITA', company: 'TARIJA_BO', location: 'Bolivia, Tarija', phone: '+59174667351', email: 'cliente9@mail.com', status: 'En servicio' },
    { id: 22395, name: 'EL GRUÑON', company: 'BOLIVIA_GSS', location: 'Bolivia, La Paz', phone: '+59164760912', email: 'cliente10@mail.com', status: 'En servicio' },
  ]

  const originRows = [
    { id: 26877, origin: 'POLLOS EL CHAVO DEL 8 AV. LUJAN', company: 'BOLIVIA_GSS', client: 'POLLOS EL CHAVO DEL 8', location: 'Bolivia, Santa Cruz', lat: '-17.72995594634841', lon: '-63.0928513448073', amenity: 'COMIDA RÁPIDA' },
    { id: 26875, origin: 'PENSIÓN TERESITA CALLE MAXIMO MELGAR ZONA PLAN 3 MIL', company: 'BOLIVIA_GSS', client: 'PENSIÓN TERESITA', location: 'Bolivia, Santa Cruz', lat: '-17.809729003214404', lon: '-63.090337552233315', amenity: 'COMIDA RÁPIDA' },
    { id: 26869, origin: 'LENY MONTAÑO PLAZUELA GUERRILLEROS', company: 'BOLIVIA_GSS', client: 'LENY MONTAÑO', location: 'Bolivia, Cochabamba', lat: '-17.414168406207317', lon: '-66.16423557923828', amenity: 'COMIDA RÁPIDA' },
    { id: 26861, origin: 'NOEMI VASQUEZ SANTO TOMÁS DE AQUINO VILLA MEXICO', company: 'BOLIVIA_GSS', client: 'NOEMI VASQUEZ', location: 'Bolivia, Cochabamba', lat: '-17.43588132744091', lon: '-66.15752257544668', amenity: 'COMIDA RÁPIDA' },
    { id: 26860, origin: '3/4 GRILL RESTOBAR VILLA TUNARI', company: 'BOLIVIA_GSS', client: '3/4 GRILL RESTOBAR', location: 'Bolivia, Cochabamba', lat: '-16.974601563309008', lon: '-65.42017760429279', amenity: 'COMIDA RÁPIDA' },
  ]

  const fallbackRoutesHistory = [
    { id: 'RT-2902', date: '2026-03-17T15:20:00Z', conductor: 'Juan Perez', vehicle: 'CAM-12', stops: 14, distanceKm: 98.6, status: 'Completada', lat: '-17.3935', lon: '-66.1570' },
    { id: 'RT-2899', date: '2026-03-16T12:05:00Z', conductor: 'Luis Flores', vehicle: 'CAM-03', stops: 11, distanceKm: 73.2, status: 'Completada', lat: '-17.7863', lon: '-63.1812' },
    { id: 'RT-2897', date: '2026-03-15T18:10:00Z', conductor: 'Ana Rojas', vehicle: 'CAM-08', stops: 9, distanceKm: 64.9, status: 'Completada', lat: '-16.5000', lon: '-68.1500' },
  ]

  const routesOverviewCards = [
    { label: 'Total Rutas', value: '10', icon: 'route' },
    { label: 'Total Stops', value: '62', icon: 'dashboard' },
    { label: 'Incidencias', value: '2', icon: 'report' },
  ]

  const routesBalanceCards = [
    { label: 'Total Recolección', unit: 'UCO', value: '3.152,00 Litros', month: '49.558,00', year: '233.453,00', tone: 'green' },
    { label: 'Total Descargado', unit: 'UCO', value: '3.152,00 Litros', month: '49.558,00', year: '233.453,00', tone: 'indigo' },
    { label: 'Diferencia', unit: 'UCO', value: '0,00 Litros', month: '0,00', year: '0,00', tone: 'slate' },
  ]

  const routeStopPills = [
    '2026-03-13_04-28_5247 FAG ORURO_BO',
    '2026-03-13_06-21_6406 KCG LA_PAZ',
    '2026-03-13_07-33_6360 GBC LA_PAZ',
    '2026-03-13_08-27_4272-BPL TARIJA',
    '2026-03-13_08-58_5290-DXR COCHABAMBA',
    '2026-03-13_09-01_3456 GIY COCHABAMBA',
    '2026-03-13_09-24_6406 KTA COCHABAMBA',
    '2026-03-13_11-57_6406 KUD SANTA_CRUZ',
  ]

  const routeStopRows = [
    { eta: '10:52', ata: '10:54', desvio: '0:2', cliente: 'TYPICA CAFE TOSTADURIA ORURO', origen: 'TYPICA CAFE TOSTADURIA ORURO CALLE SORIA', estado: 'Finalizado', cantidad: 'UCO: 40,00 Litros', ticket: '59051', oferta: '6255', coOferta: '1 BOB - UCO', metodoPago: 'Efectivo-Cash', pendiente: '40 BOB' },
    { eta: '11:36', ata: '11:37', desvio: '0:1', cliente: 'DONKEY KONG RESTAURANT', origen: 'DONKEY KONG RESTAURANT AV. 6 DE OCTUBRE', estado: 'Finalizado', cantidad: 'UCO: 80,00 Litros', ticket: '59744', oferta: '4885', coOferta: '1 BOB - UCO', metodoPago: 'Efectivo-Cash', pendiente: '80 BOB' },
    { eta: '14:46', ata: '14:47', desvio: '0:1', cliente: 'POLLOS CHIFA NANO', origen: 'POLLOS CHIFA NANO AV. TOMAS FRIAS', estado: 'Finalizado', cantidad: 'UCO: 152,00 Litros', ticket: '122025', oferta: '5044', coOferta: '1 BOB - UCO', metodoPago: 'Efectivo-Cash', pendiente: '152 BOB' },
  ]

  const routeMetricCards = [
    { value: '04:29', label: 'Inicio', icon: 'dashboard' },
    { value: 'Fin', label: '-', icon: 'report' },
    { value: '3', label: 'Total stops', icon: 'route' },
    { value: 'Duración y distancia', label: '-', icon: 'swap' },
    { value: '152315 N/A', label: 'Kilometraje inicial', icon: 'truck' },
    { value: '0 km', label: 'Kilometraje final', icon: 'truck' },
    { value: '272 litros', label: 'UCO', icon: 'leaf' },
    { value: '0', label: 'Incidencias', icon: 'bell' },
    { value: '272,00 BOB', label: 'T.Tickets', icon: 'coins' },
    { value: '0,00', label: 'T.Pagado', icon: 'coins' },
  ]

  const routesListRows = [
    { id: 190676, franquicia: 'SUCRE_BO', ruta: '2026-03-13_14-30_2284 XKA', fecha: '13/03/2026', matricula: '2284 XKA', almacen: 'SUCRE', estado: 'En proceso', tTickets: '0,00 BOB', tPagado: '0,00' },
    { id: 190673, franquicia: 'BOLIVIA_GSS', ruta: '2026-03-13_12-33_6406 KYK', fecha: '13/03/2026', matricula: '6406 KYK', almacen: 'LA_PAZ', estado: 'En proceso', tTickets: '108,00 BOB', tPagado: '0,00' },
    { id: 190672, franquicia: 'BOLIVIA_GSS', ruta: '2026-03-13_11-57_6406 KUD', fecha: '13/03/2026', matricula: '6406 KUD', almacen: 'SANTA_CRUZ', estado: 'En proceso', tTickets: '20,00 BOB', tPagado: '0,00' },
    { id: 190611, franquicia: 'BOLIVIA_GSS', ruta: '2026-03-13_09-24_6406 KTA', fecha: '13/03/2026', matricula: '6406 KTA', almacen: 'COCHABAMBA', estado: 'En proceso', tTickets: '824,00 BOB', tPagado: '0,00' },
    { id: 190610, franquicia: 'BOLIVIA_GSS', ruta: '2026-03-13_09-01_3456 GIY', fecha: '13/03/2026', matricula: '3456 GIY', almacen: 'COCHABAMBA', estado: 'En proceso', tTickets: '528,00 BOB', tPagado: '0,00' },
    { id: 190609, franquicia: 'BOLIVIA_GSS', ruta: '2026-03-13_08-58_5290-DXR', fecha: '13/03/2026', matricula: '5290-DXR', almacen: 'COCHABAMBA', estado: 'En proceso', tTickets: '599,00 BOB', tPagado: '0,00' },
    { id: 190605, franquicia: 'TARIJA_BO', ruta: '2026-03-13_08-27_4272-BPL', fecha: '13/03/2026', matricula: '4272 BPL', almacen: 'TARIJA', estado: 'En proceso', tTickets: '60,00 BOB', tPagado: '0,00' },
    { id: 190602, franquicia: 'BOLIVIA_GSS', ruta: '2026-03-13_07-33_6360 GBC', fecha: '13/03/2026', matricula: '6360 GBC', almacen: 'LA_PAZ', estado: 'En proceso', tTickets: '224,00 BOB', tPagado: '0,00' },
    { id: 190596, franquicia: 'BOLIVIA_GSS', ruta: '2026-03-13_06-21_6406 KCG', fecha: '13/03/2026', matricula: '6406 KCG', almacen: 'LA_PAZ', estado: 'En proceso', tTickets: '843,00 BOB', tPagado: '0,00' },
    { id: 190589, franquicia: 'BOLIVIA_GSS', ruta: '2026-03-13_04-28_5247 FAG', fecha: '13/03/2026', matricula: '5247 FAG', almacen: 'ORURO_BO', estado: 'En proceso', tTickets: '272,00 BOB', tPagado: '0,00' },
  ]

  const toggleCoordinate = (id, field) => {
    const key = `${id}-${field}`
    setExpandedCoords((current) => ({
      ...current,
      [key]: !current[key],
    }))
  }

  const formatCoordinatePreview = (value, isExpanded) => {
    if (isExpanded) return value
    return `${value.slice(0, 8)}...`
  }

  const activeRouteForMap = routesHistory[0] || fallbackRoutesHistory[0]
  const routesMapUrl = `https://maps.google.com/maps?q=${activeRouteForMap.lat},${activeRouteForMap.lon}&z=4&output=embed`

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
    }, 2000)

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('activeMenu', activeMenu)
    }
  }, [activeMenu])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('expandedMenus', JSON.stringify(expandedMenus))
    }
  }, [expandedMenus])

  useEffect(() => {
    if (!isSubjectsOriginsView && !isRoutesDashboardView) return undefined

    let isCancelled = false

    const loadRoutesHistory = async () => {
      setRoutesLoading(true)
      setRoutesError('')

      try {
        // This endpoint should return Supabase route history in production.
        const response = await fetch('/api/routes/history')

        if (!response.ok) {
          throw new Error('No se pudo obtener historial de rutas')
        }

        const payload = await response.json()
        const normalized = Array.isArray(payload) && payload.length > 0 ? payload : fallbackRoutesHistory

        if (!isCancelled) {
          setRoutesHistory(normalized)
        }
      } catch {
        if (!isCancelled) {
          setRoutesHistory(fallbackRoutesHistory)
          setRoutesError('Conecta esta vista con Supabase/API para datos en tiempo real.')
        }
      } finally {
        if (!isCancelled) {
          setRoutesLoading(false)
        }
      }
    }

    loadRoutesHistory()

    return () => {
      isCancelled = true
    }
  }, [isSubjectsOriginsView, isRoutesDashboardView, refreshTick])

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

  return currentView === 'onboarding' ? (
    <div className="onboarding-screen">
      <div className="onboarding-smiley">
        <div className="smiley-face">
          <div className="smiley-eyes">
            <div className="smiley-eye left"></div>
            <div className="smiley-eye right"></div>
          </div>
          <div className="smiley-mouth"></div>
        </div>
      </div>

      <div className="onboarding-content">
        <h1 className="onboarding-title">¡Bienvenido a Greenside!</h1>
        <p className="onboarding-subtitle">Selecciona cómo deseas acceder a la plataforma</p>

        <div className="onboarding-buttons">
          <button
            className="onboarding-btn onboarding-btn--dashboard"
            onClick={() => setCurrentView('dashboard')}
          >
            <Icon name="dashboard" />
            <span className="onboarding-btn-label">Dashboard Web</span>
            <span className="onboarding-btn-desc">Gestión completa desde escritorio</span>
          </button>

          <button
            className="onboarding-btn onboarding-btn--app"
            onClick={() => setCurrentView('greenapp')}
          >
            <Icon name="users" />
            <span className="onboarding-btn-label">GreenApp Móvil</span>
            <span className="onboarding-btn-desc">Recolección con GPS y cámara</span>
          </button>
        </div>
      </div>
    </div>
  ) : (
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
            <strong>GREENSIDESOLUTIONS</strong>
            <span>Bolivia</span>
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

      <main className="main-content" data-refresh={refreshTick}>
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
        ) : isRoutesDashboardView ? (
          <>
            <section className="panel route-dashboard-panel">
              <div className="panel__header compact">
                <div>
                  <h3>Dashboard rutas</h3>
                </div>
              </div>
              <button className="route-filter-toggle" type="button">
                Filtros <Icon name="chevronDown" />
              </button>
            </section>

            <section className="route-kpi-grid" aria-label="Resumen de rutas">
              {routesOverviewCards.map((item) => (
                <article className="panel route-kpi-card" key={item.label}>
                  <div className="route-kpi-card__icon">
                    <Icon name={item.icon} />
                  </div>
                  <div>
                    <span>{item.label}</span>
                  </div>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </section>

            <section className="route-balance-grid" aria-label="Balance de ruta">
              {routesBalanceCards.map((card) => (
                <article className={`panel route-balance-card route-balance-card--${card.tone}`} key={card.label}>
                  <div className="route-balance-card__main">
                    <div>
                      <span>{card.label}</span>
                      <small>{card.unit}</small>
                    </div>
                    <strong>{card.value}</strong>
                  </div>
                  <div className="route-balance-card__footer">
                    <span>Total Mes: {card.month}</span>
                    <span>Total Año: {card.year}</span>
                  </div>
                </article>
              ))}
            </section>

            <section className="panel panel--table route-stops-panel">
              <div className="panel__header compact">
                <div>
                  <h3>Stops</h3>
                </div>
                <div className="panel__actions">
                  <button className="secondary-button secondary-button--sm" type="button">Añadir stop</button>
                  <button className="secondary-button secondary-button--sm" type="button">Formación</button>
                </div>
              </div>

              <div className="route-stop-pills">
                {routeStopPills.map((item, index) => (
                  <button
                    className={`route-stop-pill ${index === 0 ? 'is-active' : ''}`}
                    key={item}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="table-wrapper">
                <table className="notes-table route-stops-table">
                  <thead>
                    <tr>
                      <th>N°</th>
                      <th>ETA</th>
                      <th>ATA</th>
                      <th>Desviación</th>
                      <th>Cliente</th>
                      <th>Punto de origen</th>
                      <th>Estado</th>
                      <th>Cantidad</th>
                      <th>Tickets</th>
                      <th>Oferta</th>
                      <th>C.Oferta</th>
                      <th>M.Pago</th>
                      <th>Pendiente</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routeStopRows.map((row, index) => (
                      <tr key={`${row.ticket}-${index}`}>
                        <td>{index + 1}</td>
                        <td>{row.eta}</td>
                        <td>{row.ata}</td>
                        <td>{row.desvio}</td>
                        <td>{row.cliente}</td>
                        <td>{row.origen}</td>
                        <td>{row.estado}</td>
                        <td>{row.cantidad}</td>
                        <td className="id-cell">{row.ticket}</td>
                        <td>{row.oferta}</td>
                        <td>{row.coOferta}</td>
                        <td>{row.metodoPago}</td>
                        <td>{row.pendiente}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="route-metrics-grid" aria-label="Métricas de operación">
              {routeMetricCards.map((metric) => (
                <article className="panel route-metric-card" key={`${metric.value}-${metric.label}`}>
                  <div className="route-metric-card__icon">
                    <Icon name={metric.icon} />
                  </div>
                  <div>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                </article>
              ))}
            </section>

            <section className="panel route-map-panel">
              <div className="panel__header compact">
                <div>
                  <h3>Mapa</h3>
                </div>
              </div>
              <div className="route-map-frame">
                <iframe
                  title="Mapa de dashboard rutas"
                  src={routesMapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="table-toolbar route-map-toolbar">
                <div className="toolbar-pill muted">
                  {routesLoading ? 'Cargando rutas...' : `Rutas monitoreadas: ${routesHistory.length}`}
                </div>
                {routesError && <div className="route-map-note">{routesError}</div>}
              </div>
            </section>
          </>
        ) : isRoutesListView ? (
          <>
            <section className="panel subjects-filter-panel-inline">
              <div className="subjects-filter-panel__row">
                <h3>Filtros</h3>
                <button className="table-mini-action" type="button" aria-label="Expandir filtros">
                  <Icon name="chevronDown" />
                </button>
              </div>
            </section>

            <section className="panel panel--table routes-list-panel">
              <div className="panel__header compact">
                <div>
                  <h3>Listado de rutas</h3>
                  <span>Administración de rutas (Crear, Editar y Eliminar)</span>
                </div>
                <button className="primary-button secondary-button--sm" type="button">Nueva ruta</button>
              </div>

              <div className="desk-company-controls">
                <div className="desk-company-controls__left">
                  <span>Mostrar</span>
                  <select className="desk-compact-select">
                    <option>10</option>
                  </select>
                  <span>resultados por página</span>
                </div>

                <div className="panel__actions desk-export-actions">
                  {['Copiar', 'CSV', 'Excel', 'Imprimir'].map((label) => (
                    <button key={label} className="desk-dark-button" type="button">
                      {label}
                    </button>
                  ))}
                </div>

                <label className="searchbox desk-searchbox routes-searchbox">
                  <span>Buscar</span>
                  <input type="text" placeholder="" />
                  <Icon name="search" />
                </label>
              </div>

              <div className="table-wrapper">
                <table className="notes-table routes-list-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Franquicia</th>
                      <th>Ruta</th>
                      <th>Fecha</th>
                      <th>Matrícula</th>
                      <th>Almacén</th>
                      <th>Estado</th>
                      <th>T.Tickets</th>
                      <th>T.Pagado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routesListRows.map((row) => (
                      <tr key={row.id}>
                        <td className="id-cell">{row.id}</td>
                        <td>{row.franquicia}</td>
                        <td>{row.ruta}</td>
                        <td>{row.fecha}</td>
                        <td>{row.matricula}</td>
                        <td>{row.almacen}</td>
                        <td>
                          <span className="route-state-pill">{row.estado}</span>
                        </td>
                        <td>{row.tTickets}</td>
                        <td>{row.tPagado}</td>
                        <td>
                          <div className="desk-row-actions">
                            <button className="table-mini-action" type="button" aria-label="Ver">
                              <Icon name="search" />
                            </button>
                            <button className="table-mini-action" type="button" aria-label="Editar">
                              <Icon name="document" />
                            </button>
                            <button className="table-mini-action" type="button" aria-label="Eliminar">
                              <Icon name="close" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="table-toolbar desk-company-footer">
                <span>Mostrando 1 de 10 de 14.386 elementos</span>
                <div className="panel__actions">
                  <button className="secondary-button secondary-button--sm" type="button">Anterior</button>
                  <button className="primary-button secondary-button--sm" type="button">1</button>
                  <button className="secondary-button secondary-button--sm" type="button">2</button>
                  <button className="secondary-button secondary-button--sm" type="button">3</button>
                  <button className="secondary-button secondary-button--sm" type="button">Siguiente</button>
                </div>
              </div>
            </section>
          </>
        ) : isDeskNotificationsView ? (
          <section className="desk-layout">
            <aside className="panel desk-sidepanel">
              <div className="desk-sidepanel__block">
                <p className="eyebrow">Secciones</p>
                <div className="desk-list">
                  {['Notificaciones', 'Leídos', 'No leídos'].map((item) => (
                    <button
                      key={item}
                      className={`desk-list__item ${item === 'Notificaciones' ? 'is-selected' : ''}`}
                      type="button"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="desk-sidepanel__block">
                <p className="eyebrow">Filtros</p>
                <label className="desk-field">
                  <span>Rango de fechas:</span>
                  <input type="text" placeholder="Indique rango de fechas" />
                </label>
                <label className="desk-field">
                  <span>Entidad:</span>
                  <select>
                    <option>Seleccione una opción</option>
                  </select>
                </label>
                <button className="primary-button desk-block-button" type="button">
                  Aplicar filtros
                </button>
              </div>
            </aside>

            <article className="panel panel--table">
              <div className="panel__header compact">
                <div>
                  <h3>Notificaciones</h3>
                  <span>Listado de notificaciones</span>
                </div>
                <label className="searchbox desk-searchbox">
                  <input type="text" placeholder="Buscar notificación" />
                  <Icon name="search" />
                </label>
              </div>

              <div className="table-toolbar">
                <label className="desk-checkbox">
                  <input type="checkbox" /> Marcar todos
                </label>
                <div className="panel__actions">
                  <button className="secondary-button secondary-button--sm" type="button">
                    <Icon name="chevronDown" />
                  </button>
                  <button className="secondary-button secondary-button--sm" type="button">
                    <Icon name="bell" />
                  </button>
                </div>
              </div>

              <div className="table-wrapper">
                <table className="notes-table">
                  <thead>
                    <tr>
                      <th>Notificación</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={3}>Sin notificaciones por el momento.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </section>
        ) : isDeskCompaniesView ? (
          <section className="panel panel--table">
            <div className="panel__header compact">
              <div>
                <h3>Listado de empresas</h3>
                <span>Administración de empresas (Crear, Editar y Eliminar)</span>
              </div>
              <button className="primary-button secondary-button--sm" type="button">
                Nueva empresa
              </button>
            </div>

            <div className="desk-company-controls">
              <div className="desk-company-controls__left">
                <span>Mostrar</span>
                <select className="desk-compact-select">
                  <option>10</option>
                </select>
                <span>resultados por página</span>
              </div>
              <div className="panel__actions desk-export-actions">
                {['Copiar', 'CSV', 'Excel', 'Imprimir'].map((label) => (
                  <button key={label} className="desk-dark-button" type="button">
                    {label}
                  </button>
                ))}
              </div>
              <label className="searchbox desk-searchbox">
                <input type="text" placeholder="Buscar" />
                <Icon name="search" />
              </label>
            </div>

            <div className="table-wrapper">
              <table className="notes-table desk-companies-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Localización</th>
                    <th>Teléfono</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {companyRows.map((company) => (
                    <tr key={company.id}>
                      <td className="id-cell">{company.id}</td>
                      <td>{company.name}</td>
                      <td>{company.location}</td>
                      <td>{company.phone}</td>
                      <td>
                        <span className="badge badge--success">{company.status}</span>
                      </td>
                      <td>
                        <div className="desk-row-actions">
                          <button className="table-mini-action" type="button" aria-label="Editar">
                            <Icon name="document" />
                          </button>
                          <button className="table-mini-action" type="button" aria-label="Eliminar">
                            <Icon name="close" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-toolbar desk-company-footer">
              <span>Mostrando 1 de 3 de 3 elementos</span>
              <div className="panel__actions">
                <button className="secondary-button secondary-button--sm" type="button">
                  Anterior
                </button>
                <button className="primary-button secondary-button--sm" type="button">
                  1
                </button>
                <button className="secondary-button secondary-button--sm" type="button">
                  Siguiente
                </button>
              </div>
            </div>
          </section>
        ) : isSubjectsClientsView ? (
          <section className="panel panel--table subjects-clients-panel">
              <div className="panel__header compact">
                <div>
                  <h3>Listado de clientes</h3>
                  <span>Administración de clientes (Crear, editar y eliminar)</span>
                </div>
                <div className="panel__actions">
                  <button className="primary-button secondary-button--sm" type="button">Nuevo cliente</button>
                  <button className="primary-button secondary-button--sm" type="button">Edición multiple</button>
                  <button className="primary-button secondary-button--sm" type="button">Oferta multiple</button>
                </div>
              </div>

              <div className="subjects-clients-controls">
                <div className="desk-company-controls__left">
                  <span>Mostrar</span>
                  <select className="desk-compact-select">
                    <option>10</option>
                  </select>
                  <span>resultados por página</span>
                </div>

                <div className="panel__actions desk-export-actions">
                  {['Copiar', 'CSV', 'Excel', 'Imprimir', 'Imprimir seleccionados'].map((label) => (
                    <button key={label} className="desk-dark-button" type="button">
                      {label}
                    </button>
                  ))}
                </div>

                <div className="subjects-right-controls">
                  <button className="secondary-button secondary-button--sm subjects-filter-button" type="button">
                    <Icon name="chevronDown" />
                    Filtros
                  </button>
                  <label className="searchbox desk-searchbox subjects-searchbox">
                    <span>Buscar</span>
                    <input type="text" placeholder="" />
                    <Icon name="search" />
                  </label>
                </div>
              </div>

              <div className="table-wrapper">
                <table className="notes-table subjects-clients-table">
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" aria-label="Seleccionar todos" />
                      </th>
                      <th>Id</th>
                      <th>Nombre</th>
                      <th>Empresa</th>
                      <th>Localización</th>
                      <th>Tlf</th>
                      <th>Email</th>
                      <th>Estado</th>
                      <th>Oferta</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientRows.map((client) => (
                      <tr key={client.id}>
                        <td>
                          <input type="checkbox" aria-label={`Seleccionar ${client.name}`} />
                        </td>
                        <td className="id-cell">{client.id}</td>
                        <td>{client.name}</td>
                        <td>{client.company}</td>
                        <td>{client.location}</td>
                        <td>{client.phone}</td>
                        <td>{client.email}</td>
                        <td>
                          <span className="badge badge--success">{client.status}</span>
                        </td>
                        <td>--</td>
                        <td>
                          <div className="desk-row-actions">
                            <button className="table-mini-action" type="button" aria-label="Ver">
                              <Icon name="search" />
                            </button>
                            <button className="table-mini-action" type="button" aria-label="Editar">
                              <Icon name="document" />
                            </button>
                            <button className="table-mini-action" type="button" aria-label="Eliminar">
                              <Icon name="close" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="table-toolbar desk-company-footer">
                <span>Mostrando 1 de 10 de 6.427 elementos</span>
                <div className="panel__actions">
                  <button className="secondary-button secondary-button--sm" type="button">Anterior</button>
                  <button className="primary-button secondary-button--sm" type="button">1</button>
                  <button className="secondary-button secondary-button--sm" type="button">Siguiente</button>
                </div>
              </div>
            </section>
        ) : isSubjectsOriginsView ? (
          <>
           

            <section className="panel panel--table subjects-clients-panel">
              <div className="panel__header compact">
                <div>
                  <h3>Listado de puntos de origen</h3>
                  <span>Administración de puntos de origen (Crear, Editar y Eliminar)</span>
                </div>
                <div className="panel__actions">
                  <button className="primary-button secondary-button--sm" type="button">Nuevo punto de origen</button>
                  <button className="primary-button secondary-button--sm" type="button">Edición múltiple</button>
                  <button className="secondary-button secondary-button--sm" type="button">
                    <Icon name="download" /> Descarga múltiple
                  </button>
                </div>
              </div>

              <div className="subjects-clients-controls">
                <div className="desk-company-controls__left">
                  <span>Mostrar</span>
                  <select className="desk-compact-select">
                    <option>10</option>
                  </select>
                  <span>resultados por página</span>
                </div>

                <div className="panel__actions desk-export-actions">
                  {['Copiar', 'CSV', 'Excel', 'Imprimir', 'Imprimir seleccionados'].map((label) => (
                    <button key={label} className="desk-dark-button" type="button">
                      {label}
                    </button>
                  ))}
                </div>

                <div className="subjects-right-controls">
                  <button className="secondary-button secondary-button--sm subjects-filter-button" type="button">
                    <Icon name="chevronDown" />
                    Filtros
                  </button>
                  <label className="searchbox desk-searchbox subjects-searchbox">
                    <span>Buscar</span>
                    <input type="text" placeholder="" />
                    <Icon name="search" />
                  </label>
                </div>
              </div>

              <div className="table-wrapper">
                <table className="notes-table subjects-clients-table">
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" aria-label="Seleccionar todos" />
                      </th>
                      <th>Id</th>
                      <th>Nombre</th>
                      <th>Empresa</th>
                      <th>Cliente</th>
                      <th>Localización</th>
                      <th>Latitud</th>
                      <th>Longitud</th>
                      <th>Google Maps</th>
                      <th>Amenity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {originRows.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <input type="checkbox" aria-label={`Seleccionar ${row.origin}`} />
                        </td>
                        <td className="id-cell">{row.id}</td>
                        <td>{row.origin}</td>
                        <td>{row.company}</td>
                        <td>{row.client}</td>
                        <td>{row.location}</td>
                        <td>
                          <div className="coord-cell" title={row.lat}>
                            <span>{formatCoordinatePreview(row.lat, !!expandedCoords[`${row.id}-lat`])}</span>
                            <button
                              className="table-link-action"
                              type="button"
                              aria-label={`Ver mas latitud ${row.lat}`}
                              onClick={() => toggleCoordinate(row.id, 'lat')}
                            >
                              {expandedCoords[`${row.id}-lat`] ? 'Ver menos' : 'Ver mas'}
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className="coord-cell" title={row.lon}>
                            <span>{formatCoordinatePreview(row.lon, !!expandedCoords[`${row.id}-lon`])}</span>
                            <button
                              className="table-link-action"
                              type="button"
                              aria-label={`Ver mas longitud ${row.lon}`}
                              onClick={() => toggleCoordinate(row.id, 'lon')}
                            >
                              {expandedCoords[`${row.id}-lon`] ? 'Ver menos' : 'Ver mas'}
                            </button>
                          </div>
                        </td>
                        <td>
                          <button className="table-link-action" type="button">Ver</button>
                        </td>
                        <td>{row.amenity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="table-toolbar desk-company-footer">
                <span>Mostrando 1 de {originRows.length} de 7.298 elementos</span>
                <div className="panel__actions">
                  <button className="secondary-button secondary-button--sm" type="button">Anterior</button>
                  <button className="primary-button secondary-button--sm" type="button">1</button>
                  <button className="secondary-button secondary-button--sm" type="button">Siguiente</button>
                </div>
              </div>
            </section>

            <section className="panel route-map-panel">
              <div className="panel__header compact">
                <div>
                  <h3>Monitoreo de rutas realizadas</h3>
                  <span>Mapa de seguimiento de rutas completadas (fuente Supabase/API).</span>
                </div>
              </div>

              <div className="route-map-frame">
                <iframe
                  title="Mapa de rutas realizadas"
                  src={routesMapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="table-toolbar route-map-toolbar">
                <div className="toolbar-pill muted">
                  {routesLoading ? 'Cargando rutas...' : `Rutas monitoreadas: ${routesHistory.length}`}
                </div>
                {routesError && <div className="route-map-note">{routesError}</div>}
              </div>

              <div className="table-wrapper">
                <table className="notes-table">
                  <thead>
                    <tr>
                      <th>Ruta</th>
                      <th>Fecha</th>
                      <th>Conductor</th>
                      <th>Vehículo</th>
                      <th>Paradas</th>
                      <th>Distancia</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routesHistory.map((route) => (
                      <tr key={route.id}>
                        <td className="id-cell">{route.id}</td>
                        <td>{formatDate(route.date)}</td>
                        <td>{route.conductor}</td>
                        <td>{route.vehicle}</td>
                        <td>{route.stops}</td>
                        <td>{formatQuantity(route.distanceKm)} km</td>
                        <td>
                          <span className="badge badge--success">{route.status}</span>
                        </td>
                      </tr>
                    ))}
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
