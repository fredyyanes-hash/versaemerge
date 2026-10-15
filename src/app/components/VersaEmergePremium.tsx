import { useState, useEffect, useCallback } from 'react';
import { m } from 'motion/react';
import { withBase } from '../basePath';
import { useEscapeKey } from '../useEscapeKey';
import { Facebook, Instagram, Youtube, Twitter, Linkedin, Menu, X } from 'lucide-react';
import imgRectangle1 from '../../imports/Home/hallway.webp';
import imgRectangle8 from '../../imports/Home/forest.webp';
import imgGothEyes1 from '../../imports/Home/goth-eyes.webp';
import imgSkull1 from '../../imports/Home/skull.webp';
import imgIconLogo from '../../imports/versaemerge-icon-logo.webp';

export default function VersaEmergePremium() {
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  useEscapeKey(mobileMenuOpen, closeMobileMenu);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden">
      {/* GLASSMORPHIC NAVIGATION */}
      <m.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0e1a]/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_12px_40px_rgba(255,23,68,0.1)]'
            : 'bg-transparent'
        }`}
      >
        <div
          className={`max-w-[1400px] mx-auto px-4 min-[360px]:px-6 sm:px-8 lg:px-12 flex items-center justify-between gap-3 transition-all duration-500 ${
            scrolled ? 'py-2 lg:py-3' : 'py-4 lg:py-6'
          }`}
        >
          {/* Premium Logo Treatment */}
          <m.div
            whileHover={{ scale: 1.02 }}
            className="relative min-w-0 lg:py-1"
          >
            <img
              src={imgIconLogo}
              alt="VersaEmerge"
              className={`brand-icon-logo w-auto object-contain transition-all duration-500 lg:hidden ${
                scrolled ? 'h-9' : 'h-12'
              }`}
            />
            <h1
              className={`hidden lg:block font-['Cinzel_Decorative'] leading-relaxed tracking-wider whitespace-nowrap transition-all duration-500 ${
                scrolled ? 'text-xl xl:text-2xl' : 'text-2xl xl:text-3xl'
              }`}
            >
              <span className="bg-gradient-to-r from-[#ff1744] via-[#f50057] to-[#ff1744] bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
                VERSAEMERGE
              </span>
            </h1>
            <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff1744] to-transparent opacity-60" />
          </m.div>

          {/* Elevated Navigation Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-12">
            {['Home', 'Story', 'Band', 'Tours', 'Merch'].map((item, i) => (
              <m.a
                key={item}
                href={item === 'Tours' || item === 'Story' || item === 'Band' || item === 'Merch' ? withBase(`/${item.toLowerCase()}`) : `#${item.toLowerCase()}`}
                whileHover={{ y: -2 }}
                className="relative font-['Roboto_Mono'] text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-all duration-300 group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gradient-to-r from-[#ff1744] to-[#f50057] group-hover:w-full transition-all duration-300" />
              </m.a>
            ))}

            {/* Social Icons in Header */}
            <div className="flex items-center gap-3 ml-2">
              {[
                { name: 'Facebook', icon: Facebook },
                { name: 'Instagram', icon: Instagram },
                { name: 'YouTube', icon: Youtube },
                { name: 'Twitter', icon: Twitter },
                { name: 'LinkedIn', icon: Linkedin }
              ].map(({ name, icon: Icon }) => (
                <m.a
                  key={name}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                  aria-label={name}
                >
                  <Icon className="w-4 h-4" />
                </m.a>
              ))}
            </div>

            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative font-['Roboto_Mono'] text-xs uppercase tracking-[0.15em] overflow-hidden group transition-all duration-500 ${
                scrolled ? 'px-6 py-2.5' : 'px-8 py-3'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff1744] to-[#f50057] opacity-100 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#f50057] to-[#ff1744] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 text-white font-semibold">Contact</span>
            </m.button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="lg:hidden w-11 h-11 shrink-0 flex items-center justify-center border border-white/15 bg-[#0a0e1a]/60 backdrop-blur-xl"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <m.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mx-4 mb-4 border border-white/10 bg-[#0a0e1a]/95 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex flex-col p-3">
              {['Home', 'Story', 'Band', 'Tours', 'Merch'].map((item) => (
                <a
                  key={item}
                  href={item === 'Tours' || item === 'Story' || item === 'Band' || item === 'Merch' ? withBase(`/${item.toLowerCase()}`) : `#${item.toLowerCase()}`}
                  onClick={() => {
                    setActiveSection(item.toLowerCase());
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-4 border-b border-white/5 font-['Roboto_Mono'] text-sm uppercase tracking-[0.18em] transition-colors last:border-b-0 ${
                    activeSection === item.toLowerCase() ? 'text-[#ff1744]' : 'text-white/75'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </m.div>
        )}
        <m.div
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0, scaleX: scrolled ? 1 : 0.35 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-x-0 bottom-0 h-px origin-center bg-gradient-to-r from-transparent via-[#ff1744]/70 to-transparent"
        />
      </m.nav>

      {/* CINEMATIC HERO */}
      <section id="home" className="relative min-h-[760px] sm:min-h-screen flex items-center justify-center overflow-hidden py-28 sm:py-32">
        {/* Parallax Background */}
        <m.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src={imgRectangle1}
            alt="Hero"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0e1a]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,23,68,0.15),transparent_50%)]" />
        </m.div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-5 text-center sm:px-8 max-w-6xl">
          <div className="grid items-center gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12">
          <m.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-sm mx-auto rounded-2xl border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-[#ff1744]/20 backdrop-blur-2xl lg:max-w-none"
          >
            <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-[#ff1744]/30 via-transparent to-[#f50057]/30 opacity-70" />
            <div className="pointer-events-none absolute -left-10 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-[#ff1744]/20 blur-3xl" />
            <iframe
              data-testid="embed-iframe"
              src="https://open.spotify.com/embed/track/6d5UYaZQekK96pB3PDn6Za?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder={0}
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="relative h-[152px] w-full rounded-xl ring-1 ring-white/10"
              style={{ borderRadius: 12 }}
            />
          </m.div>

          <div className="lg:text-left">
          <m.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-['Cinzel_Decorative'] text-4xl sm:text-5xl lg:text-7xl mb-5 sm:mb-6 tracking-wide break-words"
          >
            <span className="bg-gradient-to-r from-[#ff1744] via-[#f50057] to-[#ff1744] bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_4s_linear_infinite]">
              VERSAEMERGE
            </span>
          </m.h1>

          <m.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="font-['Roboto_Mono'] text-base sm:text-xl text-white/80 mb-4 leading-relaxed max-w-3xl mx-auto lg:mx-0 tracking-wide">
              A journey through darkness into transformation
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-white/50 font-['Roboto_Mono']">
              <span className="hidden sm:block w-12 h-[1px] bg-gradient-to-r from-transparent to-white/30" />
              <span className="uppercase tracking-[0.18em] sm:tracking-[0.3em]">Gothic · Alternative · Rock</span>
              <span className="hidden sm:block w-12 h-[1px] bg-gradient-to-l from-transparent to-white/30" />
            </div>
          </m.div>

          <m.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start"
          >
            <m.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-gradient-to-r from-[#ff1744] to-[#f50057] font-['Roboto_Mono'] text-sm uppercase tracking-[0.15em] font-semibold shadow-lg shadow-[#ff1744]/30 hover:shadow-xl hover:shadow-[#ff1744]/40 transition-all duration-300"
            >
              Explore Music
            </m.button>
            <m.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 sm:px-10 py-4 border border-white/20 font-['Roboto_Mono'] text-sm uppercase tracking-[0.15em] backdrop-blur-sm hover:bg-white/5 hover:border-white/30 transition-all duration-300"
            >
              Watch Video
            </m.button>
          </m.div>
          </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden sm:block absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <m.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-gradient-to-b from-[#ff1744] to-transparent rounded-full" />
          </m.div>
        </m.div>
      </section>

      {/* PAINT IT BLACK - Elevated Design */}
      <section className="deferred-section relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={withBase('/assets/versaemerge-home/featured-door-1280.webp')}
            srcSet={`${withBase('/assets/versaemerge-home/featured-door-1280.webp')} 1280w, ${withBase('/assets/versaemerge-home/featured-door-2400.webp')} 2400w`}
            sizes="100vw"
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-[40%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a]/70 via-[#0a0e1a]/45 to-[#0a0e1a]/65" />
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff1744] to-transparent opacity-30" />

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <m.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <m.div variants={fadeInUp} className="mb-4">
                <span className="text-xs uppercase tracking-[0.3em] text-[#ff1744] font-['Roboto_Mono'] font-semibold">
                  Featured Track
                </span>
              </m.div>

              <m.h2
                variants={fadeInUp}
                className="font-['Cinzel_Decorative'] text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  PAINT IT BLACK
                </span>
              </m.h2>

              <m.p
                variants={fadeInUp}
                className="font-['Roboto_Mono'] text-base sm:text-lg text-white/60 mb-8 leading-relaxed max-w-xl"
              >
                An immersive sonic experience that blends haunting melodies with raw emotional power. This track captures the essence of transformation through darkness.
              </m.p>

              <m.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#ff1744] to-[#f50057] font-['Roboto_Mono'] text-sm uppercase tracking-[0.15em] font-semibold hover:shadow-lg hover:shadow-[#ff1744]/30 transition-all duration-300">
                  Listen Now
                </button>
                <button className="w-full sm:w-auto px-8 py-4 border border-white/20 font-['Roboto_Mono'] text-sm uppercase tracking-[0.15em] hover:bg-white/5 transition-all duration-300">
                  Read Story
                </button>
              </m.div>
            </m.div>

            <m.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10">
                <iframe
                  src="https://www.youtube.com/embed/lJOBJTBKMU8?si=Mo9eWuDhrLhnOPDT"
                  title="YouTube video player"
                  loading="lazy"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </m.div>
          </div>
        </div>

      </section>

      {/* THE BAND - Team Section */}
      <section id="band" className="deferred-section relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={withBase('/assets/versaemerge-band/band-portrait-2400.webp')}
            srcSet={`${withBase('/assets/versaemerge-band/band-portrait-1280.webp')} 1280w, ${withBase('/assets/versaemerge-band/band-portrait-2400.webp')} 2400w`}
            sizes="100vw"
            alt="The Band"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/90 via-[#0a0e1a]/85 to-[#0a0e1a]/95" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12 lg:mb-20"
          >
            <m.div variants={fadeInUp} className="mb-4">
              <span className="text-xs uppercase tracking-[0.3em] text-[#ff1744] font-['Roboto_Mono'] font-semibold">
                Meet the Artists
              </span>
            </m.div>

            <m.h2
              variants={fadeInUp}
              className="font-['Cinzel_Decorative'] text-4xl sm:text-5xl lg:text-6xl leading-tight"
            >
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                THE BAND
              </span>
            </m.h2>
          </m.div>

          {/* Band Members Grid */}
          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] gap-10 lg:gap-12"
          >
            {[
              {
                name: 'Devin',
                title: 'The Pulse of the Abyss',
                description: "Devin's rhythmic foundation anchors the band's journey, his beats resonating like footsteps through an endless night. His energy fuels their dark ascent."
              },
              {
                name: 'Sierra',
                title: 'The Voice of the Void',
                description: "Sierra's ethereal vocals guide listeners through a descent into darkness, her presence a catalyst for the band's haunting evolution. A modern siren, she crafts melodies that linger like echoes in a forsaken hall."
              },
              {
                name: 'Blake',
                title: 'The Shadow Weaver',
                description: "Blake's innovative compositions shape the band's sonic landscape, merging light and shadow into a transformative harmony. His vision drives VersaEmerge's gothic reinvention."
              }
            ].map((member, i) => (
              <m.div
                key={i}
                variants={fadeInUp}
                className="group"
              >
                <div className="relative mb-6">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ff1744] to-[#f50057] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                  <div className="relative">
                    <h3 className="font-['Cinzel_Decorative'] text-4xl lg:text-5xl mb-2 bg-gradient-to-r from-[#ff1744] to-[#f50057] bg-clip-text text-transparent">
                      {member.name}
                    </h3>
                    <div className="h-[2px] w-20 bg-gradient-to-r from-[#ff1744] to-transparent group-hover:w-full transition-all duration-500" />
                  </div>
                </div>

                <h4 className="font-['Roboto_Mono'] text-sm uppercase tracking-[0.2em] text-white/90 mb-4">
                  {member.title}
                </h4>

                <p className="font-['Roboto_Mono'] text-sm text-white/60 leading-relaxed">
                  {member.description}
                </p>
              </m.div>
            ))}
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center lg:mt-16"
          >
            <m.a
              href={withBase('/band')}
              whileHover={{ scale: 1.05, y: -2 }}
              className="inline-block px-10 py-4 bg-gradient-to-r from-[#ff1744] to-[#f50057] font-['Roboto_Mono'] text-sm uppercase tracking-[0.15em] font-semibold shadow-lg shadow-[#ff1744]/30 hover:shadow-xl hover:shadow-[#ff1744]/40 transition-all duration-300"
            >
              Meet the Band
            </m.a>
          </m.div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e1a] to-transparent pointer-events-none" />
      </section>

      {/* ARTISTIC EVOLUTION - Premium Card Layout */}
      <section id="story" className="deferred-section relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={imgRectangle8}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/92 via-[#0a0e1a]/88 to-[#0a0e1a]/92" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,0,87,0.08),transparent_50%)]" />

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <m.div variants={fadeInUp} className="mb-4">
              <span className="text-xs uppercase tracking-[0.3em] text-[#ff1744] font-['Roboto_Mono'] font-semibold">
                The Journey
              </span>
            </m.div>

            <m.h2
              variants={fadeInUp}
              className="font-['Cinzel_Decorative'] text-4xl sm:text-5xl lg:text-6xl mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                UNVEILING AN ARTISTIC EVOLUTION
              </span>
            </m.h2>

            <m.p
              variants={fadeInUp}
              className="font-['Roboto_Mono'] text-base sm:text-lg text-white/60 mb-10 sm:mb-12 leading-relaxed"
            >
              From underground rebellion to mainstream recognition, witness the metamorphosis of sound and vision that defines VersaEmerge.
            </m.p>

            <m.a
              variants={fadeInUp}
              href={withBase('/story')}
              whileHover={{ scale: 1.05, y: -2 }}
              className="inline-block px-10 py-4 bg-gradient-to-r from-[#ff1744] to-[#f50057] font-['Roboto_Mono'] text-sm uppercase tracking-[0.15em] font-semibold shadow-lg shadow-[#ff1744]/30 hover:shadow-xl hover:shadow-[#ff1744]/40 transition-all duration-300"
            >
              Discover the Story
            </m.a>
          </m.div>

          {/* Timeline Cards */}
          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] gap-6 lg:gap-8 mt-12 lg:mt-20"
          >
            {[
              { year: '2007', title: 'Genesis', desc: 'The beginning of a movement' },
              { year: '2014', title: 'Transformation', desc: 'Evolving sound and vision' },
              { year: '2025', title: 'Renaissance', desc: 'A new chapter begins' }
            ].map((item, i) => (
              <m.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 sm:p-8 rounded-2xl border border-white/10 backdrop-blur-sm group-hover:border-white/20 transition-all duration-300">
                  <div className="text-5xl lg:text-6xl font-['Cinzel_Decorative'] bg-gradient-to-r from-[#ff1744] to-[#f50057] bg-clip-text text-transparent mb-4">
                    {item.year}
                  </div>
                  <h3 className="font-['Cinzel_Decorative'] text-2xl mb-3">{item.title}</h3>
                  <p className="font-['Roboto_Mono'] text-sm text-white/60">{item.desc}</p>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* MERCHANDISE - Split Screen Premium */}
      <section id="merch" className="deferred-section relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0e1a]" />

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <m.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative h-[420px] sm:h-[520px] lg:h-[600px] rounded-2xl overflow-hidden group"
            >
              <img
                src={imgSkull1}
                alt="Merchandise"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl" />

              {/* Overlay Badge */}
              <div className="absolute top-4 right-4 sm:top-8 sm:right-8 px-4 sm:px-6 py-3 bg-[#ff1744] backdrop-blur-xl font-['Roboto_Mono'] text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold shadow-lg">
                New Collection
              </div>
            </m.div>

            <m.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <m.div variants={fadeInUp} className="mb-4">
                <span className="text-xs uppercase tracking-[0.3em] text-[#ff1744] font-['Roboto_Mono'] font-semibold">
                  Shop Now
                </span>
              </m.div>

              <m.h2
                variants={fadeInUp}
                className="font-['Cinzel_Decorative'] text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight"
              >
                EXCLUSIVE<br />
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  MERCHANDISE
                </span>
              </m.h2>

              <m.p
                variants={fadeInUp}
                className="font-['Roboto_Mono'] text-base sm:text-lg text-white/60 mb-8 leading-relaxed"
              >
                Limited edition apparel and collectibles designed for those who embrace the darkness. Each piece tells a story of rebellion and artistic expression.
              </m.p>

              <m.div variants={fadeInUp} className="space-y-4 mb-8">
                {['Premium Quality Fabrics', 'Limited Edition Designs', 'Worldwide Shipping'].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#ff1744] to-[#f50057] rotate-45" />
                    <span className="font-['Roboto_Mono'] text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </m.div>

              <m.a
                href={withBase('/merch')}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-block text-center w-full sm:w-auto px-8 sm:px-10 py-4 bg-gradient-to-r from-[#ff1744] to-[#f50057] font-['Roboto_Mono'] text-sm uppercase tracking-[0.15em] font-semibold shadow-lg shadow-[#ff1744]/30 hover:shadow-xl hover:shadow-[#ff1744]/40 transition-all duration-300"
              >
                Browse Collection
              </m.a>
            </m.div>
          </div>
        </div>
      </section>

      {/* UPCOMING TOURS - Premium Table Design */}
      <section id="tours" className="deferred-section relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#151a2e] to-[#0a0e1a]" />
          <div className="absolute inset-0 opacity-20">
            <img
              src={imgGothEyes1}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-[#0a0e1a]" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12 lg:mb-16"
          >
            <m.div variants={fadeInUp} className="mb-4">
              <span className="text-xs uppercase tracking-[0.3em] text-[#ff1744] font-['Roboto_Mono'] font-semibold">
                Live Performances
              </span>
            </m.div>

            <m.h2
              variants={fadeInUp}
              className="font-['Cinzel_Decorative'] text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                UPCOMING TOURS
              </span>
            </m.h2>

            <m.p
              variants={fadeInUp}
              className="font-['Roboto_Mono'] text-base sm:text-lg text-white/60 max-w-2xl mx-auto"
            >
              Experience the intensity live. Join us on our journey across the world.
            </m.p>
          </m.div>

          {/* Tour Dates */}
          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {[
              { date: 'APR 28', city: 'Los Angeles', venue: 'The Wiltern' },
              { date: 'MAY 05', city: 'New York', venue: 'Terminal 5' },
              { date: 'MAY 12', city: 'Chicago', venue: 'House of Blues' },
              { date: 'MAY 19', city: 'London', venue: 'O2 Academy Brixton' }
            ].map((show, i) => (
              <m.div
                key={i}
                variants={fadeInUp}
                whileHover={{ x: 8 }}
                className="group relative p-5 sm:p-8 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  <div className="flex items-center gap-5 sm:gap-12">
                    <div className="shrink-0 font-['Roboto_Mono'] text-xl sm:text-2xl font-bold text-[#ff1744]">
                      {show.date}
                    </div>
                    <div>
                      <div className="font-['Cinzel_Decorative'] text-xl mb-1">{show.city}</div>
                      <div className="font-['Roboto_Mono'] text-sm text-white/50">{show.venue}</div>
                    </div>
                  </div>

                  <button className="w-full sm:w-auto px-8 py-3 border border-white/30 font-['Roboto_Mono'] text-xs uppercase tracking-[0.15em] group-hover:bg-gradient-to-r group-hover:from-[#ff1744] group-hover:to-[#f50057] group-hover:border-transparent transition-all duration-300">
                    Get Tickets
                  </button>
                </div>

                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ff1744] to-[#f50057] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* NEWSLETTER - Premium Form Design */}
      <section className="deferred-section relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={imgSkull1}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/95 to-[#1a0a1f]/95" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,23,68,0.1),transparent_70%)]" />

        <div className="relative max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <m.div variants={fadeInUp} className="mb-4">
              <span className="text-xs uppercase tracking-[0.3em] text-[#ff1744] font-['Roboto_Mono'] font-semibold">
                Stay Connected
              </span>
            </m.div>

            <m.h2
              variants={fadeInUp}
              className="font-['Cinzel_Decorative'] text-4xl sm:text-5xl mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                JOIN THE SHADOWS
              </span>
            </m.h2>

            <m.p
              variants={fadeInUp}
              className="font-['Roboto_Mono'] text-base sm:text-lg text-white/60 mb-10 sm:mb-12 leading-relaxed"
            >
              Exclusive updates, tour dates, and the haunting evolution of VersaEmerge delivered to your inbox.
            </m.p>

            <m.div
              variants={fadeInUp}
              className="relative max-w-xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-w-0 flex-1 px-5 sm:px-8 py-5 bg-white/5 border border-white/10 font-['Roboto_Mono'] text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff1744] focus:bg-white/10 transition-all duration-300 backdrop-blur-xl"
                />
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 sm:px-10 py-5 bg-gradient-to-r from-[#ff1744] to-[#f50057] font-['Roboto_Mono'] text-sm uppercase tracking-[0.15em] font-semibold shadow-lg shadow-[#ff1744]/30 hover:shadow-xl hover:shadow-[#ff1744]/40 transition-all duration-300 whitespace-nowrap"
                >
                  Subscribe
                </m.button>
              </div>
              <p className="font-['Roboto_Mono'] text-xs text-white/40 mt-4 text-left">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </m.div>

            {/* Social Links */}
            <m.div
              variants={fadeInUp}
              className="flex flex-wrap gap-3 sm:gap-6 justify-center mt-12 sm:mt-16"
            >
              {[
                { name: 'Facebook', icon: Facebook },
                { name: 'Instagram', icon: Instagram },
                { name: 'YouTube', icon: Youtube },
                { name: 'Twitter', icon: Twitter },
                { name: 'LinkedIn', icon: Linkedin }
              ].map(({ name, icon: Icon }) => (
                <m.button
                  key={name}
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-all duration-300 group"
                  aria-label={name}
                >
                  <Icon className="w-5 h-5 text-white/50 group-hover:text-[#ff1744] transition-colors" />
                </m.button>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* FOOTER - Minimal & Premium */}
      <footer className="deferred-section relative border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#0a0e1a]" />
          <div className="absolute bottom-0 right-0 w-1/3 h-full opacity-5">
            <img
              src={imgRectangle1}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-4 sm:gap-5 mb-6">
                <img
                  src={imgIconLogo}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="brand-icon-logo h-20 sm:h-24 w-auto shrink-0 object-contain"
                />
                <h3 className="font-['Cinzel_Decorative'] text-xl sm:text-2xl tracking-wide">
                  <span className="bg-gradient-to-r from-[#ff1744] via-[#f50057] to-[#ff1744] bg-clip-text text-transparent">
                    VERSAEMERGE
                  </span>
                </h3>
              </div>
              <p className="font-['Roboto_Mono'] text-sm text-white/50 max-w-md leading-relaxed mb-6">
                Transcending boundaries through sound, vision, and artistic rebellion since 2007.
              </p>

              {/* Footer Social Icons */}
              <div className="flex gap-4">
                {[
                  { name: 'Facebook', icon: Facebook, link: '#' },
                  { name: 'Instagram', icon: Instagram, link: '#' },
                  { name: 'YouTube', icon: Youtube, link: '#' },
                  { name: 'Twitter', icon: Twitter, link: '#' },
                  { name: 'LinkedIn', icon: Linkedin, link: '#' }
                ].map(({ name, icon: Icon, link }) => (
                  <a
                    key={name}
                    href={link}
                    className="w-10 h-10 flex items-center justify-center transition-all duration-300 group"
                    aria-label={name}
                  >
                    <Icon className="w-4 h-4 text-white/40 group-hover:text-[#ff1744] transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h4 className="font-['Roboto_Mono'] text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
                  Explore
                </h4>
                <div className="space-y-3 font-['Roboto_Mono'] text-sm">
                  {['Music', 'Videos', 'Photos', 'News'].map(item => (
                    <div key={item}>
                      <a href="#" className="text-white/60 hover:text-white transition-colors">
                        {item}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-['Roboto_Mono'] text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
                  Connect
                </h4>
                <div className="space-y-3 font-['Roboto_Mono'] text-sm">
                  {['Tours', 'Store', 'Contact', 'Press'].map(item => (
                    <div key={item}>
                      <a href="#" className="text-white/60 hover:text-white transition-colors">
                        {item}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="font-['Roboto_Mono'] text-xs text-white/40">
              © 2025 VERSAEMERGE. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 font-['Roboto_Mono'] text-xs text-white/40">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
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
