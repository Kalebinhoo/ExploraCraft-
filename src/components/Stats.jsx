import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Gamepad2, Users, Map, Clock } from 'lucide-react'

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return
    const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''))
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * numericTarget))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  const displayTarget = target.includes('K') ? `${count}K+`
    : target.includes('%') ? `${count}%`
    : target.includes('/') ? '24/7'
    : `${count}+`

  return <span ref={ref}>{isInView ? displayTarget : '0'}</span>
}

const stats = [
  { icon: Gamepad2, number: '18', suffix: '+', label: 'Comandos' },
  { icon: Users, number: '10', suffix: 'K+', label: 'Jogadores' },
  { icon: Map, number: '6', suffix: '', label: 'Biomas' },
  { icon: Clock, number: '24/7', suffix: '', label: 'Online' },
]

export default function Stats() {
  return (
    <section className="py-20 relative z-10 bg-mc-green/5 border-y-2 border-mc-green/30 mb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, borderColor: 'rgba(124,179,66,0.5)' }}
            className="text-center p-7 bg-mc-bg-card rounded-xl border border-transparent transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,179,66,0.15)]"
          >
            <stat.icon
              size={48}
              className="mx-auto mb-4 text-gray-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            />
            <div className="text-4xl max-md:text-3xl font-black text-gray-200 mb-2.5" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>
              <AnimatedCounter target={stat.number + stat.suffix} />
            </div>
            <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
