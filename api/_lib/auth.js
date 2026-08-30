const API_KEY = process.env.API_KEY

export function verifyApiKey(req, res) {
  const key = req.headers['x-api-key']
  if (!API_KEY) {
    return res.status(500).json({ error: 'API_KEY não configurada no servidor' })
  }
  if (key !== API_KEY) {
    return res.status(401).json({ error: 'API key inválida' })
  }
  return true
}
