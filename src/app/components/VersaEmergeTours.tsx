import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { withBase } from '../basePath';
import {
  ArrowRight,
  CalendarPlus,
  Check,
  ChevronDown,
  Crown,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Menu,
  Music2,
  Search,
  Shirt,
  Ticket,
  Twitter,
  X,
  Youtube,
} from 'lucide-react';
import imgHallway from '../../imports/Home/b26a8d96a0d70b33ccc43691d2fce58b102ca1ec.png';
import imgGothEyes from '../../imports/Home/35059a8c9ab5633b770ca028306257117896b6e9.png';
import imgForest from '../../imports/Home/c9d25a6bcc8d0db405bb265444afc8874b72f490.png';
import imgIconLogo from '../../imports/versaemerge-icon-logo.png';

const storyAsset = (name: string) => withBase(`/assets/versaemerge-story/${name}`);

const TOUR_NAME = 'Paint It Black World Tour';
const CONTACT_EMAIL = 'booking@versaemerge.com';
// Placeholder until a real ticketing link exists; update once and every button follows.
const TICKETS_URL = '#dates';

type Region = 'North America' | 'UK & Europe';
type Status = 'on-sale' | 'low' | 'sold-out' | 'presale';

type Show = {
  date: string; // YYYY-MM-DD, local to the venue
  city: string;
  region: string;
  country: string;
  area: Region;
  venue: string;
  status: Status;
  doors: string;
};

// Placeholder routing: dates, venues and statuses are illustrative, not announced shows.
const shows: Show[] = [
  { date: '2026-11-06', city: 'Orlando', region: 'FL', country: 'USA', area: 'North America', venue: 'The Beacham', status: 'on-sale', doors: '7:00 PM' },
  { date: '2026-11-07', city: 'Miami', region: 'FL', country: 'USA', area: 'North America', venue: 'James L. Knight Center', status: 'low', doors: '7:00 PM' },
  { date: '2026-11-09', city: 'Tampa', region: 'FL', country: 'USA', area: 'North America', venue: 'Jannus Live', status: 'on-sale', doors: '6:30 PM' },
  { date: '2026-11-12', city: 'Atlanta', region: 'GA', country: 'USA', area: 'North America', venue: 'The Masquerade', status: 'sold-out', doors: '7:00 PM' },
  { date: '2026-11-14', city: 'Nashville', region: 'TN', country: 'USA', area: 'North America', venue: 'Brooklyn Bowl', status: 'on-sale', doors: '7:00 PM' },
  { date: '2026-11-17', city: 'Philadelphia', region: 'PA', country: 'USA', area: 'North America', venue: 'Union Transfer', status: 'on-sale', doors: '7:00 PM' },
  { date: '2026-11-19', city: 'New York', region: 'NY', country: 'USA', area: 'North America', venue: 'Terminal 5', status: 'low', doors: '7:00 PM' },
  { date: '2026-11-20', city: 'Boston', region: 'MA', country: 'USA', area: 'North America', venue: 'Paradise Rock Club', status: 'sold-out', doors: '7:00 PM' },
  { date: '2026-11-23', city: 'Chicago', region: 'IL', country: 'USA', area: 'North America', venue: 'Metro', status: 'on-sale', doors: '7:00 PM' },
  { date: '2026-12-01', city: 'Denver', region: 'CO', country: 'USA', area: 'North America', venue: 'Summit', status: 'on-sale', doors: '7:00 PM' },
  { date: '2026-12-04', city: 'San Francisco', region: 'CA', country: 'USA', area: 'North America', venue: 'The Fillmore', status: 'low', doors: '7:00 PM' },
  { date: '2026-12-05', city: 'Los Angeles', region: 'CA', country: 'USA', area: 'North America', venue: 'The Echo', status: 'on-sale', doors: '8:00 PM' },
  { date: '2027-02-10', city: 'London', region: '', country: 'UK', area: 'UK & Europe', venue: 'O2 Academy Islington', status: 'presale', doors: '7:00 PM' },
  { date: '2027-02-12', city: 'Manchester', region: '', country: 'UK', area: 'UK & Europe', venue: 'Manchester Academy 2', status: 'presale', doors: '7:00 PM' },
  { date: '2027-02-15', city: 'Paris', region: '', country: 'France', area: 'UK & Europe', venue: 'La Maroquinerie', status: 'presale', doors: '7:30 PM' },
  { date: '2027-02-17', city: 'Amsterdam', region: '', country: 'Netherlands', area: 'UK & Europe', venue: 'Melkweg', status: 'presale', doors: '7:00 PM' },
  { date: '2027-02-19', city: 'Berlin', region: '', country: 'Germany', area: 'UK & Europe', venue: 'Lido', status: 'presale', doors: '8:00 PM' },
  // Earlier run, shown under "Past Shows" once the date has passed.
  { date: '2025-03-20', city: 'Miami', region: 'FL', country: 'USA', area: 'North America', venue: 'James L. Knight Center', status: 'sold-out', doors: '7:00 PM' },
  { date: '2025-03-22', city: 'Tampa', region: 'FL', country: 'USA', area: 'North America', venue: 'Julian B. Lane Riverfront Park', status: 'sold-out', doors: '6:00 PM' },
  { date: '2025-03-24', city: 'Naples', region: 'FL', country: 'USA', area: 'North America', venue: 'Artis—Naples', status: 'sold-out', doors: '7:00 PM' },
  { date: '2025-04-03', city: 'London', region: '', country: 'UK', area: 'UK & Europe', venue: 'O2 Academy Islington', status: 'sold-out', doors: '7:00 PM' },
  { date: '2025-07-27', city: 'New York', region: 'NY', country: 'USA', area: 'North America', venue: 'Terminal 5', status: 'sold-out', doors: '7:00 PM' },
  { date: '2025-08-30', city: 'Los Angeles', region: 'CA', country: 'USA', area: 'North America', venue: 'The Echo', status: 'sold-out', doors: '8:00 PM' },
];

const statusLabels: Record<Status, { label: string; className: string }> = {
  'on-sale': { label: 'On Sale', className: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300' },
  low: { label: 'Few Left', className: 'border-amber-400/30 bg-amber-400/10 text-amber-300' },
  'sold-out': { label: 'Sold Out', className: 'border-white/15 bg-white/5 text-white/45' },
  presale: { label: 'Presale Soon', className: 'border-[#f50057]/40 bg-[#f50057]/10 text-[#ff4f7b]' },
};

// Placeholder packages and prices.
const vipPackages = [
  {
    name: 'Shadow',
    price: '$95',
    tagline: 'For the faithful',
    perks: ['One general admission ticket', 'Early entry before doors', 'Exclusive tour poster', 'Commemorative VIP laminate'],
  },
  {
    name: 'Abyss',
    price: '$175',
    tagline: 'The full experience',
    featured: true,
    perks: [
      'Everything in Shadow',
      'Pre-show soundcheck access',
      'Q&A with Sierra and Blake',
      'Tour-exclusive tee',
      'First access to merch',
    ],
  },
  {
    name: 'Paint It Black',
    price: '$295',
    tagline: 'Meet the band',
    perks: [
      'Everything in Abyss',
      'Meet & greet with photo',
      'Signed setlist',
      'Limited red vinyl variant',
      'Dedicated VIP host',
    ],
  },
];

const faqs = [
  {
    q: 'What time do doors open and when does the band go on?',
    a: 'Doors are listed on each date. VersaEmerge typically takes the stage about two hours after doors, following special guests. Exact set times are posted at the venue on the day of the show.',
  },
  {
    q: 'Are the shows all ages?',
    a: 'Most dates are all ages. Some venues set their own age limits, which are shown on the ticketing page for that show. Bring a valid photo ID either way.',
  },
  {
    q: 'How do I check in for my VIP package?',
    a: 'Your VIP host will email check-in details 48 hours before the show. Arrive at the VIP entrance at the listed time with your ticket and photo ID. Late arrivals may miss soundcheck.',
  },
  {
    q: 'Is there a bag policy?',
    a: 'Venues set their own policies. Small clear bags and clutches are usually allowed. Large bags, outside food and drinks, and professional cameras are not.',
  },
  {
    q: 'Where can I buy tickets safely?',
    a: 'Only buy through the ticket links on this page. Tickets from unofficial resellers may be fake or cancelled, and we can’t help recover them.',
  },
  {
    q: 'Is the venue accessible?',
    a: 'Every venue on the tour offers accessible seating or viewing areas. Contact the venue box office ahead of time to arrange accessible tickets and companion seating.',
  },
];

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

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
};

function parseDate(date: string) {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function place(show: Show) {
  return show.region ? `${show.city}, ${show.region}` : `${show.city}, ${show.country}`;
}

function downloadCalendarEvent(show: Show) {
  const day = show.date.replace(/-/g, '');
  const next = parseDate(show.date);
  next.setDate(next.getDate() + 1);
  const end = `${next.getFullYear()}${String(next.getMonth() + 1).padStart(2, '0')}${String(next.getDate()).padStart(2, '0')}`;
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//VersaEmerge//Tours//EN',
    'BEGIN:VEVENT',
    `UID:versaemerge-${day}-${show.city.toLowerCase().replace(/\s+/g, '-')}@versaemerge`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART;VALUE=DATE:${day}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:VersaEmerge – ${TOUR_NAME}`,
    `LOCATION:${`${show.venue}, ${place(show)}`.replace(/,/g, '\\,')}`,
    `DESCRIPTION:Doors ${show.doors}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `versaemerge-${show.city.toLowerCase().replace(/\s+/g, '-')}-${show.date}.ics`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function useCountdown(target: Date | null) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!target) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [target]);
  if (!target) return null;
  const diff = Math.max(0, target.getTime() - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function VersaEmergeTours() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState<'upcoming' | 'past'>('upcoming');
  const [area, setArea] = useState<'All' | Region>('All');
  const [query, setQuery] = useState('');
  const [requestCity, setRequestCity] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { upcoming, past } = useMemo(() => {
    const today = startOfToday();
    const sorted = [...shows].sort((a, b) => a.date.localeCompare(b.date));
    return {
      upcoming: sorted.filter((show) => parseDate(show.date) >= today),
      past: sorted.filter((show) => parseDate(show.date) < today).reverse(),
    };
  }, []);

  const nextShow = upcoming.find((show) => show.status !== 'sold-out') ?? upcoming[0] ?? null;
  const nextShowStart = useMemo(() => {
    if (!nextShow) return null;
    const start = parseDate(nextShow.date);
    start.setHours(20);
    return start;
  }, [nextShow]);
  const countdown = useCountdown(nextShowStart);

  const countries = new Set(upcoming.map((show) => show.country)).size;
  const visibleShows = (view === 'upcoming' ? upcoming : past).filter((show) => {
    const matchesArea = area === 'All' || show.area === area;
    const term = query.trim().toLowerCase();
    const matchesQuery =
      !term || [show.city, show.venue, show.country, show.region].some((value) => value.toLowerCase().includes(term));
    return matchesArea && matchesQuery;
  });

  const requestHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Bring VersaEmerge to ${requestCity.trim() || 'my city'}`,
  )}`;

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
        <section className="relative flex min-h-[720px] items-center overflow-hidden px-6 pb-20 pt-36 sm:px-8 sm:pt-40 lg:min-h-screen lg:px-12">
          <motion.div
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img src={imgHallway} alt="" decoding="async" fetchPriority="high" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#0a0e1a]/65 to-[#0a0e1a]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_45%,rgba(255,23,68,0.2),transparent_55%)]" />
          </motion.div>

          <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:gap-20">
            <motion.div initial="initial" animate="animate" variants={staggerContainer}>
              <motion.p
                variants={fadeInUp}
                className="mb-5 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]"
              >
                Live · 2026 — 2027
              </motion.p>
              <motion.h1
                variants={fadeInUp}
                className="mb-6 font-['Cinzel_Decorative'] text-5xl leading-[1.05] sm:text-6xl lg:text-7xl xl:text-8xl"
              >
                <span className="block bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                  PAINT IT
                </span>
                <span className="block bg-gradient-to-r from-[#ff1744] to-[#f50057] bg-clip-text text-transparent">
                  BLACK
                </span>
                <span className="mt-3 block font-['Roboto_Mono'] text-sm font-semibold uppercase tracking-[0.5em] text-white/70 sm:text-base">
                  World Tour
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mb-10 max-w-2xl font-['Roboto_Mono'] text-base leading-relaxed text-white/65 sm:text-lg"
              >
                Step into the abyss as VersaEmerge brings its haunting rendition of “Paint It Black” to the stage.
                A cinematic journey through shadows, where gothic melodies and raw punk energy collide.
              </motion.p>

              <motion.dl variants={fadeInUp} className="mb-10 flex flex-wrap gap-x-10 gap-y-5">
                {[
                  { label: 'Shows', value: upcoming.length },
                  { label: 'Countries', value: countries },
                  { label: 'Special Guests', value: 'TBA' },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse">
                    <dt className="font-['Roboto_Mono'] text-[10px] uppercase tracking-[0.25em] text-white/45">
                      {stat.label}
                    </dt>
                    <dd className="font-['Cinzel_Decorative'] text-3xl text-white sm:text-4xl">{stat.value}</dd>
                  </div>
                ))}
              </motion.dl>

              <motion.div variants={fadeInUp} className="flex flex-col gap-4 sm:flex-row">
                <motion.a
                  href="#dates"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#ff1744] to-[#f50057] px-8 py-4 font-['Roboto_Mono'] text-sm font-semibold uppercase tracking-[0.15em] shadow-lg shadow-[#ff1744]/30"
                >
                  <Ticket className="h-4 w-4" />
                  Get Tickets
                </motion.a>
                <motion.a
                  href="#vip"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-3 border border-white/20 bg-white/5 px-8 py-4 font-['Roboto_Mono'] text-sm font-semibold uppercase tracking-[0.15em] text-white/85 backdrop-blur-xl transition-colors hover:border-[#ff1744] hover:text-white"
                >
                  <Crown className="h-4 w-4" />
                  VIP Packages
                </motion.a>
              </motion.div>
            </motion.div>

            {nextShow && countdown && (
              <motion.aside
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                aria-label="Next show"
                className="relative overflow-hidden border border-white/10 bg-[#0a0e1a]/60 p-7 shadow-2xl shadow-[#ff1744]/10 backdrop-blur-2xl sm:p-9"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff1744] to-[#f50057]" />
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#ff1744]/15 blur-3xl" />

                <p className="relative mb-6 flex items-center gap-3 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff1744] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff1744]" />
                  </span>
                  Next Show
                </p>
                <h2 className="relative mb-2 font-['Cinzel_Decorative'] text-3xl sm:text-4xl">{place(nextShow)}</h2>
                <p className="relative mb-8 font-['Roboto_Mono'] text-sm text-white/60">
                  {parseDate(nextShow.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                  <br />
                  {nextShow.venue}
                </p>

                <div className="relative mb-8 grid grid-cols-4 gap-2 sm:gap-3" role="timer" aria-live="off">
                  {(
                    [
                      ['Days', countdown.days],
                      ['Hrs', countdown.hours],
                      ['Min', countdown.minutes],
                      ['Sec', countdown.seconds],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label} className="border border-white/10 bg-white/[0.04] py-3 text-center">
                      <span className="block font-['Cinzel_Decorative'] text-2xl tabular-nums text-white sm:text-3xl">
                        {String(value).padStart(2, '0')}
                      </span>
                      <span className="font-['Roboto_Mono'] text-[10px] uppercase tracking-[0.2em] text-white/45">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.a
                  href={TICKETS_URL}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-[#ff1744] to-[#f50057] px-7 py-4 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.15em] shadow-lg shadow-[#ff1744]/25"
                >
                  Tickets for {nextShow.city}
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
              </motion.aside>
            )}
          </div>
        </section>

        <section
          id="dates"
          aria-labelledby="dates-heading"
          className="deferred-section relative scroll-mt-24 overflow-hidden py-20 lg:py-28"
        >
          <div className="absolute inset-0">
            <img src={imgGothEyes} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#151a2e]/95 to-[#0a0e1a]" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,0,87,0.08),transparent_55%)]" />

          <div className="relative mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-12">
            <div className="mb-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="mb-4 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]">
                  {TOUR_NAME}
                </p>
                <h2 id="dates-heading" className="font-['Cinzel_Decorative'] text-4xl leading-tight sm:text-5xl">
                  <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">TOUR DATES</span>
                </h2>
              </div>

              <div role="tablist" aria-label="Show list" className="flex border border-white/10 bg-white/[0.03] p-1">
                {(['upcoming', 'past'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    role="tab"
                    aria-selected={view === option}
                    onClick={() => setView(option)}
                    className={`px-5 py-2.5 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                      view === option
                        ? 'bg-gradient-to-r from-[#ff1744] to-[#f50057] text-white'
                        : 'text-white/55 hover:text-white'
                    }`}
                  >
                    {option === 'upcoming' ? `Upcoming (${upcoming.length})` : `Past (${past.length})`}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {(['All', 'North America', 'UK & Europe'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={area === option}
                    onClick={() => setArea(option)}
                    className={`border px-4 py-2 font-['Roboto_Mono'] text-xs uppercase tracking-[0.15em] transition-colors ${
                      area === option
                        ? 'border-[#ff1744] bg-[#ff1744]/10 text-white'
                        : 'border-white/10 text-white/55 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <label className="relative block md:w-72">
                <span className="sr-only">Search by city or venue</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search city or venue"
                  className="w-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 font-['Roboto_Mono'] text-sm text-white outline-none backdrop-blur-xl transition-all placeholder:text-white/30 focus:border-[#ff1744] focus:bg-white/10"
                />
              </label>
            </div>

            {visibleShows.length === 0 ? (
              <div className="border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
                <p className="mb-6 font-['Roboto_Mono'] text-sm text-white/60">
                  No {view} shows match that search.
                </p>
                <a
                  href="#request"
                  className="inline-flex items-center gap-2 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.18em] text-[#ff1744] hover:text-white"
                >
                  Request your city <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ) : (
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {visibleShows.map((show, index) => {
                  const date = parseDate(show.date);
                  const status = statusLabels[show.status];
                  const isPast = view === 'past';
                  const soldOut = show.status === 'sold-out';
                  return (
                    <motion.li
                      key={`${show.date}-${show.city}`}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.04 }}
                      className="group relative grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-x-5 gap-y-4 py-6 transition-colors hover:bg-white/[0.025] sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:px-4 lg:grid-cols-[5.5rem_minmax(0,1fr)_auto]"
                    >
                      <span className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-gradient-to-b from-[#ff1744] to-[#f50057] transition-transform duration-300 group-hover:scale-y-100" />
                      <time dateTime={show.date} className="text-center">
                        <span className="block font-['Roboto_Mono'] text-[10px] uppercase tracking-[0.25em] text-[#ff1744]">
                          {date.toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                        <span className="block font-['Cinzel_Decorative'] text-4xl leading-none text-white">
                          {date.getDate()}
                        </span>
                        <span className="block font-['Roboto_Mono'] text-[10px] uppercase tracking-[0.2em] text-white/40">
                          {isPast ? date.getFullYear() : date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                      </time>

                      <div className="min-w-0">
                        <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-2">
                          <h3 className="font-['Cinzel_Decorative'] text-2xl text-white transition-colors group-hover:text-[#ff4f7b] sm:text-3xl">
                            {show.city}
                          </h3>
                          {!isPast && (
                            <span
                              className={`border px-2.5 py-1 font-['Roboto_Mono'] text-[10px] font-semibold uppercase tracking-[0.15em] ${status.className}`}
                            >
                              {status.label}
                            </span>
                          )}
                        </div>
                        <p className="flex flex-wrap items-center gap-x-2 font-['Roboto_Mono'] text-sm text-white/60">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-white/35" />
                          {show.venue}
                          <span className="text-white/25">·</span>
                          {show.region ? `${show.region}, ${show.country}` : show.country}
                        </p>
                        {!isPast && (
                          <p className="mt-1 font-['Roboto_Mono'] text-xs text-white/40">
                            Doors {show.doors} · with Special Guests
                          </p>
                        )}
                      </div>

                      <div className="col-span-2 flex flex-wrap gap-2 sm:col-start-2 lg:col-span-1 lg:col-start-3 lg:justify-end">
                        {isPast ? (
                          <span className="font-['Roboto_Mono'] text-xs uppercase tracking-[0.18em] text-white/40">
                            Played {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                        ) : (
                          <>
                            {soldOut ? (
                              <span className="inline-flex min-w-32 items-center justify-center border border-white/10 px-5 py-3 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                                Sold Out
                              </span>
                            ) : (
                              <a
                                href={TICKETS_URL}
                                aria-label={`${show.status === 'presale' ? 'Join presale' : 'Get tickets'} for ${show.city}, ${show.venue}`}
                                className="inline-flex min-w-32 items-center justify-center gap-2 bg-gradient-to-r from-[#ff1744] to-[#f50057] px-5 py-3 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg shadow-[#ff1744]/20 transition-transform hover:-translate-y-0.5"
                              >
                                <Ticket className="h-3.5 w-3.5" />
                                {show.status === 'presale' ? 'Presale' : 'Tickets'}
                              </a>
                            )}
                            {!soldOut && (
                              <a
                                href="#vip"
                                aria-label={`VIP packages for ${show.city}`}
                                className="inline-flex items-center justify-center gap-2 border border-white/15 px-4 py-3 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.15em] text-white/75 transition-colors hover:border-[#ff1744] hover:text-white"
                              >
                                <Crown className="h-3.5 w-3.5" />
                                VIP
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => downloadCalendarEvent(show)}
                              aria-label={`Add ${show.city} on ${show.date} to calendar`}
                              title="Add to calendar"
                              className="inline-flex h-[42px] w-[42px] items-center justify-center border border-white/15 text-white/60 transition-colors hover:border-[#ff1744] hover:text-white"
                            >
                              <CalendarPlus className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            )}

            <p className="mt-8 font-['Roboto_Mono'] text-xs leading-relaxed text-white/40">
              All times local. Special guests to be announced. Buy only through the official links on this page.
            </p>
          </div>
        </section>

        <section
          id="vip"
          aria-labelledby="vip-heading"
          className="deferred-section relative scroll-mt-24 overflow-hidden py-20 lg:py-28"
        >
          <div className="absolute inset-0">
            <img src={imgForest} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#1a0a1f]/90 to-[#0a0e1a]" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,23,68,0.12),transparent_60%)]" />

          <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mx-auto mb-14 max-w-3xl text-center"
            >
              <motion.p
                variants={fadeInUp}
                className="mb-4 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]"
              >
                Upgrade Your Night
              </motion.p>
              <motion.h2
                id="vip-heading"
                variants={fadeInUp}
                className="mb-6 font-['Cinzel_Decorative'] text-4xl leading-tight sm:text-5xl"
              >
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">VIP EXPERIENCES</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="font-['Roboto_Mono'] text-base leading-relaxed text-white/60">
                Get closer to the darkness. Every package is available on each date while supplies last.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,19rem),1fr))] gap-6">
              {vipPackages.map((pkg, index) => (
                <motion.article
                  key={pkg.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.65, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`group relative flex flex-col overflow-hidden border p-8 shadow-2xl backdrop-blur-xl transition-colors duration-300 sm:p-10 ${
                    pkg.featured
                      ? 'border-[#ff1744]/50 bg-[#ff1744]/[0.07] shadow-[#ff1744]/15'
                      : 'border-white/10 bg-white/[0.035] hover:border-white/20'
                  }`}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff1744] to-[#f50057] ${
                      pkg.featured ? '' : 'origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100'
                    }`}
                  />
                  {pkg.featured && (
                    <span className="absolute right-6 top-6 bg-gradient-to-r from-[#ff1744] to-[#f50057] px-3 py-1 font-['Roboto_Mono'] text-[10px] font-semibold uppercase tracking-[0.2em]">
                      Most Popular
                    </span>
                  )}
                  <p className="mb-2 font-['Roboto_Mono'] text-[10px] uppercase tracking-[0.25em] text-white/45">
                    {pkg.tagline}
                  </p>
                  <h3 className="mb-6 font-['Cinzel_Decorative'] text-3xl">
                    <span className="bg-gradient-to-r from-[#ff1744] to-[#f50057] bg-clip-text text-transparent">
                      {pkg.name}
                    </span>
                  </h3>
                  <p className="mb-8 font-['Cinzel_Decorative'] text-5xl text-white">
                    {pkg.price}
                    <span className="ml-2 font-['Roboto_Mono'] text-xs uppercase tracking-[0.15em] text-white/40">
                      + fees
                    </span>
                  </p>
                  <ul className="mb-10 space-y-3 font-['Roboto_Mono'] text-sm text-white/70">
                    {pkg.perks.map((perk) => (
                      <li key={perk} className="flex gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#ff1744]" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={TICKETS_URL}
                    className={`mt-auto inline-flex items-center justify-center gap-2 px-7 py-4 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                      pkg.featured
                        ? 'bg-gradient-to-r from-[#ff1744] to-[#f50057] text-white shadow-lg shadow-[#ff1744]/25'
                        : 'border border-white/20 text-white/85 hover:border-[#ff1744] hover:text-white'
                    }`}
                  >
                    Choose {pkg.name}
                  </a>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="deferred-section relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 bg-[#0a0e1a]" />
          <div className="relative mx-auto grid max-w-[1400px] gap-6 px-6 sm:px-8 lg:grid-cols-2 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden border border-white/10 p-8 sm:p-10"
            >
              <img
                src={storyAsset('woman-in-white.webp')}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/70 to-[#0a0e1a]/10" />
              <div className="relative">
                <p className="mb-3 flex items-center gap-2 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]">
                  <Shirt className="h-4 w-4" />
                  Tour Merch
                </p>
                <h2 className="mb-4 font-['Cinzel_Decorative'] text-3xl leading-tight sm:text-4xl">
                  Wear the Shadows
                </h2>
                <p className="mb-8 max-w-md font-['Roboto_Mono'] text-sm leading-relaxed text-white/65">
                  Tour-exclusive tees, posters and the limited red vinyl. Available at every show and online
                  while it lasts.
                </p>
                <motion.a
                  href={withBase('/merch')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#ff1744] to-[#f50057] px-7 py-4 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.15em] shadow-lg shadow-[#ff1744]/25"
                >
                  Shop Merch <ArrowRight className="h-4 w-4" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              id="request"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative flex min-h-[420px] scroll-mt-24 flex-col justify-end overflow-hidden border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl sm:p-10"
            >
              <img
                src={storyAsset('paint-drip.webp')}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/80 to-[#0a0e1a]/40" />
              <div className="relative">
                <p className="mb-3 flex items-center gap-2 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]">
                  <MapPin className="h-4 w-4" />
                  Not on the Map?
                </p>
                <h2 className="mb-4 font-['Cinzel_Decorative'] text-3xl leading-tight sm:text-4xl">
                  Bring Us to Your City
                </h2>
                <p className="mb-8 max-w-md font-['Roboto_Mono'] text-sm leading-relaxed text-white/65">
                  New dates are added as the tour grows. Tell us where the shadows should fall next.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label className="sr-only" htmlFor="request-city">
                    Your city
                  </label>
                  <input
                    id="request-city"
                    type="text"
                    value={requestCity}
                    onChange={(event) => setRequestCity(event.target.value)}
                    placeholder="Your city"
                    className="min-w-0 flex-1 border border-white/10 bg-white/5 px-5 py-4 font-['Roboto_Mono'] text-sm text-white outline-none backdrop-blur-xl transition-all placeholder:text-white/30 focus:border-[#ff1744] focus:bg-white/10"
                  />
                  <a
                    href={requestHref}
                    className="inline-flex items-center justify-center gap-2 border border-white/20 px-7 py-4 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.15em] text-white/85 transition-colors hover:border-[#ff1744] hover:text-white"
                  >
                    Send Request
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="deferred-section relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] to-[#151a2e]" />
          <div className="relative mx-auto grid max-w-[1200px] gap-12 px-6 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-12">
            <div>
              <p className="mb-4 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]">
                Know Before You Go
              </p>
              <h2 id="faq-heading" className="mb-6 font-['Cinzel_Decorative'] text-4xl leading-tight sm:text-5xl">
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">TOUR FAQ</span>
              </h2>
              <p className="mb-8 font-['Roboto_Mono'] text-sm leading-relaxed text-white/55">
                Still have questions about tickets, VIP or a specific show? Reach the team directly.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.18em] text-[#ff1744] transition-colors hover:text-white"
              >
                {CONTACT_EMAIL} <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {faqs.map((faq) => (
                <details key={faq.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-['Roboto_Mono'] text-sm font-semibold text-white/85 transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <ChevronDown className="h-4 w-4 shrink-0 text-[#ff1744] transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="pb-6 pr-10 font-['Roboto_Mono'] text-sm leading-relaxed text-white/55">{faq.a}</p>
                </details>
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
                Prep for the Show
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
            <img src={imgHallway} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/95 to-[#1a0a1f]/95" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,23,68,0.1),transparent_70%)]" />

          <div className="relative mx-auto max-w-[900px] px-6 text-center sm:px-8 lg:px-12">
            <p className="mb-4 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]">
              Presale Access
            </p>
            <h2 className="mb-6 font-['Cinzel_Decorative'] text-4xl leading-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                JOIN THE SHADOWS
              </span>
            </h2>
            <p className="mx-auto mb-10 max-w-2xl font-['Roboto_Mono'] text-base leading-relaxed text-white/60 sm:text-lg">
              Be first in line. Subscribers get presale codes before tickets go on general sale, plus new dates
              the moment they’re announced.
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
                Get Presale
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
