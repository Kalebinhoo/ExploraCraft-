export default function handler(req, res) {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    redirect_uri: `${process.env.SITE_URL || 'https://explora-craft.vercel.app'}/api/auth/callback`,
    response_type: 'code',
    scope: 'identify',
  })
  res.redirect(`https://discord.com/api/oauth2/authorize?${params}`)
}
