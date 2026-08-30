import { motion } from 'framer-motion'
import { Play, Axe, Map, Gamepad2, Coins, User } from 'lucide-react'

const features = [
  {
    icon: Play,
    title: 'Sistema de Progressão',
    description: 'Comece sua jornada com /iniciar, evolua seu personagem, ganhe XP e suba de nível.',
  },
  {
    icon: Axe,
    title: 'Coleta e Crafting',
    description: 'Colete madeira, minere recursos, use a fornalha e crie itens com /craft.',
  },
  {
    icon: Map,
    title: 'Exploração de Biomas',
    description: 'Explore diferentes locais e biomas, descubra recursos raros e novos ambientes.',
  },
  {
    icon: Gamepad2,
    title: 'Mini-Games',
    description: 'Jogue mini-games divertidos diretamente no Discord com /exploragames.',
  },
  {
    icon: Coins,
    title: 'Economia',
    description: 'Ganhe e gaste Minecoins, compre itens no marketplace e gerencie seu saldo.',
  },
  {
    icon: User,
    title: 'Perfil e Ranking',
    description: 'Veja seu perfil, inventário, status de vida e compete no ranking de jogadores.',
  },
]

export default function Features() {
  return (
    <section className="py-24 relative z-10 bg-[#0d0d0d]/80 mt-16 mb-16" id="features">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl max-md:text-2xl text-center mb-16 text-gray-200 font-bold tracking-wider px-6"
        style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5), 4px 4px 0px rgba(0,0,0,0.3)' }}
      >
        Recursos Poderosos
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-mc-bg-card backdrop-blur-sm rounded-2xl p-10 text-center relative overflow-hidden group cursor-default border border-transparent"
          >
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-6 bg-white/5 rounded-2xl flex items-center justify-center">
                <feature.icon size={40} className="text-gray-400 drop-shadow-lg" />
              </div>

              <h3
                className="text-xl text-gray-300 mb-4 font-bold"
                style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}
              >
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-relaxed text-base">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
