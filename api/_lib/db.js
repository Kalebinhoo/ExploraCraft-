import { createClient } from '@libsql/client'

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export async function initDB() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS balances (
      user_id TEXT PRIMARY KEY,
      balance INTEGER DEFAULT 0
    )
  `)
}

export async function getBalance(userId) {
  await initDB()
  const result = await client.execute({
    sql: 'SELECT balance FROM balances WHERE user_id = ?',
    args: [userId],
  })
  return result.rows[0]?.balance || 0
}

export async function addBalance(userId, amount, reason = '') {
  await initDB()
  await client.execute({
    sql: `
      INSERT INTO balances (user_id, balance)
      VALUES (?, ?)
      ON CONFLICT(user_id) DO UPDATE SET balance = balance + ?
    `,
    args: [userId, amount, amount],
  })
  const balance = await getBalance(userId)
  return { userId, balance, added: amount, reason }
}
