import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search, Hammer, Monitor, UserCog, BarChart3, Settings, ChevronRight, ArrowLeft } from 'lucide-react'

const docsSections = [
  {
    id: 'getting-started',
    title: 'Começando',
    icon: Hammer,
    content: [
      {
        title: 'Instalação',
        text: 'Adicione o ExploraCraft ao seu servidor de Discord clicando no botão "Adicionar ao Discord". O bot precisará de permissões de administrador para funcionar corretamente.',
      },
      {
        title: 'Configuração Inicial',
        text: 'Use o comando /setup para iniciar a configuração básica do bot. Ele irá guiar você através do processo de vinculação com seu servidor Minecraft.',
      },
      {
        title: 'Permissões',
        text: 'O bot requer as seguintes permissões: Enviar Mensagens, Embed Links, Anexar Arquivos, Ler Histórico, Gerenciar Mensagens.',
      },
    ],
  },
  {
    id: 'status-commands',
    title: 'Comandos de Status',
    icon: Monitor,
    commands: [
      { name: '/status', description: 'Mostra o status em tempo real do servidor, incluindo jogadores online, TPS, memória usage e versão.' },
      { name: '/players', description: 'Lista todos os jogadores atualmente online no servidor, com seus ping e tempo de jogo.' },
      { name: '/info', description: 'Exibe informações detalhadas do servidor: IP, porta, versão, plugins instalados e configurações.' },
    ],
  },
  {
    id: 'management-commands',
    title: 'Comandos de Gerenciamento',
    icon: UserCog,
    commands: [
      { name: '/kick [jogador] [razão]', description: 'Remove um jogador do servidor. A razão é opcional. Exemplo: /kick Steve flood' },
      { name: '/ban [jogador] [razão]', description: 'Bane permanentemente um jogador do servidor. Suporta Temporary bans.' },
      { name: '/whitelist [adicionar/remover] [jogador]', description: 'Gerencia a whitelist do servidor. Adiciona ou remove jogadores da lista.' },
      { name: '/tp [jogador1] [jogador2]', description: 'Teleporta um jogador para a posição de outro jogador.' },
    ],
  },
  {
    id: 'stats-commands',
    title: 'Comandos de Estatísticas',
    icon: BarChart3,
    commands: [
      { name: '/stats [jogador]', description: 'Mostra estatísticas detalhadas: blocos quebrados, mobs mortos, tempo de jogo, distâncias percorridas.' },
      { name: '/leaderboard [categoria]', description: 'Exibe o ranking dos jogadores em diferentes categorias: tempo de jogo, mineração, construção.' },
      { name: '/playtime [jogador]', description: 'Mostra o tempo total de jogo de um jogador, com gráficos diários e semanais.' },
    ],
  },
  {
    id: 'config-commands',
    title: 'Configuração',
    icon: Settings,
    commands: [
      { name: '/setup', description: 'Inicia o assistente de configuração interativo. Vincula o bot ao seu servidor Minecraft.' },
      { name: '/notify [canal] [tipo]', description: 'Configura canais de notificação para diferentes eventos: join, leave, death, achievement.' },
      { name: '/prefix [novo]', description: 'Altera o prefixo dos comandos. Pode ser qualquer sequência de caracteres.' },
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
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-mc-green no-underline font-semibold hover:text-mc-green-light transition-colors"
            >
              <ArrowLeft size={18} />
              Voltar
            </Link>
            <div className="w-px h-6 bg-mc-green/20" />
            <h1 className="text-lg font-bold text-mc-green" style={{ textShadow: '1px 1px 0px #2d5016' }}>
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

      <div className="max-w-7xl mx-auto px-5 py-8 flex gap-8">
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
