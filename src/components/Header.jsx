import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isDark, toggle } = useTheme()

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
    { href: '/#home', label: 'Início' },
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
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white no-underline font-semibold py-2 px-4 rounded transition-all duration-300 hover:text-gray-300 hover:-translate-y-0.5 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-mc-green transition-all duration-300 group-hover:w-4/5" />
              </a>
            ))}

            <button
              onClick={toggle}
              className="p-2 rounded-lg bg-white/5 text-white/70 hover:text-gray-300 hover:bg-white/10 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="https://discord.com/oauth2/authorize"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white no-underline font-bold px-5 py-2.5 rounded relative overflow-hidden transition-all duration-300 hover:translate-y-0.5 whitespace-nowrap"
              style={{
                background: 'linear-gradient(180deg, #7cb342 0%, #689f38 50%, #558b2f 100%)',
                textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                border: '2px solid #2d5016',
                borderTopColor: '#9ccc65',
                borderLeftColor: '#9ccc65',
                borderBottomColor: '#1a1a1a',
                borderRightColor: '#1a1a1a',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.3), 0 3px 0 #2d5016, 0 4px 6px rgba(0,0,0,0.4)',
              }}
            >
              Adicionar ao Discord
            </a>
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggle}
              className="p-2 rounded-lg bg-white/5 text-white/70 hover:text-gray-300 transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
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
                  onClick={() => setMobileOpen(false)}
                  className="text-white no-underline font-semibold py-3 px-6 rounded-lg w-full text-center hover:bg-white/5 hover:text-gray-300 transition-all"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="https://discord.com/oauth2/authorize"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-2 text-white no-underline font-bold py-3 px-8 rounded-lg text-center w-full"
                style={{
                  background: 'linear-gradient(180deg, #7cb342 0%, #558b2f 100%)',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                }}
              >
                Adicionar ao Discord
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
