import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const fallbackServers = [
  { name: 'Servidor 1', icon: null, id: '1' },
  { name: 'Servidor 2', icon: null, id: '2' },
  { name: 'Servidor 3', icon: null, id: '3' },
  { name: 'Servidor 4', icon: null, id: '4' },
]

export default function Servers() {
  const [servers, setServers] = useState(fallbackServers)

  useEffect(() => {
    fetch('/api/guilds')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServers(data)
        }
      })
      .catch(() => {})
  }, [])

  const duplicated = [...servers, ...servers]

  return (
    <section className="py-20 relative z-10 bg-[#0d0d0d]/80 mt-16 mb-16 overflow-hidden" id="servers">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl max-md:text-2xl text-center mb-12 text-gray-200 font-bold tracking-wider px-6"
        style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5), 4px 4px 0px rgba(0,0,0,0.3)' }}
      >
        Várias pessoas curte o ExploraCraft!
      </motion.h2>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#0d0d0d]/80 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#0d0d0d]/80 to-transparent pointer-events-none" />

        <div className="flex gap-8 animate-marquee w-max">
          {duplicated.map((server, index) => (
            <a
              key={`${server.id || server.name}-${index}`}
              href={server.invite || `https://discord.gg/${server.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center justify-center group cursor-pointer no-underline"
            >
              <div className="w-24 h-24 max-md:w-18 max-md:h-18 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-mc-green/60 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(124,179,66,0.3)]">
                <img
                  src={server.icon || `https://ui-avatars.com/api/?name=${server.name}&background=2d6a4f&color=fff&size=192`}
                  alt={server.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${server.name}&background=2d6a4f&color=fff&size=192`
                  }}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
