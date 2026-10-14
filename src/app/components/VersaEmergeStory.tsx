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
import imgForest from '../../imports/Home/c9d25a6bcc8d0db405bb265444afc8874b72f490.png';
import imgIconLogo from '../../imports/versaemerge-icon-logo.png';

const storyAsset = (name: string) => withBase(`/assets/versaemerge-story/${name}`);

const navLinks = [
  { label: 'Home', href: withBase('/') },
  { label: 'Story', href: withBase('/story') },
  { label: 'Band', href: withBase('/band') },
  { label: 'Tours', href: withBase('/tours') },
  { label: 'Merch', href: withBase('/merch') },
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

const storyChapters = [
  {
    title: 'The Rolling Stones Connection',
    paragraphs: [
      'It was during a late-night studio session when our journey took an unexpected turn. Rain pounded against the windows as we huddled around a vintage record player, seeking inspiration in the classics. When the needle dropped on The Rolling Stones’ "Paint It Black," something shifted in the room.',
      'The haunting melody, the darkness of Jagger’s lyrics, and the raw emotional power resonated with each of us in deeply personal ways. We fell into a discussion about how the song had influenced us individually throughout our lives—some discovering it during formative teenage years, others through parents’ record collections, each finding different meanings in its shadowy corridors.',
      '"What if we reimagined it?" someone suggested. Not as a cover, but as a completely new artistic interpretation—one that honored the original while transforming it through our own unique lens.',
      'For weeks, we deconstructed the essence of what made "Paint It Black" so powerful. We weren’t interested in simply recreating what The Stones had perfected. Instead, we sought to capture the emotional core—the exploration of darkness, the confrontation with shadow—and build something new that carried that same transformative energy.',
    ],
  },
  {
    title: 'Paint It Black',
    paragraphs: [
      'What emerged was our signature work, "Paint It Black"—an immersive journey through the landscapes of shadow and rebirth that pays homage to the original while forging its own path. Each piece explores the transformative power of confronting our darkest moments, embracing them, and emerging reborn.',
    ],
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
};

export default function VersaEmergeStory() {
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
                aria-current={link.label === 'Story' ? 'page' : undefined}
                className={`group relative font-['Roboto_Mono'] text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                  link.label === 'Story' ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#ff1744] to-[#f50057] transition-all duration-300 ${
                    link.label === 'Story' ? 'w-full' : 'w-0 group-hover:w-full'
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
            aria-controls="story-mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <motion.div
            id="story-mobile-navigation"
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
                    link.label === 'Story' ? 'text-[#ff1744]' : 'text-white/75'
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
        {/* Hero: Paint It Black */}
        <section className="relative flex min-h-[760px] items-center justify-center overflow-hidden px-6 pb-20 pt-36 sm:pt-40">
          <motion.div
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img src={imgForest} alt="" decoding="async" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#0a0e1a]/65 to-[#0a0e1a]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,23,68,0.18),transparent_55%)]" />
          </motion.div>

          <motion.div initial="initial" animate="animate" className="relative z-10 mx-auto w-full max-w-5xl text-center">
            <motion.p
              variants={fadeInUp}
              className="mb-5 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]"
            >
              The Story
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="mb-7 font-['Cinzel_Decorative'] text-5xl leading-tight sm:text-6xl lg:text-7xl"
            >
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                PAINT IT BLACK
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mb-12 max-w-3xl font-['Roboto_Mono'] text-base leading-relaxed text-white/65 sm:text-lg"
            >
              A journey through darkness into transformation.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mx-auto grid max-w-4xl items-center gap-8 text-left lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12"
            >
              <div className="relative w-full rounded-2xl border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-[#ff1744]/20 backdrop-blur-2xl">
                <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-[#ff1744]/30 via-transparent to-[#f50057]/30 opacity-70" />
                <div className="pointer-events-none absolute -left-10 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-[#ff1744]/20 blur-3xl" />
                <iframe
                  title="Paint It Black on Spotify"
                  src="https://open.spotify.com/embed/track/6d5UYaZQekK96pB3PDn6Za?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder={0}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="relative h-[152px] w-full rounded-xl ring-1 ring-white/10"
                  style={{ borderRadius: 12 }}
                />
              </div>

              <figure className="relative border-l-2 border-[#ff1744]/70 pl-6">
                <blockquote className="font-['Cormorant_Garamond:Bold'] text-2xl leading-snug text-white/90 sm:text-3xl">
                  “I see a red door and I want it painted black.
                  <br />
                  No colors anymore, I want them to turn black.”
                </blockquote>
                <figcaption className="mt-4 font-['Roboto_Mono'] text-xs uppercase tracking-[0.25em] text-white/45">
                  The Rolling Stones, 1966
                </figcaption>
              </figure>
            </motion.div>
          </motion.div>
        </section>

        {/* Listen now */}
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

        {/* The Story */}
        <section className="deferred-section relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0">
            <img
              src={storyAsset('abandoned-house.webp')}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-25 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#151a2e]/90 to-[#0a0e1a]" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(245,0,87,0.1),transparent_55%)]" />

          <div className="relative mx-auto grid max-w-[1400px] items-start gap-12 px-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20 lg:px-12">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.p
                variants={fadeInUp}
                className="mb-4 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]"
              >
                VersaEmerge
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="mb-10 font-['Cinzel_Decorative'] text-4xl leading-tight sm:text-5xl lg:text-6xl"
              >
                <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                  THE STORY
                </span>
              </motion.h2>

              <div className="space-y-12">
                {storyChapters.map((chapter) => (
                  <motion.article key={chapter.title} variants={fadeInUp}>
                    <h3 className="mb-5 font-['Cinzel_Decorative'] text-2xl sm:text-3xl">
                      <span className="bg-gradient-to-r from-[#ff1744] to-[#f50057] bg-clip-text text-transparent">
                        {chapter.title}
                      </span>
                    </h3>
                    <div className="space-y-5 font-['Roboto_Mono'] text-sm leading-relaxed text-white/65 sm:text-base">
                      {chapter.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto w-full max-w-[560px] lg:sticky lg:top-32"
            >
              <div className="pointer-events-none absolute -inset-6 rounded-full bg-[#ff1744]/10 blur-3xl" />
              <div className="relative overflow-hidden border border-white/10 bg-black shadow-2xl shadow-black/60">
                <img
                  src={storyAsset('woman-in-white.webp')}
                  alt="A figure in a white dress standing alone in the dark"
                  loading="lazy"
                  decoding="async"
                  width={1000}
                  height={1174}
                  className="block h-auto w-full"
                />
                <img
                  src={storyAsset('paint-drip.webp')}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={453}
                  className="absolute inset-x-0 top-0 h-auto w-full mix-blend-multiply"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0e1a]/80 to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="deferred-section relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0">
            <img
              src={imgForest}
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
              Stay tuned for exclusive updates, tour dates, and the haunting evolution of VersaEmerge.
            </p>

            <form
              className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="sr-only" htmlFor="story-email">
                Email address
              </label>
              <input
                id="story-email"
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
