import { useCallback, useRef } from 'react'

const clickAudio = typeof Audio !== 'undefined' ? new Audio('/click.mp3') : null

export function useClickSound() {
  const lastPlay = useRef(0)

  const play = useCallback(() => {
    const now = Date.now()
    if (now - lastPlay.current < 50) return
    lastPlay.current = now
    if (!clickAudio) return
    clickAudio.currentTime = 0
    clickAudio.volume = 0.5
    clickAudio.play().catch(() => {})
  }, [])

  return play
}
