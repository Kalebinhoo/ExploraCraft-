import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDiscord, FaTimes } from 'react-icons/fa'

const DISCORD_USER_ID = '1373658983704825989'

function decodeFlags(flags) {
  const badges = []
  if (flags & (1 << 0)) badges.push({ name: 'Staff', url: 'https://cdn.discordapp.com/badge-icons/5e7e61c0835ff8f3f57185ba68718f35.png' })
  if (flags & (1 << 1)) badges.push({ name: 'Partner', url: 'https://cdn.discordapp.com/badge-icons/3f9748e91199942b2d82f5050234d50a.png' })
  if (flags & (1 << 2)) badges.push({ name: 'HypeSquad Events', url: 'https://cdn.discordapp.com/badge-icons/3909861c95e6b48c038ba8f25f1c09c4.png' })
  if (flags & (1 << 3)) badges.push({ name: 'Bug Hunter Lvl 1', url: 'https://cdn.discordapp.com/badge-icons/2717692c7dca9053f9046d5aba6af423.png' })
  if (flags & (1 << 6)) badges.push({ name: 'HypeSquad Bravery', url: 'https://cdn.discordapp.com/badge-icons/996b3b86c362b1651c988a0ff09fea82.png' })
  if (flags & (1 << 7)) badges.push({ name: 'HypeSquad Brilliance', url: 'https://cdn.discordapp.com/badge-icons/8a34d15865f32b0f34810dd9ed271454.png' })
  if (flags & (1 << 8)) badges.push({ name: 'HypeSquad Balance', url: 'https://cdn.discordapp.com/badge-icons/9993330a3d14f4ab38d3e616c957d4aa.png' })
  if (flags & (1 << 9)) badges.push({ name: 'Early Supporter', url: 'https://cdn.discordapp.com/badge-icons/77635ce73d4d82e8bb898b22e39137e2.png' })
  if (flags & (1 << 14)) badges.push({ name: 'Bug Hunter Lvl 2', url: 'https://cdn.discordapp.com/badge-icons/844c0f256574b8f4e8f56e8353bf433e.png' })
  if (flags & (1 << 16)) badges.push({ name: 'Verified Bot', url: 'https://cdn.discordapp.com/badge-icons/0c74b0c5bbefff99f2e178f4a8ad47a5.png' })
  if (flags & (1 << 17)) badges.push({ name: 'Verified Developer', url: 'https://cdn.discordapp.com/badge-icons/6bdc427f007801727778262787574d96.png' })
  if (flags & (1 << 18)) badges.push({ name: 'Certified Mod', url: 'https://cdn.discordapp.com/badge-icons/511f2e968ee6ddc7114fb1e8f43d53f0.png' })
  if (flags & (1 << 19)) badges.push({ name: 'Bot HTTP Interactions', url: 'https://cdn.discordapp.com/badge-icons/6bdc427f007801727778262787574d96.png' })
  if (flags & (1 << 22)) badges.push({ name: 'Nitro', url: 'https://cdn.discordapp.com/badge-icons/0f54db49d2a5eb4693de638e3b0d7c8a.png' })
  if (flags & (1 << 23)) badges.push({ name: 'Nitro', url: 'https://cdn.discordapp.com/badge-icons/0f54db49d2a5eb4693de638e3b0d7c8a.png' })
  if (flags & (1 << 24)) badges.push({ name: 'Nitro', url: 'https://cdn.discordapp.com/badge-icons/0f54db49d2a5eb4693de638e3b0d7c8a.png' })
  if (flags & (1 << 25)) badges.push({ name: 'Nitro', url: 'https://cdn.discordapp.com/badge-icons/0f54db49d2a5eb4693de638e3b0d7c8a.png' })
  if (flags & (1 << 26)) badges.push({ name: 'Nitro', url: 'https://cdn.discordapp.com/badge-icons/0f54db49d2a5eb4693de638e3b0d7c8a.png' })
  if (flags & (1 << 27)) badges.push({ name: 'Nitro', url: 'https://cdn.discordapp.com/badge-icons/0f54db49d2a5eb4693de638e3b0d7c8a.png' })
  return badges
}

export default function About() {
  const [showProfile, setShowProfile] = useState(false)
  const [profile, setProfile] = useState(null)
  const [hoveredBadge, setHoveredBadge] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (showProfile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showProfile])

  useEffect(() => {
    fetch(`https://japi.rest/discord/v1/user/${DISCORD_USER_ID}`)
      .then(r => r.json())
      .then(({ data }) => {
        const flagBadges = decodeFlags(data.flags || 0)
        const publicBadges = decodeFlags(data.public_flags || 0)
        const nitroBadge = data.public_flags_array?.includes('NITRO')
          ? [{ name: 'Nitro', url: 'https://cdn.discordapp.com/badge-icons/0f54db49d2a5eb4693de638e3b0d7c8a.png' }]
          : []

        const manualBadges = [
          { name: 'Nitro Prata', url: 'https://cdn.discordapp.com/badge-icons/4514fab914bdbfb4ad2fa23df76121a6.png' },
          { name: 'Booster', url: 'https://cdn.discordapp.com/badge-icons/72bed924410c304dbe3d00a6e593ff59.png' },
          { name: 'Completou Missão', url: 'https://cdn.discordapp.com/badge-icons/7d9ae358c8c5e118768335dbe68b4fb8.png' },
          { name: 'Last Meadow Online', url: 'https://cdn.discordapp.com/badge-icons/ca105ad9cfc8580c765101d17bbb2323.png' },
          { name: 'Orbs', url: 'https://cdn.discordapp.com/badge-icons/83d8a1eb09a8d64e59233eec5d4d5c2d.png' },
          { name: 'Gifting Patron', url: 'https://cdn.discordapp.com/badge-icons/ac305d1b9481f312ce4419e7f8296558.png' },
        ]

        const allBadges = manualBadges

        setProfile({
          username: data.username,
          displayName: data.global_name || data.username,
          avatar: data.avatar
            ? `https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${data.avatar}.png?size=256`
            : data.defaultAvatarURL,
          banner: data.banner
            ? `https://cdn.discordapp.com/banners/${DISCORD_USER_ID}/${data.banner}.png?size=600`
            : null,
          clanTag: data.clan?.tag || null,
          clanBadge: data.clan?.badge || null,
          avatarDecoration: data.avatar_decoration_data?.asset || null,
          nameplate: data.collectibles?.nameplate?.asset || null,
          nameplateLabel: data.collectibles?.nameplate?.label || null,
          badges: allBadges,
        })
      })
      .catch(() => {})
  }, [])

  if (!profile) return (
    <section className="py-24 relative z-10 bg-[#0d0d0d]/80 mt-16 mb-16" id="about">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl max-md:text-2xl text-center mb-16 text-gray-200 font-bold tracking-wider"
          style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5), 4px 4px 0px rgba(0,0,0,0.3)' }}
        >
          Sobre Nós
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex-1">
            <img src="/src/assets/kalebinho_sobre.png" alt="Sobre o ExploraCraft" className="w-full" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex-1">
            <h3 className="text-2xl text-gray-200 font-bold mb-6" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}>Quem criou o ExploraCraft?</h3>
            <p className="text-gray-400 leading-relaxed mb-6">O ExploraCraft é um projeto desenvolvido por <button onClick={() => setShowProfile(true)} className="text-[#5865F2] font-bold cursor-pointer bg-transparent border-none hover:underline">Kalebinho</button> usando Python, desenvolvido com paixão por Minecraft e Discord.</p>
            <p className="text-gray-400 leading-relaxed">Comandos interativos, sistema de progressão, crafting e exploração de biomas, tudo feito para divertir você e seus amigos e deixar teu servidor totalmente ativo utilizando meu bot e passando horas jogando <b>ExploraCraft!</b></p>
          </motion.div>
        </div>
      </div>
    </section>
  )

  return (
    <section className="py-24 relative z-10 bg-[#0d0d0d]/80 mt-16 mb-16" id="about">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl max-md:text-2xl text-center mb-16 text-gray-200 font-bold tracking-wider"
          style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5), 4px 4px 0px rgba(0,0,0,0.3)' }}
        >
          Sobre Nós
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex-1">
            <img src="/src/assets/kalebinho_sobre.png" alt="Sobre o ExploraCraft" className="w-full" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex-1">
            <h3 className="text-2xl text-gray-200 font-bold mb-6" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}>Quem criou o ExploraCraft?</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              O ExploraCraft é um projeto desenvolvido por{' '}
              <button onClick={() => setShowProfile(true)} className="text-[#5865F2] font-bold cursor-pointer bg-transparent border-none hover:underline">Kalebinho</button>{' '}
              usando Python, desenvolvido com paixão por Minecraft e Discord.
              Meu objetivo era trazer a experiência de Minecraft para dentro do Discord, um projeto que nunca foi pensado por ninguém
              permitindo que jogadores explorem, criem e evoluam diretamente no chat.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Comandos interativos, sistema de progressão, crafting e exploração de biomas,
              tudo feito para divertir você e seus amigos e deixar teu servidor totalmente ativo utilizando meu bot e passando horas jogando <b>ExploraCraft!</b>
            </p>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showProfile && profile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-5"
            style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowProfile(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="w-full max-w-md rounded-2xl overflow-hidden relative"
              style={{ background: '#23272a', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowProfile(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-all z-10"
              >
                <FaTimes size={16} />
              </button>

              {/* Banner */}
              <div className="h-28 relative bg-[#5865F2]">
                {profile.banner ? (
                  <img src={profile.banner} alt="Banner" className="w-full h-full object-cover" />
                ) : null}
              </div>

              {/* Avatar + Info */}
              <div className="px-6 pb-6 -mt-12 relative">
                <div className="flex items-end gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={profile.avatar}
                      alt={profile.username}
                      className="w-24 h-24 rounded-full border-4 border-[#23272a] relative z-0"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${profile.username}&background=5865F2&color=fff&size=192`
                      }}
                    />
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#23a55a] rounded-full border-4 border-[#23272a] z-20" />
                  </div>

                  <div className="pb-1 flex-1 min-w-0">
                    <h4 className="text-white font-bold text-xl m-0 truncate">{profile.displayName}</h4>
                    <p className="text-gray-400 text-sm m-0 truncate">{profile.username}</p>
                  </div>


                </div>

                {/* Badges from API */}
                {profile.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {profile.badges.map((badge) => (
                      <div
                        key={badge.name}
                        className="relative"
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect()
                          setHoveredBadge(badge)
                          setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top })
                        }}
                        onMouseLeave={() => setHoveredBadge(null)}
                      >
                        <img
                          src={badge.url}
                          alt={badge.name}
                          className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Minecraft Tooltip */}
                {hoveredBadge && (
                  <div
                    className="fixed z-[9999] pointer-events-none"
                    style={{
                      left: tooltipPos.x,
                      top: tooltipPos.y - 10,
                      transform: 'translate(-50%, -100%)',
                    }}
                  >
                    <div
                      className="relative"
                      style={{
                        background: 'rgba(16, 0, 22, 0.94)',
                        padding: '8px 12px',
                        imageRendering: 'pixelated',
                      }}
                    >
                      {/* Borda externa escura */}
                      <div
                        className="absolute inset-0"
                        style={{
                          border: '2px solid #0a0010',
                          boxShadow: 'inset 0 0 0 1px #1a0028, 0 0 0 1px #0a0010',
                        }}
                      />
                      {/* Borda interna clara */}
                      <div
                        className="absolute"
                        style={{
                          top: '2px',
                          left: '2px',
                          right: '2px',
                          bottom: '2px',
                          border: '1px solid #3d1e5c',
                          pointerEvents: 'none',
                        }}
                      />
                      <div
                        className="relative"
                        style={{
                          fontFamily: "'Press Start 2P', monospace",
                          imageRendering: 'pixelated',
                          minWidth: '140px',
                        }}
                      >
                        <div
                          className="text-[10px] leading-[16px] mb-2"
                          style={{
                            color: '#ffffff',
                            textShadow: '1px 1px 0px #3f1966',
                          }}
                        >
                          {hoveredBadge.name}
                        </div>
                        <div
                          className="text-[8px] leading-[14px]"
                          style={{
                            color: '#555555',
                            textShadow: '1px 1px 0px #2a0040',
                          }}
                        >
                          Conquista desbloqueada
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
