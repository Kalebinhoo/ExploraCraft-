import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Coins, Star, Zap, Shield, ArrowRight } from 'lucide-react'

const packages = [
  {
    name: 'Starter',
    coins: 500,
    price: 'R$ 5',
    icon: Coins,
    color: 'from-gray-500/20 to-gray-600/5',
    border: 'border-gray-500/20 hover:border-gray-400/40',
    popular: false,
  },
  {
    name: 'Pro',
    coins: 1500,
    price: 'R$ 12',
    icon: Star,
    color: 'from-mc-green/20 to-mc-green/5',
    border: 'border-mc-green/30 hover:border-mc-green/50',
    popular: true,
  },
  {
    name: 'Mega',
    coins: 5000,
    price: 'R$ 35',
    icon: Zap,
    color: 'from-yellow-500/20 to-yellow-600/5',
    border: 'border-yellow-500/20 hover:border-yellow-400/40',
    popular: false,
  },
]

export default function PremiumSection() {
  return (
    <section className="py-24 relative z-10 bg-[#0d0d0d]/80 mt-16 mb-16" id="premium">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Coins size={32} className="text-yellow-400" />
            <h2
              className="text-4xl max-md:text-2xl text-white font-bold tracking-wider"
              style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5), 4px 4px 0px rgba(0,0,0,0.3)' }}
            >
              Minecoins
            </h2>
          </div>
          <p className="text-gray-400 max-w-xl mx-auto">
            Compre Minecoins e use no jogo para comprar itens, ferramentas e recursos exclusivos!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-gradient-to-br ${pkg.color} rounded-2xl p-8 border ${pkg.border} transition-all duration-300 text-center`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-mc-green text-black text-xs font-bold px-4 py-1 rounded-full">
                  MAIS POPULAR
                </div>
              )}

              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center">
                <pkg.icon size={32} className="text-yellow-400" />
              </div>

              <h3 className="text-xl text-white font-bold mb-2">{pkg.name}</h3>

              <div className="text-4xl font-black text-white mb-1">
                {pkg.coins.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 mb-6">Minecoins</div>

              <div className="text-2xl font-bold text-mc-green mb-6">{pkg.price}</div>

              <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all duration-300 cursor-pointer border-none">
                Comprar
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/premium"
            className="inline-flex items-center gap-2 text-mc-green font-semibold hover:text-mc-green-light transition-colors no-underline"
          >
            Ver todos os pacotes e benefícios
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
