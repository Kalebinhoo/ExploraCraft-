export default async function handler(req, res) {
  const token = process.env.DISCORD_BOT_TOKEN

  if (!token) {
    return res.status(500).json({ error: 'Token não configurado' })
  }

  try {
    const response = await fetch('https://discord.com/api/v10/users/@me/guilds', {
      headers: {
        Authorization: `Bot ${token}`,
      },
    })

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erro ao buscar servidores' })
    }

    const guilds = await response.json()

    const formatted = guilds.map((g) => ({
      id: g.id,
      name: g.name,
      icon: g.icon
        ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=128`
        : null,
      members: g.approximate_member_count || null,
      invite: `https://discord.gg/${g.vanity_url_code || ''}`,
    }))

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    return res.status(200).json(formatted)
  } catch {
    return res.status(500).json({ error: 'Erro interno' })
  }
}
