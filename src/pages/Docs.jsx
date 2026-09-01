import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search, Play, Axe, Map, Gamepad2, Coins, Shield, ChevronRight, ArrowLeft } from 'lucide-react'

const docsSections = [
  {
    id: 'getting-started',
    title: 'Começando',
    icon: Play,
    content: [
      {
        title: 'Instalação',
        text: 'Adicione o ExploraCraft ao seu servidor de Discord clicando no botão "Adicionar ao Discord". O bot precisará de permissões para funcionar corretamente.',
      },
      {
        title: 'Começando a Jogar',
        text: 'Use o comando /iniciar para começar sua aventura no ExploraCraft! Você vai começar com vida, fome e pode explorar biomas, coletar recursos e craftar itens.',
      },
      {
        title: 'Seu Perfil',
        text: 'Use /perfil para ver seu perfil de jogador e /status para acompanhar sua vida, fome e XP em tempo real.',
      },
    ],
  },
  {
    id: 'progression',
    title: 'Progressão',
    icon: Play,
    commands: [
      { name: '/iniciar', description: 'Inicie sua aventura no ExploraCraft!' },
      { name: '/perfil', description: 'Veja seu perfil de jogador' },
      { name: '/status', description: 'Veja seu status de vida, fome e XP' },
      { name: '/ranking', description: 'Veja os rankings de jogadores' },
    ],
  },
  {
    id: 'crafting',
    title: 'Coleta e Crafting',
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
    id: 'exploration',
    title: 'Exploração',
    icon: Map,
    commands: [
      { name: '/explorar', description: 'Explore diferentes locais e biomas' },
      { name: '/cacar', description: 'Vá caçar animais no bioma' },
      { name: '/pararcacar', description: 'Pare de caçar e resete tentativas' },
    ],
  },
  {
    id: 'minigames',
    title: 'Mini-Games',
    icon: Gamepad2,
    commands: [
      { name: '/exploragames', description: 'Jogue mini-games divertidos diretamente no Discord' },
    ],
  },
  {
    id: 'economy',
    title: 'Economia',
    icon: Coins,
    commands: [
      { name: '/saldo', description: 'Veja seu saldo de Minecoins' },
      { name: '/adicionar_saldo', description: 'Adiciona Minecoins (apenas dono)' },
    ],
  },
  {
    id: 'admin',
    title: 'Administração',
    icon: Shield,
    commands: [
      { name: '/ver_jogador', description: 'Ver informações de um jogador' },
      { name: '/dar_itens_todos', description: 'Dar todos os itens craftáveis' },
      { name: '/ajuda', description: 'Veja todos os comandos disponíveis' },
    ],
  },
]

export default function Docs() {
  const [activeSection, setActiveSection] = useState('getting-started')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSections = docsSections.filter((section) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      section.title.toLowerCase().includes(query) ||
      section.commands?.some(
        (cmd) =>
          cmd.name.toLowerCase().includes(query) ||
          cmd.description.toLowerCase().includes(query)
      ) ||
      section.content?.some(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.text.toLowerCase().includes(query)
      )
    )
  })

  const activeData = docsSections.find((s) => s.id === activeSection)

  return (
    <div className="min-h-screen bg-mc-bg text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 border-b border-mc-green/20" style={{ backdropFilter: 'blur(16px)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-5 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-mc-green no-underline font-semibold hover:text-mc-green-light transition-colors"
            >
              <ArrowLeft size={18} />
              Voltar
            </Link>
            <div className="w-px h-6 bg-mc-green/20" />
            <h1 className="text-base md:text-lg font-bold text-mc-green" style={{ textShadow: '1px 1px 0px #2d5016' }}>
              Documentação
            </h1>
          </div>
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
      </header>

        <div className="max-w-7xl mx-auto px-4 md:px-5 py-6 md:py-8 flex gap-4 md:gap-8">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 max-lg:hidden">
          <nav className="sticky top-24 flex flex-col gap-2">
            {filteredSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-300 border border-transparent ${
                  activeSection === section.id
                    ? 'bg-mc-green/10 text-mc-green border-mc-green/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <section.icon size={18} />
                {section.title}
                {activeSection === section.id && (
                  <ChevronRight size={14} className="ml-auto" />
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {/* Mobile section selector */}
          <div className="lg:hidden mb-6 flex flex-wrap gap-2">
            {filteredSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeSection === section.id
                    ? 'bg-mc-green/10 text-mc-green border border-mc-green/20'
                    : 'bg-white/5 text-gray-400 border border-transparent'
                }`}
              >
                <section.icon size={14} />
                {section.title}
              </button>
            ))}
          </div>

          {activeData && (
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <activeData.icon size={28} className="text-mc-green" />
                <h2
                  className="text-3xl font-bold text-mc-green"
                  style={{ textShadow: '2px 2px 0px #2d5016' }}
                >
                  {activeData.title}
                </h2>
              </div>

              {/* Content sections (Getting Started) */}
              {activeData.content && (
                <div className="flex flex-col gap-6">
                  {activeData.content.map((item) => (
                    <div
                      key={item.title}
                      className="bg-mc-bg-card rounded-xl p-6 border border-transparent hover:border-mc-green/10 transition-all"
                    >
                      <h3 className="text-lg font-bold text-mc-green-light mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Command sections */}
              {activeData.commands && (
                <div className="flex flex-col gap-4">
                  {activeData.commands.map((cmd) => (
                    <div
                      key={cmd.name}
                      className="bg-mc-bg-card rounded-xl p-6 border border-transparent hover:border-mc-green/10 transition-all"
                    >
                      <code className="text-lg font-bold text-mc-green-light block mb-2">
                        {cmd.name}
                      </code>
                      <p className="text-gray-400 leading-relaxed">
                        {cmd.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}
