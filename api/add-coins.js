import { verifyApiKey } from '../_lib/auth.js'
import { addBalance } from '../_lib/db.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  if (!verifyApiKey(req, res)) return

  const { user_id, quantidade, motivo } = req.body

  if (!user_id || !quantidade) {
    return res.status(400).json({ error: 'user_id e quantidade são obrigatórios' })
  }

  if (typeof quantidade !== 'number' || quantidade <= 0) {
    return res.status(400).json({ error: 'quantidade deve ser um número positivo' })
  }

  try {
    const result = await addBalance(user_id, quantidade, motivo || 'compra')
    return res.status(200).json({
      success: true,
      user_id,
      added: quantidade,
      balance: result.balance,
      motivo: motivo || 'compra',
    })
  } catch {
    return res.status(500).json({ error: 'Erro ao adicionar coins' })
  }
}
