import { FaDiscord, FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0d0d0d]/80 to-[#0a0a0a] border-t-3 border-mc-green pt-16 pb-8 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-10 mb-10">
          {/* Logo section */}
          <div className="flex flex-col gap-5">
            <a href="/#home" className="flex items-center gap-3 text-gray-300 font-bold text-xl no-underline">
              <img src="/bedrock.png" alt="ExploraCraft" className="w-10 h-10 drop-shadow-lg" />
              <span className="drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">ExploraCraft</span>
            </a>
            <p className="text-mc-text-muted leading-relaxed max-w-xs">
              Mini-game que simula Minecraft dentro do Discord. Explore, colete, craft e jogue!
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaDiscord, href: 'https://discord.gg/exploracraft', label: 'Discord', bg: '#5865F2', shadow: '#3b45b0' },
                { icon: FaGithub, href: 'https://github.com/Kalebinhoo/ExploraCraft-.git', label: 'GitHub', bg: '#333333', shadow: '#1a1a1a' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white no-underline transition-all duration-200 hover:translate-y-0.5 active:translate-y-1"
                  style={{
                    background: social.bg,
                    boxShadow: `0 4px 0 ${social.shadow}, 0 6px 10px rgba(0,0,0,0.4)`,
                    border: '2px solid rgba(255,255,255,0.15)',
                    borderTopColor: 'rgba(255,255,255,0.3)',
                    borderLeftColor: 'rgba(255,255,255,0.2)',
                  }}
                  title={social.label}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="flex flex-col gap-5">
            <h3
              className="text-lg text-gray-300 font-bold m-0"
              style={{ textShadow: '1px 1px 0px #2d5016' }}
            >
              Links Rápidos
            </h3>
            <ul className="list-none flex flex-col gap-3">
              {[
                { label: 'Início', href: '/#home' },
                { label: 'Recursos', href: '/#features' },
                { label: 'Comandos', href: '/comandos' },
                { label: 'Premium', href: '/premium' },
                { label: 'Adicionar Bot', href: 'https://discord.com/oauth2/authorize' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-mc-text-muted no-underline transition-all duration-300 hover:text-gray-300 hover:translate-x-1.5 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Suporte */}
          <div className="flex flex-col gap-5">
            <h3
              className="text-lg text-gray-300 font-bold m-0"
              style={{ textShadow: '1px 1px 0px #2d5016' }}
            >
              Suporte
            </h3>
            <ul className="list-none flex flex-col gap-3">
              {[
                { label: 'Documentação', href: '/docs' },
                { label: 'Servidor de Suporte', href: 'https://discord.gg/exploracraft' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-mc-text-muted no-underline transition-all duration-300 hover:text-gray-300 hover:translate-x-1.5 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-mc-green to-transparent mb-8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-mc-text-dim text-sm leading-relaxed">
            © 2026 ExploraCraft. Todos os direitos reservados.
            <br />
            <span className="text-xs text-gray-600 italic">
              Não é afiliado com Mojang Studios ou Microsoft.
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
