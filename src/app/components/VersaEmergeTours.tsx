import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { withBase } from '../basePath';
import {
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  Music2,
  Twitter,
  X,
  Youtube,
} from 'lucide-react';
import imgHallway from '../../imports/Home/b26a8d96a0d70b33ccc43691d2fce58b102ca1ec.png';
import imgGothEyes from '../../imports/Home/35059a8c9ab5633b770ca028306257117896b6e9.png';
import imgIconLogo from '../../imports/versaemerge-icon-logo.png';

const shows = [
  {
    city: 'MIAMI',
    date: 'March 20, 2025',
    venue: 'James L. Knight Center',
    description:
      'VersaEmerge ignites Miami with a night of dark, transformative energy, blending gothic melodies with punk fervor. Expect a cinematic experience as Sierra Kusterbeck’s vocals lead the crowd through a shadowy journey.',
  },
  {
    city: 'TAMPA',
    date: 'March 22, 2025',
    venue: 'Julian B. Lane Riverfront Park',
    description:
      'Tampa hosts VersaEmerge’s haunting performance under the stars, where Blake Harnage’s innovative riffs merge with Devin Ingelido’s rhythmic pulse, creating an unforgettable descent into darkness.',
  },
  {
    city: 'NAPLES',
    date: 'March 24, 2025',
    venue: 'Artis—Naples',
    description:
      'Naples welcomes VersaEmerge for an intimate yet intense show, where the band’s gothic reinvention of "Paint it Black" resonates, drawing fans into a transformative sonic abyss.',
  },
  {
    city: 'NY',
    date: 'July 27, 2025',
    venue: 'Terminal 5',
    description:
      'VersaEmerge descends upon New York City, transforming Terminal 5 into a gothic abyss. Sierra Kusterbeck’s haunting vocals will guide fans through the shadows of "Paint it Black," offering an electrifying night.',
  },
  {
    city: 'LA',
    date: 'August 30, 2025',
    venue: 'The Echo',
    description:
      'LA’s The Echo hosts VersaEmerge for an intimate, shadowy performance. Blake Harnage’s riffs and Devin Ingelido’s rhythms will envelop the crowd in a transformative soundscape, echoing the dark narrative of their latest release.',
  },
  {
    city: 'LONDON',
    date: 'April 3, 2025',
    venue: 'O2 Academy Islington',
    description:
      'VersaEmerge crosses the Atlantic to London, bringing their gothic reinvention to O2 Academy Islington. This show promises a cinematic journey through darkness, with the band’s raw energy igniting the stage.',
  },
];

const navLinks = [
  { label: 'Home', href: withBase('/') },
  { label: 'Story', href: withBase('/story') },
  { label: 'Band', href: withBase('/band') },
  { label: 'Tours', href: withBase('/tours') },
  { label: 'Merch', href: withBase('/#merch') },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook },
  { name: 'Instagram', icon: Instagram },
  { name: 'YouTube', icon: Youtube },
  { name: 'Twitter', icon: Twitter },
  { name: 'LinkedIn', icon: Linkedin },
];

const listeningServices = [
  { name: 'Apple Music', asset: 'dd877.svg' },
  { name: 'YouTube', asset: '800a4.svg' },
  { name: 'Spotify', asset: 'f6ede.svg' },
  { name: 'Tidal', asset: '64915.svg' },
  { name: 'Amazon Music', asset: 'a359d.svg' },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
};

export default function VersaEmergeTours() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0a0e1a] text-white">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/10 bg-[#0a0e1a]/90 shadow-[0_12px_40px_rgba(255,23,68,0.1)] backdrop-blur-2xl'
            : 'border-b border-white/5 bg-[#0a0e1a]/80 backdrop-blur-xl'
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 min-[360px]:px-6 sm:px-8 lg:px-12 transition-all duration-500 ${
            scrolled ? 'py-2 lg:py-3' : 'py-4 lg:py-6'
          }`}
        >
          <motion.a href={withBase('/')} whileHover={{ scale: 1.02 }} className="relative min-w-0 lg:py-1">
            <img
              src={imgIconLogo}
              alt="VersaEmerge"
              decoding="async"
              className={`brand-icon-logo w-auto object-contain transition-all duration-500 lg:hidden ${
                scrolled ? 'h-9' : 'h-12'
              }`}
            />
            <span
              className={`hidden whitespace-nowrap font-['Cinzel_Decorative'] leading-relaxed tracking-wider transition-all duration-500 lg:block ${
                scrolled ? 'text-xl xl:text-2xl' : 'text-2xl xl:text-3xl'
              }`}
            >
              <span className="animate-[shimmer_3s_linear_infinite] bg-gradient-to-r from-[#ff1744] via-[#f50057] to-[#ff1744] bg-[length:200%_auto] bg-clip-text text-transparent">
                VERSAEMERGE
              </span>
            </span>
            <span className="absolute inset-x-0 bottom-0 hidden h-[2px] bg-gradient-to-r from-transparent via-[#ff1744] to-transparent opacity-60 lg:block" />
          </motion.a>

          <div className="hidden items-center gap-4 lg:flex xl:gap-12">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ y: -2 }}
                aria-current={link.label === 'Tours' ? 'page' : undefined}
                className={`group relative font-['Roboto_Mono'] text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                  link.label === 'Tours' ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#ff1744] to-[#f50057] transition-all duration-300 ${
                    link.label === 'Tours' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </motion.a>
            ))}

            <div className="ml-2 flex items-center gap-3">
              {socialLinks.map(({ name, icon: Icon }) => (
                <motion.a
                  key={name}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="flex h-8 w-8 items-center justify-center text-white/40 transition-colors hover:text-white"
                  aria-label={name}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>

            <motion.a
              href="mailto:booking@versaemerge.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative overflow-hidden font-['Roboto_Mono'] text-xs uppercase tracking-[0.15em] transition-all duration-500 ${
                scrolled ? 'px-6 py-2.5' : 'px-8 py-3'
              }`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#ff1744] to-[#f50057]" />
              <span className="relative z-10 font-semibold text-white">Contact</span>
            </motion.a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 bg-[#0a0e1a]/60 backdrop-blur-xl lg:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="tours-mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            id="tours-mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mb-4 border border-white/10 bg-[#0a0e1a]/95 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col p-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`border-b border-white/5 px-4 py-4 font-['Roboto_Mono'] text-sm uppercase tracking-[0.18em] transition-colors last:border-b-0 ${
                    link.label === 'Tours' ? 'text-[#ff1744]' : 'text-white/75'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
        <motion.div
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0, scaleX: scrolled ? 1 : 0.35 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-x-0 bottom-0 h-px origin-center bg-gradient-to-r from-transparent via-[#ff1744]/70 to-transparent"
        />
      </motion.nav>

      <main>
        <section className="relative flex min-h-[620px] items-center justify-center overflow-hidden px-6 pb-20 pt-36 sm:pt-40">
          <motion.div
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img
              src={imgHallway}
              alt=""
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-[#0a0e1a]/60 to-[#0a0e1a]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,23,68,0.16),transparent_55%)]" />
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            className="relative z-10 mx-auto max-w-5xl text-center"
          >
            <motion.p
              variants={fadeInUp}
              className="mb-5 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]"
            >
              Live Performances
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="mb-7 font-['Cinzel_Decorative'] text-5xl leading-tight sm:text-6xl lg:text-7xl"
            >
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                UPCOMING TOURS
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mx-auto max-w-3xl font-['Roboto_Mono'] text-base leading-relaxed text-white/65 sm:text-lg"
            >
              Step into the abyss with VersaEmerge as they bring their haunting rendition of
              &quot;Paint it Black&quot; to life on stage. A journey through shadows, where gothic
              melodies and raw punk energy collide.
            </motion.p>
          </motion.div>
        </section>

        <section className="deferred-section relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0">
            <img
              src={imgGothEyes}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#151a2e]/95 to-[#0a0e1a]" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,0,87,0.08),transparent_55%)]" />

          <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))] gap-6">
              {shows.map((show, index) => (
                <motion.article
                  key={`${show.city}-${show.date}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.65, delay: (index % 3) * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="group relative flex min-h-[520px] flex-col overflow-hidden border border-white/10 bg-white/[0.035] p-7 shadow-2xl backdrop-blur-xl transition-colors duration-300 hover:border-white/20 sm:p-9"
                >
                  <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#ff1744] to-[#f50057] transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#ff1744]/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <h2 className="relative mb-8 font-['Cinzel_Decorative'] text-4xl sm:text-5xl">
                    <span className="bg-gradient-to-r from-[#ff1744] to-[#f50057] bg-clip-text text-transparent">
                      {show.city}
                    </span>
                  </h2>

                  <dl className="relative mb-6 space-y-4 font-['Roboto_Mono'] text-sm">
                    <div>
                      <dt className="mb-1 text-[10px] uppercase tracking-[0.25em] text-[#ff1744]">Date</dt>
                      <dd className="text-white/90">{show.date}</dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-[10px] uppercase tracking-[0.25em] text-[#ff1744]">Venue</dt>
                      <dd className="text-white/90">{show.venue}</dd>
                    </div>
                  </dl>

                  <p className="relative mb-8 font-['Roboto_Mono'] text-sm leading-relaxed text-white/55">
                    {show.description}
                  </p>

                  <motion.a
                    href="#tickets"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative mt-auto self-start bg-gradient-to-r from-[#ff1744] to-[#f50057] px-7 py-3 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg shadow-[#ff1744]/20"
                    aria-label={`Get tickets for ${show.city}`}
                  >
                    Get Tickets
                  </motion.a>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="deferred-section relative overflow-hidden border-y border-white/5 py-16">
          <div className="absolute inset-0 bg-[#0a0e1a]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,23,68,0.12),transparent_60%)]" />
          <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 sm:flex-row sm:justify-center sm:gap-12">
            <div className="flex items-center gap-3">
              <Music2 className="h-5 w-5 text-[#ff1744]" />
              <span className="font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                Listen Now
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {listeningServices.map((service) => (
                <motion.a
                  key={service.name}
                  href="#"
                  whileHover={{ y: -4, scale: 1.08 }}
                  className="flex h-12 w-12 items-center justify-center opacity-65 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  aria-label={service.name}
                >
                  <img
                    src={withBase(`/assets/versaemerge-tours/${service.asset}`)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-8 w-8 object-contain"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section className="deferred-section relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0">
            <img
              src={imgHallway}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/95 to-[#1a0a1f]/95" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,23,68,0.1),transparent_70%)]" />

          <div className="relative mx-auto max-w-[900px] px-6 text-center sm:px-8 lg:px-12">
            <p className="mb-4 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]">
              Stay Connected
            </p>
            <h2 className="mb-6 font-['Cinzel_Decorative'] text-4xl leading-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                JOIN THE SHADOWS
              </span>
            </h2>
            <p className="mx-auto mb-10 max-w-2xl font-['Roboto_Mono'] text-base leading-relaxed text-white/60 sm:text-lg">
              Exclusive updates, tour dates, and the haunting evolution of VersaEmerge delivered to
              your inbox.
            </p>

            <form
              className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="sr-only" htmlFor="tours-email">
                Email address
              </label>
              <input
                id="tours-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                className="min-w-0 flex-1 border border-white/10 bg-white/5 px-6 py-5 font-['Roboto_Mono'] text-sm text-white outline-none backdrop-blur-xl transition-all placeholder:text-white/30 focus:border-[#ff1744] focus:bg-white/10"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="bg-gradient-to-r from-[#ff1744] to-[#f50057] px-9 py-5 font-['Roboto_Mono'] text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-lg shadow-[#ff1744]/30"
              >
                Subscribe
              </motion.button>
            </form>

            <div className="mt-12 flex flex-wrap justify-center gap-3 sm:gap-6">
              {socialLinks.map(({ name, icon: Icon }) => (
                <motion.a
                  key={name}
                  href="#"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="group flex h-12 w-12 items-center justify-center transition-all sm:h-14 sm:w-14"
                  aria-label={name}
                >
                  <Icon className="h-5 w-5 text-white/50 transition-colors group-hover:text-[#ff1744]" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="deferred-section relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[#0a0e1a]" />
        <div className="relative mx-auto max-w-[1400px] px-6 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="mb-12 grid gap-12 md:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center gap-4 sm:gap-5">
                <img
                  src={imgIconLogo}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="brand-icon-logo h-20 w-auto shrink-0 object-contain sm:h-24"
                />
                <h2 className="font-['Cinzel_Decorative'] text-xl tracking-wide sm:text-2xl">
                  <span className="bg-gradient-to-r from-[#ff1744] via-[#f50057] to-[#ff1744] bg-clip-text text-transparent">
                    VERSAEMERGE
                  </span>
                </h2>
              </div>
              <p className="max-w-md font-['Roboto_Mono'] text-sm leading-relaxed text-white/50">
                Transcending boundaries through sound, vision, and artistic rebellion since 2007.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="mb-4 font-['Roboto_Mono'] text-xs uppercase tracking-[0.2em] text-white/40">
                  Explore
                </h3>
                <div className="space-y-3 font-['Roboto_Mono'] text-sm">
                  {['Music', 'Videos', 'Photos', 'News'].map((item) => (
                    <a key={item} href="#" className="block text-white/60 transition-colors hover:text-white">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-4 font-['Roboto_Mono'] text-xs uppercase tracking-[0.2em] text-white/40">
                  Connect
                </h3>
                <div className="space-y-3 font-['Roboto_Mono'] text-sm">
                  {navLinks.slice(1).map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-center md:flex-row md:text-left">
            <p className="font-['Roboto_Mono'] text-xs text-white/40">
              © 2025 VERSAEMERGE. All rights reserved.
            </p>
            <div className="flex gap-6 font-['Roboto_Mono'] text-xs text-white/40">
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .brand-icon-logo {
          filter:
            brightness(1.2)
            saturate(1.18)
            drop-shadow(0 0 1px rgba(255, 255, 255, 0.75))
            drop-shadow(0 0 10px rgba(255, 23, 68, 0.5));
        }
      `}</style>
    </div>
  );
}
