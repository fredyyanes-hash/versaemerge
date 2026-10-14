import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { withBase } from '../basePath';
import {
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  Minus,
  Plus,
  RotateCcw,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  Twitter,
  X,
  Youtube,
} from 'lucide-react';
import imgForest from '../../imports/Home/c9d25a6bcc8d0db405bb265444afc8874b72f490.png';
import imgIconLogo from '../../imports/versaemerge-icon-logo.png';

const merchAsset = (name: string) => withBase(`/assets/versaemerge-merch/${name}`);

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

type Category = 'Apparel' | 'Headwear';

type Variant = {
  color: string;
  swatch: string;
  image: string;
  imageSm: string;
  width: number;
  smWidth: number;
  focus: string;
};

type Product = {
  id: string;
  name: string;
  tagline: string;
  category: Category;
  // Placeholder prices until the real store is connected.
  price: number;
  badge?: string;
  description: string;
  details: string[];
  sizes: string[];
  variants: Variant[];
};

const products: Product[] = [
  {
    id: 'halo-wings-hoodie',
    name: 'Halo Wings Hoodie',
    tagline: 'Heavyweight pullover · Bone white',
    category: 'Apparel',
    price: 65,
    badge: 'New',
    description:
      'An oversized pullover hoodie with the crimson Halo Wings crest printed across the chest. Brushed fleece inside, dropped shoulders and a deep kangaroo pocket.',
    details: ['80% cotton, 20% polyester fleece', 'Oversized, dropped-shoulder fit', 'Screen-printed crest', 'Ribbed cuffs and hem'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      {
        color: 'Bone White',
        swatch: '#f1efe9',
        image: 'hoodie-1000.webp',
        imageSm: 'hoodie-560.webp',
        width: 832,
        smWidth: 560,
        focus: '50% 35%',
      },
    ],
  },
  {
    id: 'fixed-at-zero-tee',
    name: 'Fixed at Zero Vulture Tee',
    tagline: 'Album artwork tee · 2 colors',
    category: 'Apparel',
    price: 30,
    badge: 'Fan Favorite',
    description:
      'The vulture from the Fixed at Zero album cover, reproduced in full color on a soft classic-fit tee. Available in white, or black with the artwork framed on a pale panel.',
    details: ['100% combed ring-spun cotton', 'Classic unisex fit', 'Full-color front print', 'Pre-shrunk'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      {
        color: 'White',
        swatch: '#ffffff',
        image: 'tee-white-1000.webp',
        imageSm: 'tee-white-560.webp',
        width: 960,
        smWidth: 560,
        focus: '50% 45%',
      },
      {
        color: 'Black',
        swatch: '#111111',
        image: 'tee-black-1000.webp',
        imageSm: 'tee-black-560.webp',
        width: 960,
        smWidth: 560,
        focus: '50% 45%',
      },
    ],
  },
  {
    id: 'halo-wings-trucker',
    name: 'Halo Wings Trucker Hat',
    tagline: 'Foam-front trucker · Black / White',
    category: 'Headwear',
    price: 28,
    badge: 'Limited',
    description:
      'A classic foam-front trucker with the Halo Wings crest in crimson, a black curved brim and breathable mesh back panels.',
    details: ['Foam front, mesh back', 'Curved black brim', 'Snapback closure', 'Printed crest'],
    sizes: ['One Size'],
    variants: [
      {
        color: 'Black / White',
        swatch: 'linear-gradient(135deg,#ffffff 50%,#111111 50%)',
        image: 'hat-1000.webp',
        imageSm: 'hat-560.webp',
        width: 1000,
        smWidth: 560,
        focus: '50% 25%',
      },
    ],
  },
];

const filters: Array<'All' | Category> = ['All', 'Apparel', 'Headwear'];

const sizeGuide = [
  { size: 'XS', chest: '34–36', length: '26' },
  { size: 'S', chest: '36–38', length: '27' },
  { size: 'M', chest: '39–41', length: '28' },
  { size: 'L', chest: '42–44', length: '29' },
  { size: 'XL', chest: '45–47', length: '30' },
  { size: 'XXL', chest: '48–50', length: '31' },
];

const perks = [
  { icon: Truck, title: 'Shipping', text: 'Rates and regions will be confirmed when the store opens.' },
  { icon: RotateCcw, title: 'Returns', text: 'Unworn items in original condition, policy to be announced.' },
  { icon: ShieldCheck, title: 'Official Merch', text: 'Designed for VersaEmerge and the Paint It Black era.' },
];

type CartLine = { key: string; productId: string; variant: number; size: string; qty: number };

const money = (value: number) => `$${value.toFixed(2)}`;

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
};

function ProductImage({ variant, alt, sizes, eager }: { variant: Variant; alt: string; sizes: string; eager?: boolean }) {
  return (
    <img
      src={merchAsset(variant.image)}
      srcSet={`${merchAsset(variant.imageSm)} ${variant.smWidth}w, ${merchAsset(variant.image)} ${variant.width}w`}
      sizes={sizes}
      alt={alt}
      loading={eager ? undefined : 'lazy'}
      decoding="async"
      style={{ objectPosition: variant.focus }}
      className="h-full w-full object-cover"
    />
  );
}

export default function VersaEmergeMerch() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const [cardVariant, setCardVariant] = useState<Record<string, number>>({});
  const [quickView, setQuickView] = useState<{ product: Product; variant: number } | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock page scroll and close overlays with Escape while one is open.
  const overlayOpen = quickView !== null || cartOpen;
  useEffect(() => {
    if (!overlayOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setQuickView(null);
        setCartOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [overlayOpen]);

  const visibleProducts = useMemo(
    () => products.filter((product) => filter === 'All' || product.category === filter),
    [filter],
  );

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = cart.reduce((sum, line) => {
    const product = products.find((p) => p.id === line.productId);
    return sum + (product ? product.price * line.qty : 0);
  }, 0);

  const openQuickView = (product: Product, variant = cardVariant[product.id] ?? 0) => {
    setQuickView({ product, variant });
    setSelectedSize(product.sizes.length === 1 ? product.sizes[0] : null);
    setQuantity(1);
    setSizeError(false);
  };

  const addToCart = () => {
    if (!quickView) return;
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    const { product, variant } = quickView;
    const key = `${product.id}:${variant}:${selectedSize}`;
    setCart((lines) => {
      const existing = lines.find((line) => line.key === key);
      if (existing) {
        return lines.map((line) => (line.key === key ? { ...line, qty: Math.min(line.qty + quantity, 10) } : line));
      }
      return [...lines, { key, productId: product.id, variant, size: selectedSize, qty: quantity }];
    });
    setQuickView(null);
    setCartOpen(true);
  };

  const updateQty = (key: string, delta: number) =>
    setCart((lines) =>
      lines
        .map((line) => (line.key === key ? { ...line, qty: Math.min(line.qty + delta, 10) } : line))
        .filter((line) => line.qty > 0),
    );

  const cartButton = (
    <button
      type="button"
      onClick={() => setCartOpen(true)}
      className="relative flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 bg-[#0a0e1a]/60 text-white/80 backdrop-blur-xl transition-colors hover:border-[#ff1744] hover:text-white"
      aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
    >
      <ShoppingBag className="h-5 w-5" />
      {cartCount > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff1744] px-1 font-['Roboto_Mono'] text-[10px] font-semibold text-white">
          {cartCount}
        </span>
      )}
    </button>
  );

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
                aria-current={link.label === 'Merch' ? 'page' : undefined}
                className={`group relative font-['Roboto_Mono'] text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                  link.label === 'Merch' ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-[#ff1744] to-[#f50057] transition-all duration-300 ${
                    link.label === 'Merch' ? 'w-full' : 'w-0 group-hover:w-full'
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

            {cartButton}
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            {cartButton}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 bg-[#0a0e1a]/60 backdrop-blur-xl"
              aria-expanded={mobileMenuOpen}
              aria-controls="merch-mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <motion.div
            id="merch-mobile-navigation"
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
                    link.label === 'Merch' ? 'text-[#ff1744]' : 'text-white/75'
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
        {/* Hero: featured drop */}
        <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:px-8 sm:pt-40 lg:px-12 lg:pb-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(255,23,68,0.18),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_80%,rgba(245,0,87,0.1),transparent_45%)]" />

          <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
            <motion.div initial="initial" animate="animate" variants={staggerContainer}>
              <motion.p
                variants={fadeInUp}
                className="mb-5 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]"
              >
                Official Store · The Halo Wings Drop
              </motion.p>
              <motion.h1
                variants={fadeInUp}
                className="mb-7 font-['Cinzel_Decorative'] text-5xl leading-tight sm:text-6xl lg:text-7xl"
              >
                <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                  WEAR THE DARKNESS
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mb-8 max-w-xl font-['Roboto_Mono'] text-base leading-relaxed text-white/65 sm:text-lg"
              >
                The crimson Halo Wings crest and the Fixed at Zero vulture, on pieces made to be worn from the pit to
                the street. Small runs, gothic details, no compromises.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#shop"
                  className="inline-block bg-gradient-to-r from-[#ff1744] to-[#f50057] px-8 py-4 text-center font-['Roboto_Mono'] text-sm font-semibold uppercase tracking-[0.15em] shadow-lg shadow-[#ff1744]/30 transition-transform hover:-translate-y-0.5"
                >
                  Shop the Collection
                </a>
                <button
                  type="button"
                  onClick={() => openQuickView(products[0])}
                  className="border border-white/20 px-8 py-4 font-['Roboto_Mono'] text-sm font-semibold uppercase tracking-[0.15em] text-white/85 transition-colors hover:border-[#ff1744] hover:text-white"
                >
                  View the Hoodie
                </button>
              </motion.div>
              <motion.p
                variants={fadeInUp}
                className="mt-8 inline-flex items-center gap-3 border border-[#ff1744]/30 bg-[#ff1744]/5 px-4 py-3 font-['Roboto_Mono'] text-xs leading-relaxed text-white/70"
              >
                <span className="h-2 w-2 shrink-0 rotate-45 bg-[#ff1744]" />
                Store preview: prices are placeholders and checkout is not open yet.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-4"
            >
              <div className="relative row-span-2 aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-white/10">
                <ProductImage
                  variant={products[0].variants[0]}
                  alt="Model wearing the white Halo Wings Hoodie"
                  sizes="(min-width: 1024px) 25vw, 55vw"
                  eager
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 bg-[#ff1744] px-3 py-1.5 font-['Roboto_Mono'] text-[10px] font-semibold uppercase tracking-[0.2em]">
                  New
                </span>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-white/10">
                <ProductImage
                  variant={products[2].variants[0]}
                  alt="Model wearing the Halo Wings Trucker Hat"
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  eager
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-white ring-1 ring-white/10">
                <ProductImage
                  variant={products[1].variants[1]}
                  alt="Black Fixed at Zero Vulture Tee"
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  eager
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Product grid */}
        <section id="shop" aria-labelledby="shop-heading" className="relative scroll-mt-24 py-16 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#11152a] to-[#0a0e1a]" />
          <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:mb-14">
              <div>
                <p className="mb-3 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]">
                  The Collection
                </p>
                <h2
                  id="shop-heading"
                  className="font-['Cinzel_Decorative'] text-4xl leading-tight sm:text-5xl"
                >
                  <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    SHOP ALL
                  </span>
                </h2>
              </div>
              <div role="group" aria-label="Filter products" className="flex flex-wrap gap-2">
                {filters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    aria-pressed={filter === item}
                    className={`border px-5 py-2.5 font-['Roboto_Mono'] text-xs uppercase tracking-[0.18em] transition-colors ${
                      filter === item
                        ? 'border-[#ff1744] bg-[#ff1744]/15 text-white'
                        : 'border-white/15 text-white/60 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              <AnimatePresence mode="popLayout">
                {visibleProducts.map((product) => {
                  const variantIndex = cardVariant[product.id] ?? 0;
                  const variant = product.variants[variantIndex];
                  return (
                    <motion.li
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4 }}
                      className="group flex flex-col"
                    >
                      <button
                        type="button"
                        onClick={() => openQuickView(product)}
                        className="relative mb-5 block aspect-[4/5] overflow-hidden rounded-2xl bg-white ring-1 ring-white/10"
                        aria-label={`Quick view ${product.name}, ${variant.color}`}
                      >
                        <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                          <ProductImage
                            variant={variant}
                            alt=""
                            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                          />
                        </div>
                        {product.badge && (
                          <span className="absolute left-4 top-4 bg-[#0a0e1a]/85 px-3 py-1.5 font-['Roboto_Mono'] text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                            {product.badge}
                          </span>
                        )}
                        <span className="absolute inset-x-4 bottom-4 translate-y-2 bg-gradient-to-r from-[#ff1744] to-[#f50057] py-3 text-center font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.18em] text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                          Quick View
                        </span>
                      </button>

                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="mb-1 font-['Cinzel_Decorative'] text-xl leading-snug">{product.name}</h3>
                          <p className="font-['Roboto_Mono'] text-xs uppercase tracking-[0.12em] text-white/45">
                            {product.tagline}
                          </p>
                        </div>
                        <p className="shrink-0 font-['Roboto_Mono'] text-lg text-white">{money(product.price)}</p>
                      </div>

                      {product.variants.length > 1 && (
                        <div className="mt-4 flex items-center gap-3">
                          {product.variants.map((v, i) => (
                            <button
                              key={v.color}
                              type="button"
                              onClick={() => setCardVariant((current) => ({ ...current, [product.id]: i }))}
                              aria-label={`Show ${v.color}`}
                              aria-pressed={i === variantIndex}
                              className={`h-6 w-6 rounded-full ring-offset-2 ring-offset-[#0a0e1a] transition-shadow ${
                                i === variantIndex ? 'ring-2 ring-[#ff1744]' : 'ring-1 ring-white/30 hover:ring-white/70'
                              }`}
                              style={{ background: v.swatch }}
                            />
                          ))}
                          <span className="font-['Roboto_Mono'] text-xs text-white/50">{variant.color}</span>
                        </div>
                      )}
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </motion.ul>
          </div>
        </section>

        {/* Perks */}
        <section aria-label="Store information" className="deferred-section relative border-y border-white/5 py-12">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-6 sm:grid-cols-3 sm:px-8 lg:px-12">
            {perks.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#ff1744]/30 bg-[#ff1744]/5">
                  <Icon className="h-5 w-5 text-[#ff1744]" />
                </span>
                <div>
                  <h3 className="mb-1 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                    {title}
                  </h3>
                  <p className="font-['Roboto_Mono'] text-sm leading-relaxed text-white/55">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Size guide */}
        <section aria-labelledby="size-heading" className="deferred-section relative py-20 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,0,87,0.08),transparent_50%)]" />
          <div className="relative mx-auto grid max-w-[1200px] gap-12 px-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-20 lg:px-12">
            <div>
              <p className="mb-4 font-['Roboto_Mono'] text-xs font-semibold uppercase tracking-[0.3em] text-[#ff1744]">
                Find Your Fit
              </p>
              <h2 id="size-heading" className="mb-6 font-['Cinzel_Decorative'] text-4xl leading-tight sm:text-5xl">
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  SIZE GUIDE
                </span>
              </h2>
              <p className="mb-6 font-['Roboto_Mono'] text-sm leading-relaxed text-white/60">
                Measurements are body chest and garment length in inches. The Halo Wings Hoodie runs oversized, so size
                down for a closer fit. The trucker hat adjusts with a snapback.
              </p>
              <p className="flex items-center gap-3 font-['Roboto_Mono'] text-xs uppercase tracking-[0.15em] text-white/45">
                <Ruler className="h-4 w-4 text-[#ff1744]" />
                Measured flat, approximate
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <table className="w-full min-w-[22rem] text-left font-['Roboto_Mono'] text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-white/45">
                    <th scope="col" className="px-6 py-4 font-normal">Size</th>
                    <th scope="col" className="px-6 py-4 font-normal">Chest (in)</th>
                    <th scope="col" className="px-6 py-4 font-normal">Length (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeGuide.map((row) => (
                    <tr key={row.size} className="border-b border-white/5 last:border-b-0">
                      <th scope="row" className="px-6 py-4 font-semibold text-white">{row.size}</th>
                      <td className="px-6 py-4 text-white/70">{row.chest}</td>
                      <td className="px-6 py-4 text-white/70">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
              First in Line
            </p>
            <h2 className="mb-6 font-['Cinzel_Decorative'] text-4xl leading-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                GET DROP ALERTS
              </span>
            </h2>
            <p className="mx-auto mb-10 max-w-2xl font-['Roboto_Mono'] text-base leading-relaxed text-white/60 sm:text-lg">
              Hear first when the store opens, when limited pieces restock and when new designs land.
            </p>

            <form
              className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="sr-only" htmlFor="merch-email">
                Email address
              </label>
              <input
                id="merch-email"
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
                Notify Me
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

      {/* Quick view */}
      <AnimatePresence>
        {quickView && (
          <motion.div
            key="quick-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/75 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={() => setQuickView(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="quick-view-title"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
              className="relative grid max-h-[92vh] w-full max-w-5xl overflow-y-auto border border-white/10 bg-[#0d1122] shadow-[0_30px_80px_rgba(255,23,68,0.15)] md:grid-cols-2 md:overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setQuickView(null)}
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center bg-[#0a0e1a]/80 text-white/80 backdrop-blur transition-colors hover:text-white"
                aria-label="Close"
                autoFocus
              >
                <X className="h-5 w-5" />
              </button>

              <div className="aspect-square bg-white md:aspect-auto md:h-full md:max-h-[92vh]">
                <ProductImage
                  variant={quickView.product.variants[quickView.variant]}
                  alt={`${quickView.product.name} in ${quickView.product.variants[quickView.variant].color}`}
                  sizes="(min-width: 768px) 512px, 100vw"
                  eager
                />
              </div>

              <div className="flex flex-col p-6 sm:p-8 md:max-h-[92vh] md:overflow-y-auto">
                {quickView.product.badge && (
                  <p className="mb-3 font-['Roboto_Mono'] text-[11px] font-semibold uppercase tracking-[0.25em] text-[#ff1744]">
                    {quickView.product.badge}
                  </p>
                )}
                <h2 id="quick-view-title" className="mb-2 font-['Cinzel_Decorative'] text-3xl leading-tight">
                  {quickView.product.name}
                </h2>
                <p className="mb-5 font-['Roboto_Mono'] text-2xl text-white">{money(quickView.product.price)}</p>
                <p className="mb-6 font-['Roboto_Mono'] text-sm leading-relaxed text-white/65">
                  {quickView.product.description}
                </p>

                <fieldset className="mb-5">
                  <legend className="mb-3 font-['Roboto_Mono'] text-xs uppercase tracking-[0.2em] text-white/50">
                    Color: <span className="text-white">{quickView.product.variants[quickView.variant].color}</span>
                  </legend>
                  <div className="flex gap-3">
                    {quickView.product.variants.map((v, i) => (
                      <button
                        key={v.color}
                        type="button"
                        onClick={() => setQuickView({ ...quickView, variant: i })}
                        aria-label={v.color}
                        aria-pressed={i === quickView.variant}
                        className={`h-8 w-8 rounded-full ring-offset-2 ring-offset-[#0d1122] ${
                          i === quickView.variant ? 'ring-2 ring-[#ff1744]' : 'ring-1 ring-white/30 hover:ring-white/70'
                        }`}
                        style={{ background: v.swatch }}
                      />
                    ))}
                  </div>
                </fieldset>

                <fieldset className="mb-5">
                  <legend className="mb-3 font-['Roboto_Mono'] text-xs uppercase tracking-[0.2em] text-white/50">
                    Size
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {quickView.product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setSelectedSize(size);
                          setSizeError(false);
                        }}
                        aria-pressed={selectedSize === size}
                        className={`min-w-12 border px-4 py-2.5 font-['Roboto_Mono'] text-xs uppercase tracking-[0.12em] transition-colors ${
                          selectedSize === size
                            ? 'border-[#ff1744] bg-[#ff1744]/15 text-white'
                            : 'border-white/15 text-white/70 hover:border-white/40'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {sizeError && (
                    <p role="alert" className="mt-2 font-['Roboto_Mono'] text-xs text-[#ff5a7a]">
                      Choose a size first.
                    </p>
                  )}
                </fieldset>

                <div className="mb-6 flex items-center gap-4">
                  <span className="font-['Roboto_Mono'] text-xs uppercase tracking-[0.2em] text-white/50">Qty</span>
                  <div className="flex items-center border border-white/15">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="flex h-10 w-10 items-center justify-center text-white/70 hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-['Roboto_Mono'] text-sm" aria-live="polite">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      className="flex h-10 w-10 items-center justify-center text-white/70 hover:text-white"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addToCart}
                  className="mb-6 bg-gradient-to-r from-[#ff1744] to-[#f50057] py-4 font-['Roboto_Mono'] text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-lg shadow-[#ff1744]/30 transition-transform hover:-translate-y-0.5"
                >
                  Add to Cart · {money(quickView.product.price * quantity)}
                </button>

                <ul className="space-y-2 border-t border-white/10 pt-5 font-['Roboto_Mono'] text-xs text-white/55">
                  {quickView.product.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#ff1744]" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            key="cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          >
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-title"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              onClick={(event) => event.stopPropagation()}
              className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-white/10 bg-[#0d1122]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <h2 id="cart-title" className="font-['Cinzel_Decorative'] text-2xl">
                  Your Cart
                </h2>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="flex h-10 w-10 items-center justify-center text-white/70 hover:text-white"
                  aria-label="Close cart"
                  autoFocus
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                  <ShoppingBag className="h-10 w-10 text-white/25" />
                  <p className="font-['Roboto_Mono'] text-sm text-white/55">Your cart is empty.</p>
                  <button
                    type="button"
                    onClick={() => setCartOpen(false)}
                    className="border border-white/20 px-6 py-3 font-['Roboto_Mono'] text-xs uppercase tracking-[0.15em] text-white/80 hover:border-[#ff1744]"
                  >
                    Keep Shopping
                  </button>
                </div>
              ) : (
                <ul className="flex-1 divide-y divide-white/5 overflow-y-auto px-6">
                  {cart.map((line) => {
                    const product = products.find((p) => p.id === line.productId);
                    if (!product) return null;
                    const variant = product.variants[line.variant];
                    return (
                      <li key={line.key} className="flex gap-4 py-5">
                        <div className="h-24 w-20 shrink-0 overflow-hidden bg-white">
                          <ProductImage variant={variant} alt="" sizes="80px" />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex justify-between gap-3">
                            <p className="font-['Cinzel_Decorative'] text-base leading-snug">{product.name}</p>
                            <p className="shrink-0 font-['Roboto_Mono'] text-sm">{money(product.price * line.qty)}</p>
                          </div>
                          <p className="mb-3 font-['Roboto_Mono'] text-xs text-white/45">
                            {variant.color} · {line.size}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center border border-white/15">
                              <button
                                type="button"
                                onClick={() => updateQty(line.key, -1)}
                                className="flex h-8 w-8 items-center justify-center text-white/70 hover:text-white"
                                aria-label={`Decrease ${product.name} quantity`}
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-7 text-center font-['Roboto_Mono'] text-xs">{line.qty}</span>
                              <button
                                type="button"
                                onClick={() => updateQty(line.key, 1)}
                                className="flex h-8 w-8 items-center justify-center text-white/70 hover:text-white"
                                aria-label={`Increase ${product.name} quantity`}
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => updateQty(line.key, -line.qty)}
                              className="flex h-8 w-8 items-center justify-center text-white/40 hover:text-[#ff1744]"
                              aria-label={`Remove ${product.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              {cart.length > 0 && (
                <div className="border-t border-white/10 px-6 py-6">
                  <div className="mb-1 flex justify-between font-['Roboto_Mono'] text-sm">
                    <span className="text-white/60">Subtotal</span>
                    <span className="text-white">{money(subtotal)}</span>
                  </div>
                  <p className="mb-5 font-['Roboto_Mono'] text-xs text-white/40">Shipping and taxes calculated at checkout.</p>
                  <button
                    type="button"
                    disabled
                    className="w-full cursor-not-allowed bg-gradient-to-r from-[#ff1744] to-[#f50057] py-4 font-['Roboto_Mono'] text-sm font-semibold uppercase tracking-[0.15em] text-white opacity-50"
                  >
                    Checkout Opens Soon
                  </button>
                  <p className="mt-3 text-center font-['Roboto_Mono'] text-[11px] leading-relaxed text-white/45">
                    This is a store preview. Prices are placeholders and no orders can be placed yet.
                  </p>
                </div>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

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
