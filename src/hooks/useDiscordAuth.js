import { useState, useCallback } from 'react'

export function useDiscordAuth() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('discord_user'))
    } catch {
      return null
    }
  })

  const login = useCallback(() => {
    window.location.href = '/api/auth/discord'
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('discord_user')
    setUser(null)
  }, [])

  return { user, login, logout }
}
