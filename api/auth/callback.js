export default async function handler(req, res) {
  const { code } = req.query

  if (!code) {
    return res.redirect('/?error=no_code')
  }

  try {
    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${process.env.SITE_URL || 'https://explora-craft.vercel.app'}/api/auth/callback`,
      }),
    })

    const tokenData = await tokenRes.json()

    if (!tokenData.access_token) {
      return res.redirect('/?error=token_failed')
    }

    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })

    const user = await userRes.json()

    const html = `<!DOCTYPE html><html><head><title>Entrando...</title></head><body><script>
      localStorage.setItem('discord_user', JSON.stringify(${JSON.stringify({
        id: user.id,
        username: user.username,
        avatar: user.avatar
          ? 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar + (user.avatar.startsWith('a_') ? '.gif' : '.png')
          : 'https://cdn.discordapp.com/embed/avatars/' + (parseInt(user.discriminator || '0') % 5) + '.png',
        globalName: user.global_name || user.username,
      })}));
      window.location.href = '/';
    </script></body></html>`

    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  } catch {
    return res.redirect('/?error=auth_failed')
  }
}
