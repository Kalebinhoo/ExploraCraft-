import { motion } from 'framer-motion'
const steps = [
  {
    step: '01',
    title: 'Adicione o Bot',
    description: 'Adicione o ExploraCraft no seu servidor do Discord com apenas um clique.',
  },
  {
    step: '02',
    title: 'Inicie sua Jornada',
    description: 'Use o comando /iniciar para criar seu personagem e começar a aventura.',
  },
  {
    step: '03',
    title: 'Explore e Colete',
    description: 'Minere recursos, colete materiais e explore diferentes biomas pelo mapa.',
  },
  {
    step: '04',
    title: 'Evolua e Compita',
    description: 'Up de nível, desbloqueie itens raros e suba no ranking dos melhores jogadores.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 relative z-10 bg-[#0d0d0d]/80" id="how-it-works">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl max-md:text-2xl text-center mb-16 text-gray-200 font-bold tracking-wider px-6"
        style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5), 4px 4px 0px rgba(0,0,0,0.3)' }}
      >
        Como Funciona
      </motion.h2>

      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative h-full"
            >
              <div className="bg-mc-bg-card backdrop-blur-sm rounded-2xl p-5 md:p-8 text-center relative overflow-hidden border border-transparent group h-full">
                <div className="relative z-10">
                  <div className="text-3xl md:text-5xl font-black text-white/5 absolute top-3 right-3 md:top-4 md:right-4 select-none">
                    {step.step}
                  </div>

                  <h3
                    className="text-base md:text-lg text-white mb-2 md:mb-3 font-bold"
                    style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}
                  >
                    {step.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed text-xs md:text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
