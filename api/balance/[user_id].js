import { verifyApiKey } from '../_lib/auth.js'
import { getBalance } from '../_lib/db.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  if (!verifyApiKey(req, res)) return

  const { user_id } = req.query

  if (!user_id) {
    return res.status(400).json({ error: 'user_id é obrigatório' })
  }

  try {
    const balance = await getBalance(user_id)
    return res.status(200).json({ user_id, balance })
  } catch {
    return res.status(500).json({ error: 'Erro ao buscar saldo' })
  }
}
