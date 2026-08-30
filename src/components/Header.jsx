import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogOut } from 'lucide-react'
import { useClickSound } from '../hooks/useClickSound'
import { useDiscordAuth } from '../hooks/useDiscordAuth'

const API_BASE = ''

const minecraftButton = {
  background: 'linear-gradient(180deg, #7cb342 0%, #689f38 50%, #558b2f 100%)',
  textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
  border: '2px solid #2d5016',
  borderTopColor: '#9ccc65',
  borderLeftColor: '#9ccc65',
  borderBottomColor: '#1a1a1a',
  borderRightColor: '#1a1a1a',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.3), 0 3px 0 #2d5016, 0 4px 6px rgba(0,0,0,0.4)',
}

const minecraftButtonMobile = {
  background: 'linear-gradient(180deg, #7cb342 0%, #558b2f 100%)',
  textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
}

export default function Header() {
  const playClick = useClickSound()
  const { user, login, logout } = useDiscordAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navLinks = [
    { href: '/#home', label: 'Inicio' },
    { href: '/#features', label: 'Recursos' },
    { href: '/comandos', label: 'Comandos' },
    { href: '/docs', label: 'Docs' },
    { href: '/premium', label: 'Premium' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1a1a1a]/95 border-b-2 border-mc-green shadow-[0_4px_20px_rgba(124,179,66,0.2)]'
          : 'bg-[#1a1a1a]/80'
      }`}
      style={{ backdropFilter: 'blur(16px)' }}
    >
      <div className="px-6">
        <div className="flex justify-between items-center py-5">
          {/* Logo */}
          <a href="/#home" className="flex items-center gap-3 text-gray-300 font-bold text-xl no-underline">
            <img src="/bedrock.png" alt="ExploraCraft" className="w-10 h-10 drop-shadow-lg" />
            <span className="drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">ExploraCraft</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={playClick}
                className="text-white no-underline font-semibold py-2 px-3 rounded transition-all duration-300 hover:text-gray-300 hover:-translate-y-0.5 relative group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-mc-green transition-all duration-300 group-hover:w-4/5" />
              </a>
            ))}

            {user ? (
              <div className="relative">
                <button
                  onClick={() => { playClick(); setUserMenuOpen(!userMenuOpen) }}
                  className="flex items-center gap-2 cursor-pointer bg-transparent border-none"
                >
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-9 h-9 rounded-full border-2 border-mc-green"
                  />
                  <span className="text-white font-semibold text-sm">{user.username}</span>
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 bg-[#2a2a2a] border border-mc-border rounded-lg shadow-xl min-w-[160px] overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-mc-border">
                        <p className="text-white font-bold text-sm">{user.globalName}</p>
                        <p className="text-gray-400 text-xs">@{user.username}</p>
                      </div>
                      <button
                        onClick={() => { playClick(); logout(); setUserMenuOpen(false) }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-white/5 border-none bg-transparent cursor-pointer text-sm font-semibold transition-colors"
                      >
                        <LogOut size={16} />
                        Sair
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => { playClick(); login() }}
                className="text-white no-underline font-bold px-5 py-2.5 rounded relative overflow-hidden transition-all duration-300 hover:translate-y-0.5 whitespace-nowrap cursor-pointer border-none"
                style={minecraftButton}
              >
                Entrar com Discord
              </button>
            )}
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-3">
            {user && (
              <img
                src={user.avatar}
                alt={user.username}
                className="w-8 h-8 rounded-full border-2 border-mc-green"
              />
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#1a1a1a]/98 border-t border-mc-border"
            style={{ backdropFilter: 'blur(20px)' }}
          >
            <nav className="flex flex-col items-center gap-2 py-6 px-5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => { playClick(); setMobileOpen(false) }}
                  className="text-white no-underline font-semibold py-3 px-6 rounded-lg w-full text-center hover:bg-white/5 hover:text-gray-300 transition-all"
                >
                  {link.label}
                </motion.a>
              ))}

              {user ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-full flex flex-col items-center gap-3 mt-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full border-2 border-mc-green"
                    />
                    <div className="text-left">
                      <p className="text-white font-bold text-sm">{user.globalName}</p>
                      <p className="text-gray-400 text-xs">@{user.username}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { playClick(); logout(); setMobileOpen(false) }}
                    className="flex items-center gap-2 text-red-400 font-semibold text-sm bg-transparent border-none cursor-pointer py-2"
                  >
                    <LogOut size={16} />
                    Sair
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  onClick={() => { playClick(); login() }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-2 text-white no-underline font-bold py-3 px-8 rounded-lg text-center w-full cursor-pointer border-none"
                  style={minecraftButtonMobile}
                >
                  Entrar com Discord
                </motion.button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
