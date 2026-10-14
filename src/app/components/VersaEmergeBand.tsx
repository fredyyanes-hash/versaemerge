import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { withBase } from '../basePath';
import {
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  Twitter,
  X,
  Youtube,
} from 'lucide-react';
import imgForest from '../../imports/Home/c9d25a6bcc8d0db405bb265444afc8874b72f490.png';
import imgHallway from '../../imports/Home/b26a8d96a0d70b33ccc43691d2fce58b102ca1ec.png';
import imgIconLogo from '../../imports/versaemerge-icon-logo.png';

const bandAsset = (name: string) => withBase(`/assets/versaemerge-band/${name}`);

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

const members = [
  {
    name: 'Devin',
    fullName: 'Devin Ingelido',
    role: 'Bass',
    title: 'The Pulse of the Abyss',
    years: '2007 — 2011',
    description:
      'Devin’s rhythmic foundation anchors the band’s journey, his beats resonating like footsteps through an endless night. His energy fuels their dark ascent.',
    story: [
      'Devin came to VersaEmerge from the Florida band Bury the Ashes and locked in the low end through the band’s breakout years: the Fueled by Ramen signing, two Warped Tours and the Fixed at Zero era.',
      'He played his final show with the band on May 7, 2011, stepping away to be with his family after the birth of his son.',
    ],
    facts: ['Formerly of Bury the Ashes', 'Played on Fixed at Zero', 'Final show May 2011'],
  },
  {
    name: 'Sierra',
    fullName: 'Sierra Kusterbeck',
    role: 'Lead Vocals',
    title: 'The Voice of the Void',
    years: '2007 — 2015',
    description:
      'Sierra’s ethereal vocals guide listeners through a descent into darkness, her presence a catalyst for the band’s haunting evolution. A modern siren, she crafts melodies that linger like echoes in a forsaken hall.',
    story: [
      'She found the band through an online audition tape in 2007, a week shy of turning seventeen. From that first recording she became the face and the voice of VersaEmerge, carrying it through every EP, the full-length debut, and the move to Versa.',
      'In 2010 Alternative Press named her in its “Front and Center: The New Class of 2010.” On the Warped Tour that summer she turned the festival grounds into a game of hide-and-seek with fans.',
    ],
    facts: ['Joined in 2007', 'AP Class of 2010', 'Later recorded as Sierra Kay'],
  },
  {
    name: 'Blake',
    fullName: 'Blake Harnage',
    role: 'Guitar · Programming · Vocals',
    title: 'The Shadow Weaver',
    years: 'Founder',
    description:
      'Blake’s innovative compositions shape the band’s sonic landscape, merging light and shadow into a transformative harmony. His vision drives VersaEmerge’s gothic reinvention.',
    story: [
      'Blake founded the band in 2006 and gave it its name, a blend of “vice versa” and “emerge”: opposites, rising. He wrote, produced and programmed much of the music, picking up bass and drums whenever the lineup needed him.',
      'He points to film scores as his deepest influence, which is why VersaEmerge songs move like scenes, building tension and release the way a soundtrack does.',
    ],
    facts: ['Founded the band in 2006', 'Named it VersaEmerge', 'Inspired by film scores'],
  },
];

const milestones = [
  {
    year: '2006',
    title: 'Genesis',
    desc: 'Blake Harnage forms VersaEmerge in Port St. Lucie, Florida, after his previous band, My Fair Verona, loses its singer.',
  },
  {
    year: '2007',
    title: 'The Voice Arrives',
    desc: 'Sierra Kusterbeck joins through an online audition and Devin Ingelido takes over bass. The debut EP, Cities Built on Sand, is released.',
  },
  {
    year: '2008',
    title: 'Perceptions',
    desc: 'A second self-released EP sharpens the sound: atmospheric, electronic and darker at the edges.',
  },
  {
    year: '2009',
    title: 'Fueled by Ramen',
    desc: 'The band signs to Fueled by Ramen, releases a self-titled EP, plays Give It a Name in the UK and joins its first Vans Warped Tour.',
  },
  {
    year: '2010',
    title: 'Fixed at Zero',
    desc: 'The debut album lands at No. 3 on Billboard’s Top Heatseekers. A second Warped Tour is followed by the headlining Vultures Unite Tour.',
  },
  {
    year: '2011',
    title: 'Unplugged',
    desc: 'The Live Acoustic EP strips the songs back to their bones, and the band tours the spring on the Alternative Press Tour.',
  },
  {
    year: '2012',
    title: 'Across the World',
    desc: 'VersaEmerge takes the stage at Australia’s Soundwave Festival and records Another Atmosphere.',
  },
  {
    year: '2014',
    title: 'Transformation',
    desc: 'The band becomes Versa and releases the Neon EP, carrying songs from the unreleased album into the light.',
  },
  {
    year: '2025',
    title: 'Renaissance',
    desc: 'VersaEmerge returns from the shadows with its gothic reimagining of “Paint It Black.”',
  },
];

const discography = [
  { year: '2007', title: 'Cities Built on Sand', type: 'EP', label: 'Self-released' },
  { year: '2008', title: 'Perceptions', type: 'EP', label: 'Self-released' },
  { year: '2009', title: 'VersaEmerge', type: 'EP', label: 'Fueled by Ramen' },
  { year: '2010', title: 'Fixed at Zero', type: 'Album', label: 'Fueled by Ramen' },
  { year: '2011', title: 'Live Acoustic', type: 'EP', label: 'Fueled by Ramen' },
  { year: '2014', title: 'Neon', type: 'EP · as Versa', label: 'Self-released' },
];

const influences = ['Björk', 'Muse', 'Imogen Heap', 'Guy Sigsworth', 'Film scores'];

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
};

export default function VersaEmergeBand() {
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
                aria-current={link.label === 'Band' ? 'page' : undefined}
                className={`group relative font-['Roboto_Mono'] text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                  link.label === 'Band' ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#ff1744] to-[#f50057] transition-all duration-300 ${
                    link.label === 'Band' ? 'w-full' : 'w-0 group-hover:w-full'
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
            aria-controls="band-mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <motion.div
            id="band-mobile-navigation"
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
                    link.label === 'Band' ? 'text-[#ff1744]' : 'text-white/75'
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
        {/* Hero: The Band */}
        <section className="relative flex min-h-[640px] items-end justify-center overflow-hidden px-6 pb-16 pt-36 sm:min-h-[760px] sm:pb-24 lg:min-h-screen">
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img
              src={bandAsset('band-portrait.webp')}
              srcSet={`${bandAsset('band-portrait-960.webp')} 960w, ${bandAsset('band-portrait.webp')} 1920w`}
              sizes="100vw"
              alt="Devin, Sierra and Blake of VersaEmerge"
              decoding="async"
              fetchPriority="high"
              className="h-full w-full object-cover object-[50%_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0e1a]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/80 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,rgba(255,23,68,0.18),transparent_55%)]" />
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="relative z-10 mx-auto w-full max-w-4xl text-center"
          >
            <motion.p
              variants={fadeInUp}
              className="mb-5 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]"
            >
              Meet the Artists
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="mb-7 font-['Cinzel_Decorative'] text-5xl leading-tight sm:text-6xl lg:text-7xl"
            >
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                THE BAND
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mx-auto max-w-3xl font-['Roboto_Mono'] text-base leading-relaxed text-white/70 sm:text-lg"
            >
              VersaEmerge emerges from the shadows, a collective of visionaries weaving a haunting tapestry of sound
              and story. Their reimagining of “Paint It Black” transcends tradition, blending gothic allure with raw
              emotional depth. Meet the souls behind the transformation.
            </motion.p>
          </motion.div>
        </section>

        {/* Members */}
        <section aria-labelledby="members-heading" className="deferred-section relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0">
            <img
              src={imgForest}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#151a2e]/85 to-[#0a0e1a]" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,0,87,0.1),transparent_55%)]" />

          <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="mb-14 text-center lg:mb-20"
            >
              <motion.p
                variants={fadeInUp}
                className="mb-4 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]"
              >
                The Souls Behind the Sound
              </motion.p>
              <motion.h2
                id="members-heading"
                variants={fadeInUp}
                className="font-['Cinzel_Decorative'] text-4xl leading-tight sm:text-5xl lg:text-6xl"
              >
                <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                  THE MEMBERS
                </span>
              </motion.h2>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))] gap-8 lg:gap-10"
            >
              {members.map((member) => (
                <motion.article
                  key={member.name}
                  variants={fadeInUp}
                  className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#0a0e1a]/60 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-white/20 sm:p-8"
                >
                  <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#ff1744] to-[#f50057] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-15" />
                  <div className="relative">
                    <p className="mb-2 font-['Roboto_Mono'] text-[11px] uppercase tracking-[0.25em] text-white/45">
                      {member.role}
                    </p>
                    <h3 className="mb-2 bg-gradient-to-r from-[#ff1744] to-[#f50057] bg-clip-text font-['Cinzel_Decorative'] text-4xl text-transparent lg:text-5xl">
                      {member.name}
                    </h3>
                    <div className="mb-6 h-[2px] w-20 bg-gradient-to-r from-[#ff1744] to-transparent transition-all duration-500 group-hover:w-full" />

                    <h4 className="mb-1 font-['Roboto_Mono'] text-sm uppercase tracking-[0.2em] text-white/90">
                      {member.title}
                    </h4>
                    <p className="mb-5 font-['Roboto_Mono'] text-xs text-white/40">
                      {member.fullName} · {member.years}
                    </p>

                    <p className="mb-5 font-['Cormorant_Garamond:Bold'] text-xl leading-snug text-white/85">
                      {member.description}
                    </p>
                    <div className="space-y-4 font-['Roboto_Mono'] text-sm leading-relaxed text-white/60">
                      {member.story.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  <ul className="relative mt-auto flex flex-wrap gap-2 pt-6">
                    {member.facts.map((fact) => (
                      <li
                        key={fact}
                        className="border border-[#ff1744]/30 bg-[#ff1744]/5 px-3 py-1.5 font-['Roboto_Mono'] text-[11px] uppercase tracking-[0.12em] text-white/70"
                      >
                        {fact}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* The Journey */}
        <section aria-labelledby="journey-heading" className="deferred-section relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0">
            <img
              src={imgHallway}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/95 via-[#0a0e1a]/90 to-[#0a0e1a]/95" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,0,87,0.08),transparent_50%)]" />

          <div className="relative mx-auto max-w-[1400px] px-6 text-center sm:px-8 lg:px-12">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mx-auto max-w-4xl"
            >
              <motion.p
                variants={fadeInUp}
                className="mb-4 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]"
              >
                The Journey
              </motion.p>
              <motion.h2
                id="journey-heading"
                variants={fadeInUp}
                className="mb-8 font-['Cinzel_Decorative'] text-4xl leading-tight sm:text-5xl lg:text-6xl"
              >
                <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                  RISING FROM THE SHADOWS
                </span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="font-['Roboto_Mono'] text-base leading-relaxed text-white/60 sm:text-lg"
              >
                From a Florida garage to festival stages across the world, every chapter pushed VersaEmerge deeper
                into the dark and closer to who they were meant to become.
              </motion.p>
            </motion.div>

            <motion.ol
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8"
            >
              {milestones.map((item) => (
                <motion.li key={item.year} variants={fadeInUp} whileHover={{ y: -8 }} className="group relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative h-full rounded-2xl border border-white/10 p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 sm:p-8">
                    <div className="mb-4 bg-gradient-to-r from-[#ff1744] to-[#f50057] bg-clip-text font-['Cinzel_Decorative'] text-5xl text-transparent lg:text-6xl">
                      {item.year}
                    </div>
                    <h3 className="mb-3 font-['Cinzel_Decorative'] text-2xl">{item.title}</h3>
                    <p className="font-['Roboto_Mono'] text-sm leading-relaxed text-white/60">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </section>

        {/* Discography + influences */}
        <section aria-labelledby="discography-heading" className="deferred-section relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 bg-[#0a0e1a]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,23,68,0.1),transparent_55%)]" />

          <div className="relative mx-auto grid max-w-[1400px] gap-14 px-6 sm:px-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20 lg:px-12">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.p
                variants={fadeInUp}
                className="mb-4 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]"
              >
                Discography
              </motion.p>
              <motion.h2
                id="discography-heading"
                variants={fadeInUp}
                className="mb-10 font-['Cinzel_Decorative'] text-4xl leading-tight sm:text-5xl"
              >
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  THE RECORDS
                </span>
              </motion.h2>

              <ul className="divide-y divide-white/10 border-y border-white/10">
                {discography.map((record) => (
                  <motion.li
                    key={record.title}
                    variants={fadeInUp}
                    className="group grid grid-cols-[4rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 py-5 sm:grid-cols-[5rem_minmax(0,1fr)_auto]"
                  >
                    <span className="font-['Cinzel_Decorative'] text-xl text-[#ff1744]">{record.year}</span>
                    <span className="font-['Cinzel_Decorative'] text-xl text-white transition-colors group-hover:text-[#ff1744] sm:text-2xl">
                      {record.title}
                    </span>
                    <span className="col-start-2 font-['Roboto_Mono'] text-xs uppercase tracking-[0.15em] text-white/45 sm:col-start-3 sm:text-right">
                      {record.type} · {record.label}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col justify-center"
            >
              <figure className="mb-12 border-l-2 border-[#ff1744]/70 pl-6">
                <blockquote className="font-['Cormorant_Garamond:Bold'] text-2xl leading-snug text-white/90 sm:text-3xl">
                  “Vice versa” and “emerge”: opposites, rising.
                </blockquote>
                <figcaption className="mt-4 font-['Roboto_Mono'] text-xs uppercase tracking-[0.25em] text-white/45">
                  The meaning behind the name
                </figcaption>
              </figure>

              <h3 className="mb-5 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                Influences
              </h3>
              <ul className="mb-12 flex flex-wrap gap-3">
                {influences.map((name) => (
                  <li
                    key={name}
                    className="border border-white/10 bg-white/5 px-4 py-2 font-['Roboto_Mono'] text-sm text-white/75 backdrop-blur-xl"
                  >
                    {name}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4 sm:flex-row">
                <motion.a
                  href={withBase('/story')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-block bg-gradient-to-r from-[#ff1744] to-[#f50057] px-8 py-4 text-center font-['Roboto_Mono'] text-sm font-semibold uppercase tracking-[0.15em] shadow-lg shadow-[#ff1744]/30"
                >
                  Discover the Story
                </motion.a>
                <motion.a
                  href={withBase('/tours')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-block border border-white/20 px-8 py-4 text-center font-['Roboto_Mono'] text-sm font-semibold uppercase tracking-[0.15em] text-white/85 transition-colors hover:border-[#ff1744] hover:text-white"
                >
                  See Tour Dates
                </motion.a>
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
              <label className="sr-only" htmlFor="band-email">
                Email address
              </label>
              <input
                id="band-email"
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
