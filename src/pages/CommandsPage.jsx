import { motion } from 'framer-motion'
import { Play, Axe, Map, Gamepad2, Coins, Shield } from 'lucide-react'

const commandCategories = [
  {
    category: 'Início e Progressão',
    icon: Play,
    commands: [
      { name: '/iniciar', description: 'Inicie sua aventura no ExploraCraft!' },
      { name: '/perfil', description: 'Veja seu perfil de jogador' },
      { name: '/status', description: 'Veja seu status de vida, fome e XP' },
      { name: '/ranking', description: 'Veja os rankings de jogadores' },
    ],
  },
  {
    category: 'Coleta e Crafting',
    icon: Axe,
    commands: [
      { name: '/madeira', description: 'Colete madeira no bioma atual' },
      { name: '/craft', description: 'Crie itens e ferramentas' },
      { name: '/fornalha', description: 'Processe itens na fornalha' },
      { name: '/inventario', description: 'Veja seu inventário' },
      { name: '/parar', description: 'Pare de coletar madeira' },
    ],
  },
  {
    category: 'Exploração',
    icon: Map,
    commands: [
      { name: '/explorar', description: 'Explore diferentes locais e biomas' },
      { name: '/cacar', description: 'Vá caçar animais no bioma' },
      { name: '/pararcacar', description: 'Pare de caçar e resete tentativas' },
    ],
  },
  {
    category: 'Mini-Games',
    icon: Gamepad2,
    commands: [
      { name: '/exploragames', description: 'Jogue mini-games divertidos diretamente no Discord' },
    ],
  },
  {
    category: 'Economia',
    icon: Coins,
    commands: [
      { name: '/saldo', description: 'Veja seu saldo de Minecoins' },
      { name: '/adicionar_saldo', description: 'Adiciona Minecoins (apenas dono)' },
    ],
  },
  {
    category: 'Administração',
    icon: Shield,
    commands: [
      { name: '/ver_jogador', description: 'Ver informações de um jogador' },
      { name: '/dar_itens_todos', description: 'Dar todos os itens craftáveis' },
      { name: '/ajuda', description: 'Veja todos os comandos disponíveis' },
    ],
  },
]

export default function CommandsPage() {
  return (
    <div className="min-h-screen bg-mc-bg py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl max-md:text-2xl text-center mb-16 text-white font-bold tracking-wider"
          style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5), 4px 4px 0px rgba(0,0,0,0.3)' }}
        >
          Comandos Disponíveis
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commandCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              className="bg-mc-bg-card rounded-xl p-6 border border-mc-green/10 hover:border-mc-green/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                <cat.icon size={22} className="text-gray-400" />
                <h2
                  className="text-lg text-gray-300 font-bold m-0"
                  style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}
                >
                  {cat.category}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {cat.commands.map((cmd) => (
                  <div
                    key={cmd.name}
                    className="p-3 bg-white/5 border-l-2 border-white/20 hover:border-white/40 transition-colors"
                  >
                    <div className="font-mono text-sm text-gray-300 font-bold">
                      {cmd.name}
                    </div>
                    <div className="text-gray-500 text-xs mt-1">
                      {cmd.description}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center py-8 px-5 bg-white/5 rounded-xl max-w-5xl mx-auto mt-12"
        >
          <p className="text-lg text-gray-400 font-semibold">
            Use{' '}
            <code className="bg-[#1a1a1a]/80 px-3 py-1.5 rounded text-gray-300 font-bold border border-white/10 text-base">
              /ajuda
            </code>{' '}
            no Discord para ver todos os comandos
          </p>
        </motion.div>
      </div>
    </div>
  )
}
