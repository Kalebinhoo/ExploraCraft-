import { createClient } from '@libsql/client'

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export async function ensureDmTable() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS dm_notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      titulo TEXT NOT NULL,
      mensagem TEXT NOT NULL,
      sent INTEGER DEFAULT 0,
      created_at INTEGER NOT NULL
    )
  `)
}

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

  await ensureDmTable()

  const pacotes = {
    starter: { nome: 'Starter', coins: 500, preco: 'R$ 5,00' },
    pro: { nome: 'Pro', coins: 1500, preco: 'R$ 12,00' },
    mega: { nome: 'Mega', coins: 5000, preco: 'R$ 35,00' },
  }

  const pkgKey = reason.replace('compra_', '')
  const pkg = pacotes[pkgKey] || { nome: reason, coins: amount, preco: 'N/A' }

  const titulo = 'Pagamento Confirmado!'
  const mensagem = [
    `Seu pagamento foi confirmado com sucesso!`,
    ``,
    `**Pacote:** ${pkg.nome}`,
    `**Minecoins:** +${pkg.coins}`,
    `**Valor:** ${pkg.preco}`,
    ``,
    `Use \`/saldo\` no Discord para ver seu novo saldo!`,
  ].join('\n')

  await client.execute({
    sql: `
      INSERT INTO dm_notifications (user_id, titulo, mensagem, sent, created_at)
      VALUES (?, ?, ?, 0, ?)
    `,
    args: [userId, titulo, mensagem, timestamp],
  })

  const balance = await getBalance(userId)
  return { userId, balance, added: amount, reason }
}
