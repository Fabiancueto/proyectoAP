const API_URL = "http://localhost:3000/api";

export const buscarPorEmpleado = async (empleado) => {
  const response = await fetch(
    `${API_URL}/movimientos?empleado=${encodeURIComponent(empleado)}`
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

export const subirCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/movimientos/upload`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
};
