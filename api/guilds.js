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

    const formatted = await Promise.all(
      guilds.map(async (g) => {
        let invite = null

        if (g.vanity_url_code) {
          invite = `https://discord.gg/${g.vanity_url_code}`
        } else {
          try {
            const channelsRes = await fetch(`https://discord.com/api/v10/guilds/${g.id}/channels`, {
              headers: { Authorization: `Bot ${token}` },
            })
            if (channelsRes.ok) {
              const channels = await channelsRes.json()
              const textChannel = channels.find((c) => c.type === 0)
              if (textChannel) {
                const inviteRes = await fetch(
                  `https://discord.com/api/v10/channels/${textChannel.id}/invites`,
                  {
                    method: 'POST',
                    headers: {
                      Authorization: `Bot ${token}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ max_age: 86400 }),
                  }
                )
                if (inviteRes.ok) {
                  const inv = await inviteRes.json()
                  invite = `https://discord.gg/${inv.code}`
                }
              }
            }
          } catch {}
        }

        return {
          id: g.id,
          name: g.name,
          icon: g.icon
            ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=128`
            : null,
          members: g.approximate_member_count || null,
          invite,
        }
      })
    )

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    return res.status(200).json(formatted)
  } catch {
    return res.status(500).json({ error: 'Erro interno' })
  }
}
