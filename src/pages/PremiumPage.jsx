import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Coins, Star, Zap, Shield, ArrowLeft, Check, ShoppingCart } from 'lucide-react'

const packages = [
  {
    name: 'Starter',
    coins: 500,
    price: 'R$ 5',
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
    name: 'Pro',
    coins: 1500,
    price: 'R$ 12',
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
    name: 'Mega',
    coins: 5000,
    price: 'R$ 35',
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

const faq = [
  {
    q: 'Como recebo os Minecoins?',
    a: 'Após a compra, os Minecoins são adicionados automaticamente na sua conta do ExploraCraft.',
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
    a: 'Aceitamos PIX, cartão de crédito e boleto bancário.',
  },
]

export default function PremiumPage() {
  const [openFaq, setOpenFaq] = useState(null)

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
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Coins size={40} className="text-yellow-400" />
            <h1
              className="text-5xl max-md:text-3xl text-white font-bold tracking-wider"
              style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5), 4px 4px 0px rgba(0,0,0,0.3)' }}
            >
              Minecoins
            </h1>
          </div>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Compre Minecoins e use no jogo para comprar itens, ferramentas e recursos exclusivos!
          </p>
        </motion.div>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-gradient-to-br ${pkg.color} rounded-2xl p-8 border ${pkg.border} transition-all duration-300`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-mc-green text-black text-xs font-bold px-4 py-1 rounded-full">
                  MAIS POPULAR
                </div>
              )}

              <div className={`w-14 h-14 mb-5 rounded-xl ${pkg.iconBg} flex items-center justify-center`}>
                <pkg.icon size={28} className="text-yellow-400" />
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

              <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all duration-300 cursor-pointer border-none flex items-center justify-center gap-2">
                <ShoppingCart size={18} />
                Comprar
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
                  <div className="px-6 pb-4 text-gray-400 text-sm leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
