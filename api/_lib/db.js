import { createClient } from '@libsql/client'

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export async function getBalance(userId) {
  const result = await client.execute({
    sql: 'SELECT moedas FROM jogadores WHERE id = ?',
    args: [userId],
  })
  return result.rows[0]?.moedas || 0
}

export async function addBalance(userId, amount, reason = '') {
  await client.execute({
    sql: `
      INSERT INTO jogadores (id, moedas)
      VALUES (?, ?)
      ON CONFLICT(id) DO UPDATE SET moedas = moedas + ?
    `,
    args: [userId, amount, amount],
  })

  const timestamp = Math.floor(Date.now() / 1000)
  const detalhes = JSON.stringify({ tipo: 'adicao', quantidade: amount, motivo: reason })
  await client.execute({
    sql: `
      INSERT INTO logs (jogador_id, acao, detalhes, timestamp)
      VALUES (?, ?, ?, ?)
    `,
    args: [userId, 'transacao', detalhes, timestamp],
  })

  const balance = await getBalance(userId)
  return { userId, balance, added: amount, reason }
}
