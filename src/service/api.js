const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const TOKEN_KEY = 'ap_token'

function getAuthHeaders() {
  const token = localStorage.getItem(TOKEN_KEY)
  return token ? { Authorization: `Bearer ${token}` } : {}
}

function handleUnauthorized() {
  localStorage.removeItem(TOKEN_KEY)
  window.location.href = '/login'
}

async function fetchMovimientos(params) {
  const query = new URLSearchParams(params).toString()
  const response = await fetch(`${API_URL}/movimientos?${query}`, {
    headers: { ...getAuthHeaders() },
  })
  if (response.status === 401) {
    handleUnauthorized()
    return
  }
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }
  return response.json()
}

export const loginApi = async (email, passwordHash) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, passwordHash }),
  })
  if (!response.ok) {
    throw new Error('Credenciales inválidas.')
  }
  return response.json()
}

export const fetchTodosMovimientos = () => fetchMovimientos({})

export const buscarPorEmpleado = (empleado) => fetchMovimientos({ empleado })

export const buscarPorTienda = (tienda) => fetchMovimientos({ tienda })

export const buscarPorRegion = (plaza) => fetchMovimientos({ plaza })

export const subirCSV = async (file) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_URL}/movimientos/upload`, {
    method: 'POST',
    headers: { ...getAuthHeaders() },
    body: formData,
  })
  if (response.status === 401) {
    handleUnauthorized()
    return
  }
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }
  return response.json()
}
