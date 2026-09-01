import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Particles from '@tsparticles/react'
import { loadFull } from 'tsparticles'
import { useClickSound } from '../hooks/useClickSound'
import { useDiscordAuth } from '../hooks/useDiscordAuth'

export default function Hero() {
  const [ready, setReady] = useState(false)
  const playClick = useClickSound()
  const { user, login } = useDiscordAuth()

  useEffect(() => {
    loadFull().then(() => setReady(true))
  }, [])

  const options = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      particles: {
        number: { value: 30, density: { enable: true } },
        color: { value: '#555' },
        shape: { type: 'square' },
        opacity: {
          value: { min: 0.2, max: 0.5 },
          animation: { enable: true, speed: 0.4 },
        },
        size: { value: { min: 2, max: 5 } },
        move: {
          enable: true,
          speed: { min: 0.2, max: 0.6 },
          direction: 'none',
          outModes: 'out',
        },
        links: {
          enable: true,
          distance: 80,
          color: '#333',
          opacity: 0.2,
          width: 1,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
        },
        modes: {
          grab: { distance: 140, links: { opacity: 0.4 } },
        },
      },
    }),
    []
  )

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="home"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: 'url(/steve_squeleton.png)' }}
      />

      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/60 z-[1] pointer-events-none" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#1a1a1a]/90 z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-[1] pointer-events-none" />

      {/* Particles */}
      {ready && (
        <Particles
          id="hero-particles"
          options={options}
          className="absolute inset-0 z-[2] pointer-events-auto"
        />
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center px-5"
      >
        <motion.div
          className="flex flex-col items-center"
        >
          {/* Title */}
          <motion.h1 variants={itemVariants} className="flex flex-col gap-4 mb-6 md:mb-8">
            <span
              className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-wider"
              style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5), 4px 4px 0px rgba(0,0,0,0.3)' }}
            >
              ExploraCraft
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-2"
          >
            Jogue Minecraft dentro do Discord com amigos. Explore, colete, craft e evolua — tudo em um mini-game interativo!
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex gap-3 sm:gap-5 flex-wrap justify-center px-2">
            {user ? (
              <motion.a
                href="https://discord.com/oauth2/authorize"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-white no-underline font-bold px-5 sm:px-8 py-3 sm:py-4 rounded relative overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #7cb342 0%, #689f38 50%, #558b2f 100%)',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                  border: '2px solid #2d5016',
                  borderTopColor: '#9ccc65',
                  borderLeftColor: '#9ccc65',
                  borderBottomColor: '#1a1a1a',
                  borderRightColor: '#1a1a1a',
                  boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -2px 0 rgba(0,0,0,0.3), 0 4px 0 #1a1a1a, 0 6px 8px rgba(0,0,0,0.5)',
                }}
              >
                Adicionar ao Discord
              </motion.a>
            ) : (
              <motion.button
                onClick={() => { playClick(); login() }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-white no-underline font-bold px-5 sm:px-8 py-3 sm:py-4 rounded relative overflow-hidden cursor-pointer border-none"
                style={{
                  background: 'linear-gradient(180deg, #7cb342 0%, #689f38 50%, #558b2f 100%)',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                  border: '2px solid #2d5016',
                  borderTopColor: '#9ccc65',
                  borderLeftColor: '#9ccc65',
                  borderBottomColor: '#1a1a1a',
                  borderRightColor: '#1a1a1a',
                  boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -2px 0 rgba(0,0,0,0.3), 0 4px 0 #1a1a1a, 0 6px 8px rgba(0,0,0,0.5)',
                }}
              >
                Entrar com Discord
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}
