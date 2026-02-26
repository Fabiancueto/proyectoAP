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

export const subirCSV = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('file', file)

    const xhr = new XMLHttpRequest()

    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100))
        }
      })
    }

    xhr.addEventListener('load', () => {
      if (xhr.status === 401) { handleUnauthorized(); return }
      if (xhr.status >= 200 && xhr.status < 300) {
        try { resolve(JSON.parse(xhr.responseText)) }
        catch { resolve({ message: 'Carga exitosa.' }) }
      } else {
        reject(new Error(`Error ${xhr.status}: ${xhr.statusText}`))
      }
    })

    xhr.addEventListener('error', () => reject(new Error('Error de red al subir el archivo.')))

    const token = localStorage.getItem(TOKEN_KEY)
    xhr.open('POST', `${API_URL}/movimientos/upload`)
    if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.send(formData)
  })
}
