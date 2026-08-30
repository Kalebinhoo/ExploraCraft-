const DB_URL = process.env.DATABASE_URL

let balances = {}

export async function getBalance(userId) {
  if (DB_URL) {
    const res = await fetch(`${DB_URL}/balance/${userId}`)
    const data = await res.json()
    return data.balance || 0
  }
  return balances[userId] || 0
}

export async function addBalance(userId, amount, reason = '') {
  if (DB_URL) {
    const res = await fetch(`${DB_URL}/balance/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, reason }),
    })
    return await res.json()
  }

  if (!balances[userId]) balances[userId] = 0
  balances[userId] += amount
  return { userId, balance: balances[userId], added: amount, reason }
}
