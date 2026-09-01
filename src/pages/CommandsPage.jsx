import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Axe, Map, Gamepad2, Coins, Shield, ArrowLeft, Search } from 'lucide-react'

const commandCategories = [
  {
    category: 'Início e Progressão',
    icon: Play,
    bg: 'bg-gradient-to-br from-green-900/40 to-green-950/20',
    border: 'border-green-500/20 hover:border-green-500/40',
    iconBg: 'bg-green-500/20',
    iconColor: 'text-green-400',
    cmdBg: 'bg-green-500/5',
    cmdBorder: 'border-l-green-500/40',
    cmdName: 'text-green-400',
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
    bg: 'bg-gradient-to-br from-amber-900/40 to-amber-950/20',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
    cmdBg: 'bg-amber-500/5',
    cmdBorder: 'border-l-amber-500/40',
    cmdName: 'text-amber-400',
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
    bg: 'bg-gradient-to-br from-blue-900/40 to-blue-950/20',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    cmdBg: 'bg-blue-500/5',
    cmdBorder: 'border-l-blue-500/40',
    cmdName: 'text-blue-400',
    commands: [
      { name: '/explorar', description: 'Explore diferentes locais e biomas' },
      { name: '/cacar', description: 'Vá caçar animais no bioma' },
      { name: '/pararcacar', description: 'Pare de caçar e resete tentativas' },
    ],
  },
  {
    category: 'Mini-Games',
    icon: Gamepad2,
    bg: 'bg-gradient-to-br from-purple-900/40 to-purple-950/20',
    border: 'border-purple-500/20 hover:border-purple-500/40',
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-400',
    cmdBg: 'bg-purple-500/5',
    cmdBorder: 'border-l-purple-500/40',
    cmdName: 'text-purple-400',
    commands: [
      { name: '/exploragames', description: 'Jogue mini-games divertidos diretamente no Discord' },
    ],
  },
  {
    category: 'Economia',
    icon: Coins,
    bg: 'bg-gradient-to-br from-yellow-900/40 to-yellow-950/20',
    border: 'border-yellow-500/20 hover:border-yellow-500/40',
    iconBg: 'bg-yellow-500/20',
    iconColor: 'text-yellow-400',
    cmdBg: 'bg-yellow-500/5',
    cmdBorder: 'border-l-yellow-500/40',
    cmdName: 'text-yellow-400',
    commands: [
      { name: '/saldo', description: 'Veja seu saldo de Minecoins' },
      { name: '/adicionar_saldo', description: 'Adiciona Minecoins (apenas dono)' },
    ],
  },
  {
    category: 'Administração',
    icon: Shield,
    bg: 'bg-gradient-to-br from-red-900/40 to-red-950/20',
    border: 'border-red-500/20 hover:border-red-500/40',
    iconBg: 'bg-red-500/20',
    iconColor: 'text-red-400',
    cmdBg: 'bg-red-500/5',
    cmdBorder: 'border-l-red-500/40',
    cmdName: 'text-red-400',
    commands: [
      { name: '/ver_jogador', description: 'Ver informações de um jogador' },
      { name: '/dar_itens_todos', description: 'Dar todos os itens craftáveis' },
      { name: '/ajuda', description: 'Veja todos os comandos disponíveis' },
    ],
  },
]

export default function CommandsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = commandCategories
    .map((cat) => ({
      ...cat,
      commands: cat.commands.filter((cmd) => {
        if (!searchQuery) return true
        const query = searchQuery.toLowerCase()
        return (
          cmd.name.toLowerCase().includes(query) ||
          cmd.description.toLowerCase().includes(query)
        )
      }),
    }))
    .filter((cat) => cat.commands.length > 0)

  return (
    <div className="min-h-screen bg-mc-bg py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link
            to="/"
            className="flex items-center gap-2 text-mc-green no-underline font-semibold hover:text-mc-green-light transition-colors"
          >
            <ArrowLeft size={18} />
            Voltar
          </Link>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar comandos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-mc-green/20 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-mc-green/50 w-64 max-md:w-48 transition-colors"
            />
          </div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl max-md:text-2xl text-center mb-4 text-white font-bold tracking-wider"
          style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5), 4px 4px 0px rgba(0,0,0,0.3)' }}
        >
          Comandos Disponíveis
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center text-gray-400 mb-16"
        >
          Use <code className="bg-white/10 px-2 py-1 rounded text-mc-green font-bold">/ajuda</code> no Discord para ver todos os comandos
        </motion.p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.08 }}
              className={`${cat.bg} rounded-2xl p-4 md:p-6 border ${cat.border} transition-all duration-300`}
            >
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-5">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl ${cat.iconBg} flex items-center justify-center`}>
                  <cat.icon size={18} className={cat.iconColor} />
                </div>
                <h2 className="text-base md:text-lg text-white font-bold m-0">
                  {cat.category}
                </h2>
              </div>

              <div className="flex flex-col gap-2">
                {cat.commands.map((cmd) => (
                  <div
                    key={cmd.name}
                    className={`p-2.5 md:p-3 ${cat.cmdBg} rounded-lg border-l-2 ${cat.cmdBorder} hover:brightness-110 transition-all`}
                  >
                    <div className={`font-mono text-sm ${cat.cmdName} font-bold`}>
                      {cmd.name}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      {cmd.description}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
