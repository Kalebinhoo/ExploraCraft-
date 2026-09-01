import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, LogOut, Shield, Coins, Gamepad2 } from 'lucide-react'
import { useDiscordAuth } from '../hooks/useDiscordAuth'
import Header from '../components/Header'

export default function DashboardPage() {
  const { user, logout } = useDiscordAuth()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="min-h-screen bg-mc-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Você precisa estar logado para acessar o painel.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-mc-green/20 text-mc-green rounded-lg border border-mc-green/30 hover:bg-mc-green/30 transition-all cursor-pointer"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    )
  }

  const stats = [
    { icon: Coins, label: 'Minecoins', value: '0', color: 'text-yellow-400' },
    { icon: Gamepad2, label: 'Partidas', value: '0', color: 'text-mc-green' },
    { icon: Shield, label: 'Nível', value: '1', color: 'text-blue-400' },
  ]

  return (
    <div className="min-h-screen bg-mc-dark">
      <Header />
      <div className="pt-28 pb-16 px-6 max-w-4xl mx-auto">
        <motion.button
          onClick={() => navigate('/')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 bg-transparent border-none cursor-pointer text-sm"
        >
          <ArrowLeft size={18} />
          Voltar
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#1e1e1e] rounded-2xl border border-mc-border p-8"
        >
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-mc-border">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-24 h-24 rounded-full"
              onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${user.username}&background=5865F2&color=fff&size=192` }}
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-white">{user.globalName}</h1>
              <p className="text-gray-400">@{user.username}</p>
              <p className="text-gray-500 text-xs mt-1">ID: {user.id}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#252525] rounded-xl border border-mc-border p-5 text-center"
              >
                <stat.icon className={`mx-auto mb-2 ${stat.color}`} size={28} />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => navigate('/comandos')}
              className="flex-1 py-3 px-6 rounded-lg bg-mc-green/20 text-mc-green border border-mc-green/30 hover:bg-mc-green/30 transition-all cursor-pointer font-semibold text-sm"
            >
              Ver Comandos
            </button>
            <button
              onClick={() => navigate('/premium')}
              className="flex-1 py-3 px-6 rounded-lg bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30 transition-all cursor-pointer font-semibold text-sm"
            >
              Loja Premium
            </button>
            <button
              onClick={() => { logout(); navigate('/') }}
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all cursor-pointer font-semibold text-sm"
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
