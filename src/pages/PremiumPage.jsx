import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Coins, Star, Zap, ArrowLeft, Check, ShoppingCart, Loader2, CheckCircle2, X, Copy } from 'lucide-react'
import { useDiscordAuth } from '../hooks/useDiscordAuth'

const API_BASE = ''

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    coins: 500,
    price: 'R$ 5',
    priceNum: 5,
    pricePerCoin: 'R$ 0,010',
    icon: Coins,
    color: 'from-gray-500/20 to-gray-600/5',
    border: 'border-gray-500/20 hover:border-gray-400/40',
    iconBg: 'bg-gray-500/20',
    benefits: [
      '500 Minecoins',
      'Compra instantânea',
      'Suporte básico',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    coins: 1500,
    price: 'R$ 12',
    priceNum: 12,
    pricePerCoin: 'R$ 0,008',
    icon: Star,
    color: 'from-mc-green/20 to-mc-green/5',
    border: 'border-mc-green/30 hover:border-mc-green/50',
    iconBg: 'bg-mc-green/20',
    popular: true,
    benefits: [
      '1.500 Minecoins',
      'Compra instantânea',
      'Suporte prioritário',
      'Bônus de 10%',
    ],
  },
  {
    id: 'mega',
    name: 'Mega',
    coins: 5000,
    price: 'R$ 35',
    priceNum: 35,
    pricePerCoin: 'R$ 0,007',
    icon: Zap,
    color: 'from-yellow-500/20 to-yellow-600/5',
    border: 'border-yellow-500/20 hover:border-yellow-400/40',
    iconBg: 'bg-yellow-500/20',
    benefits: [
      '5.000 Minecoins',
      'Compra instantânea',
      'Suporte VIP',
      'Bônus de 15%',
      'Itens exclusivos',
    ],
  },
]

const PIX_KEY = 'seu-pix-aqui'

const faq = [
  {
    q: 'Como recebo os Minecoins?',
    a: 'Após a confirmação do pagamento, os Minecoins são adicionados automaticamente na sua conta do ExploraCraft.',
  },
  {
    q: 'Os Minecoins têm validade?',
    a: 'Não! Seus Minecoins ficam na sua conta para sempre.',
  },
  {
    q: 'Posso pedir reembolso?',
    a: 'Sim, em até 7 dias após a compra entre em contato com nosso suporte.',
  },
  {
    q: 'Quais formas de pagamento são aceitas?',
    a: 'Aceitamos PIX.',
  },
]

export default function PremiumPage() {
  const { user, login } = useDiscordAuth()
  const [openFaq, setOpenFaq] = useState(null)
  const [selectedPkg, setSelectedPkg] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleBuy = (pkg) => {
    if (!user) {
      login()
      return
    }
    setSelectedPkg(pkg)
    setShowModal(true)
  }

  const handleConfirmPayment = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_BASE}/api/add-coins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'exploracraft-api-key-2026',
        },
        body: JSON.stringify({
          user_id: user.id,
          quantidade: selectedPkg.coins,
          motivo: `compra_${selectedPkg.id}`,
        }),
      })

      const text = await res.text()
      let data
      try {
        data = JSON.parse(text)
      } catch {
        throw new Error('API não disponível. Faça deploy na Vercel para usar.')
      }

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao processar compra')
      }

      setShowModal(false)
      setSuccess(true)
      setSelectedPkg(null)
      setTimeout(() => setSuccess(false), 4000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const copyPix = () => {
    navigator.clipboard.writeText(PIX_KEY)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-mc-bg py-20 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link
            to="/"
            className="flex items-center gap-2 text-mc-green no-underline font-semibold hover:text-mc-green-light transition-colors"
          >
            <ArrowLeft size={18} />
            Voltar
          </Link>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="https://minecraft.wiki/images/Marketplace_Minecoins.png?e3529" alt="Minecoins" className="w-10 h-10" />
            <h1
              className="text-5xl max-md:text-3xl text-white font-bold tracking-wider"
              style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5), 4px 4px 0px rgba(0,0,0,0.3)' }}
            >
              Minecoins
            </h1>
          </div>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-lg px-2">
            Compre Minecoins e use no jogo para comprar itens, ferramentas e recursos exclusivos!
          </p>
        </motion.div>

        {/* Auth Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-md mx-auto mb-8 md:mb-12"
        >
          <div className="bg-mc-bg-card rounded-xl p-6 border border-white/10">
            {user ? (
              <div className="flex items-center gap-3 bg-white/5 border border-mc-green/30 rounded-lg px-4 py-3">
                <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-white font-bold text-sm">{user.globalName}</p>
                  <p className="text-gray-400 text-xs">ID: {user.id}</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-3">Faça login com Discord para comprar Minecoins</p>
                <button
                  onClick={login}
                  className="w-full py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold transition-all duration-300 cursor-pointer border-none flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
                  </svg>
                  Entrar com Discord
                </button>
              </div>
            )}
            {success && (
              <p className="text-green-400 text-sm mt-2 flex items-center gap-2">
                <CheckCircle2 size={16} />
                Minecoins adicionados com sucesso!
              </p>
            )}
          </div>
        </motion.div>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative bg-gradient-to-br ${pkg.color} rounded-2xl p-6 md:p-8 border ${pkg.border} transition-all duration-300`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-mc-green text-black text-xs font-bold px-4 py-1 rounded-full">
                  MAIS POPULAR
                </div>
              )}

              <div className={`w-12 h-12 md:w-14 md:h-14 mb-4 md:mb-5 rounded-xl ${pkg.iconBg} flex items-center justify-center`}>
                <pkg.icon size={24} className="text-yellow-400" />
              </div>

              <h3 className="text-xl text-white font-bold mb-1">{pkg.name}</h3>

              <div className="text-3xl font-black text-white mb-1">
                {pkg.coins.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 mb-2">Minecoins</div>
              <div className="text-xs text-gray-500 mb-6">{pkg.pricePerCoin} por coin</div>

              <div className="text-2xl font-bold text-mc-green mb-6">{pkg.price}</div>

              <ul className="flex flex-col gap-3 mb-8">
                {pkg.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check size={16} className="text-mc-green flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleBuy(pkg)}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all duration-300 cursor-pointer border-none flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                {user ? 'Comprar' : 'Entrar para comprar'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl max-md:text-2xl text-white font-bold text-center mb-10">
            Perguntas Frequentes
          </h2>

          <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            {faq.map((item, index) => (
              <div
                key={index}
                className="bg-mc-bg-card rounded-xl border border-white/5 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left bg-transparent border-none cursor-pointer"
                >
                  <span className="text-white font-semibold">{item.q}</span>
                  <span className="text-gray-400 text-2xl">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-white text-sm leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showModal && selectedPkg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-5"
            style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
            onClick={() => { setShowModal(false); setError('') }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="w-full max-w-md rounded-2xl overflow-hidden relative bg-[#1a1a1a] border border-white/10"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl text-white font-bold">Confirmar Pagamento</h3>
                <button
                  onClick={() => { setShowModal(false); setError('') }}
                  className="p-2 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Order Summary */}
                <div className="bg-white/5 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Pacote</span>
                    <span className="text-white font-bold">{selectedPkg.name}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Minecoins</span>
                    <span className="text-yellow-400 font-bold">{selectedPkg.coins.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Valor</span>
                    <span className="text-mc-green font-bold">{selectedPkg.price}</span>
                  </div>
                </div>

                {/* User ID */}
                <div className="bg-white/5 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Conta</span>
                    <span className="text-white font-bold text-sm">{user?.globalName}</span>
                  </div>
                </div>

                {/* PIX */}
                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-3">Copie a chave PIX e faça o pagamento:</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/5 rounded-lg px-4 py-3 text-white font-mono text-sm truncate">
                      {PIX_KEY}
                    </div>
                    <button
                      onClick={copyPix}
                      className="p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                    >
                      {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-red-400 text-sm mb-4">{error}</p>
                )}

                {/* Confirm Button */}
                <button
                  onClick={handleConfirmPayment}
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 cursor-pointer border-none flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(180deg, #7cb342 0%, #558b2f 100%)',
                    color: 'white',
                    textShadow: '1px 1px 0px rgba(0,0,0,0.3)',
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Confirmando...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={20} />
                      Confirmar Pagamento
                    </>
                  )}
                </button>

                <p className="text-gray-500 text-xs text-center mt-4">
                  Após confirmar, os Minecoins serão adicionados na sua conta automaticamente.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
