import apiClient from './apiClient'

export async function loginUser({ correo, contrasena }) {
  const { data } = await apiClient.post('/login', { correo, contrasena })
  return data
}

export async function registerUser({ nombre, correo, contrasena }) {
  const { data } = await apiClient.post('/register', { nombre, correo, contrasena })
  return data
}

export async function sendAiQuery(query) {
  const { data } = await apiClient.post('/sendqueryIA', { query })
  return data
}

export async function saveConversation({ usuarioId, consulta, respuesta }) {
  const { data } = await apiClient.post('/saveConversation', {
    usuario_id: usuarioId,
    consulta,
    respuesta
  })

  return data
}

export async function getUserConsults(usuarioId) {
  const { data } = await apiClient.get('/userConsults', {
    params: { usuario_id: usuarioId }
  })

  return data
}

export async function getUserMarks(usuarioId) {
  const { data } = await apiClient.get('/userMarks', {
    params: { usuario_id: usuarioId }
  })

  return data
}

export async function getUserData(usuarioId) {
  const { data } = await apiClient.get('/userData', {
    params: { usuario_id: usuarioId }
  })

  return data
}

export async function updateUsername({ usuarioId, nuevoNombre }) {
  const { data } = await apiClient.put('/editUsername', {
    usuario_id: usuarioId,
    nuevo_nombre: nuevoNombre
  })

  return data
}

export async function updatePassword({ usuarioId, nuevaContrasena }) {
  const { data } = await apiClient.put('/editPassword', {
    usuario_id: usuarioId,
    nueva_contrasena: nuevaContrasena
  })

  return data
}

export async function getUsers() {
  const { data } = await apiClient.get('/users')
  return data
}

export async function updateUser({ usuarioId, nuevoNombre, nuevaContrasena, rol }) {
  const { data } = await apiClient.put('/editUser', {
    nuevo_nombre: nuevoNombre,
    nueva_contrasena: nuevaContrasena,
    rol
  }, {
    params: { usuario_id: usuarioId }
  })

  return data
}

export async function deleteUser(usuarioId) {
  const { data } = await apiClient.delete('/deleteUser', {
    params: { usuario_id: usuarioId }
  })

  return data
}

export async function generateTest({ difficulty, topics }) {
  const { data } = await apiClient.post('/generateTest', { difficulty, topics })
  return data
}

export async function saveMark({ usuarioId, calificacion, dificultad, temas }) {
  const { data } = await apiClient.post('/saveMark', {
    usuario_id: usuarioId,
    calificacion,
    dificultad,
    temas
  })

  return data
}
