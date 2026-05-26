var IMG = 'public/images/';

var PRODUCTS = [
  {
    id: '1',
    slug: 'rg-strike-freedom',
    name: 'Strike Freedom',
    grade: 'RG',
    category: 'rg',
    price: 2400,
    originalPrice: 2800,
    image: IMG + 'rg-strike-freedom.png',
    rating: 4.6,
    sold: 512,
    featured: true,
    description:
      'RG Strike Freedom Gundam with dragoon wings and excellent articulation. Compact 1/144 scale with inner frame detail—ideal for SEED Destiny fans who want a striking shelf piece without the MG footprint.',
  },
  {
    id: '2',
    slug: 'rg-oo-qant',
    name: 'OO Qant',
    grade: 'RG',
    category: 'rg',
    price: 2200,
    originalPrice: 2500,
    image: IMG + 'rg-oo-qant.png',
    rating: 4.4,
    sold: 389,
    featured: true,
    description:
      'RG 00 Qan[T] from Gundam 00. Crisp white and green color scheme with GN sword bits. Strong panel-line potential and poseability for dynamic displays.',
  },
  {
    id: '3',
    slug: 'rg-wing-zero-custom',
    name: 'Wing Zero Custom EW',
    grade: 'RG',
    category: 'rg',
    price: 2300,
    originalPrice: 2600,
    image: IMG + 'rg-wing-zero-custom.png',
    rating: 4.6,
    sold: 445,
    featured: true,
    description:
      'RG Wing Zero Custom (EW) with massive wing spread in 1/144 scale. Includes twin buster rifle and refined proportions—stunning when panel lined and top-coated.',
  },
  {
    id: '4',
    slug: 'rg-unicorn',
    name: 'Unicorn Gundam',
    grade: 'RG',
    category: 'rg',
    price: 2600,
    originalPrice: 3000,
    image: IMG + 'rg-unicorn.png',
    rating: 4.8,
    sold: 198,
    featured: true,
    description:
      'RG Unicorn Gundam with transformation and psycho-frame parts. A flagship RG kit with incredible engineering—perfect for UC collectors.',
  },
  {
    id: '5',
    slug: 'rg-rx-78-2',
    name: 'RX-78-2',
    grade: 'RG',
    category: 'rg',
    price: 1800,
    originalPrice: 2100,
    image: IMG + 'rg-rx-78-2.png',
    rating: 4.6,
    sold: 892,
    featured: false,
    description:
      'RG RX-78-2 — the mobile suit that started it all, refined for modern builders. Great articulation and classic styling in a manageable build time.',
  },
  {
    id: '6',
    slug: 'rg-build-strike',
    name: 'Build Strike Full Package',
    grade: 'RG',
    category: 'rg',
    price: 2100,
    originalPrice: 2400,
    image: IMG + 'rg-build-strike.png',
    rating: 4.4,
    sold: 367,
    featured: false,
    description:
      'RG Build Strike Full Package with support gear. Realistic decals, advanced small-scale frame, and multiple weapon options included.',
  },
  {
    id: '7',
    slug: 'rg-zeta-gundam',
    name: 'Zeta Gundam',
    grade: 'RG',
    category: 'rg',
    price: 2500,
    originalPrice: 2900,
    image: IMG + 'rg-zeta-gundam.png',
    rating: 4.2,
    sold: 278,
    featured: false,
    description:
      'RG Zeta Gundam with transformation in 1/144 scale. A rewarding build for experienced modelers who love Zeta-era engineering.',
  },
  {
    id: '8',
    slug: 'rg-full-burnern',
    name: 'Full Burnern',
    grade: 'RG',
    category: 'rg',
    price: 2000,
    originalPrice: 2300,
    image: IMG + 'rg-full-burnern.png',
    rating: 4.6,
    sold: 301,
    featured: false,
    description:
      'RG Full Burnern from Build Fighters. Sleek design with excellent color separation and poseability for action poses.',
  },
  {
    id: '9',
    slug: 'rg-sinanju',
    name: 'Sinanju',
    grade: 'RG',
    category: 'rg',
    price: 2700,
    originalPrice: 3100,
    image: IMG + 'rg-sinanju.png',
    rating: 4.6,
    sold: 224,
    featured: false,
    description:
      'RG Sinanju with bold red and gold trim. Large shield, rifle, and imposing silhouette—premium UC aesthetic in Real Grade scale.',
  },
  {
    id: '10',
    slug: 'rg-god-gundam',
    name: 'God Gundam',
    grade: 'RG',
    category: 'rg',
    price: 1900,
    originalPrice: 2200,
    image: IMG + 'rg-god-gundam.png',
    rating: 4.6,
    sold: 654,
    featured: false,
    description:
      'RG God Gundam from G Gundam. Fiery color scheme with bold presence—great for martial-arts poses and vibrant displays.',
  },
];

var HERO_SLIDES = [
  {
    id: 'hero-1',
    image: IMG + 'carousel_1.webp',
    alt: 'Gunpla kits on display',
    title: 'Build. Collect. Display.',
    subtitle: 'Authentic Bandai Real Grade kits — HG, MG & PG coming soon',
    cta: { label: 'Shop Now', href: 'catalog.html' },
  },
  {
    id: 'hero-2',
    image: IMG + 'carousel_2.jpg',
    alt: 'Gunpla builder workspace',
    title: 'Real Grade Collection',
    subtitle: 'Precision engineering in 1/144 scale',
    cta: { label: 'Browse RG Kits', href: 'catalog.html?grade=RG' },
  },
  {
    id: 'hero-3',
    image: IMG + 'carousel_3.jpg',
    alt: 'Featured Gundam models',
    title: 'Weekly Highlights',
    subtitle: 'Hand-picked kits with the best value',
    cta: { label: 'View Deals', href: 'catalog.html' },
  },
  {
    id: 'hero-4',
    image: IMG + 'carousel_4.webp',
    alt: 'Gunpla hobby shop showcase',
    title: 'Start Your Next Build',
    subtitle: 'Free shipping on orders over ₱3,000',
    cta: { label: 'Shop All Kits', href: 'catalog.html' },
  },
  {
    id: 'hero-5',
    image: IMG + 'carousel_5.webp',
    alt: 'New arrivals at Gunpla Hobby PH',
    title: 'Fresh Arrivals',
    subtitle: 'Latest RG kits restocked and ready to ship',
    cta: { label: 'See New Kits', href: 'catalog.html' },
  },
  {
    id: 'hero-6',
    image: IMG + 'carousel_6.png',
    alt: 'Gunpla display collection',
    title: 'Collector\'s Picks',
    subtitle: 'Standout builds for your shelf or desk',
    cta: { label: 'Explore Catalog', href: 'catalog.html' },
  },
  {
    id: 'hero-7',
    image: IMG + 'carousel_7.jpg',
    alt: 'Gunpla building supplies',
    title: 'Everything for Your Build',
    subtitle: 'Tools, decals, and top kits in one shop',
    cta: { label: 'Shop Now', href: 'catalog.html' },
  },
];

var CATEGORIES = [
  { id: 'all', label: 'All Kits' },
  { id: 'rg', label: 'Real Grade', grade: 'RG' },
  { id: 'hg', label: 'High Grade', grade: 'HG', comingSoon: true },
  { id: 'mg', label: 'Master Grade', grade: 'MG', comingSoon: true },
  { id: 'pg', label: 'Perfect Grade', grade: 'PG', comingSoon: true },
];

function getProductById(id) {
  return PRODUCTS.find(function (p) {
    return p.id === id;
  });
}

function getProductBySlug(slug) {
  return PRODUCTS.find(function (p) {
    return p.slug === slug;
  });
}

function getFeaturedProducts() {
  return PRODUCTS.filter(function (p) {
    return p.featured;
  });
}

function formatPrice(amount) {
  return '₱' + amount.toLocaleString('en-PH');
}

function discountPercent(price, original) {
  if (!original || original <= price) return 0;
  return Math.round(((original - price) / original) * 100);
}

function renderStars(rating) {
  var full = Math.floor(rating);
  var half = rating - full >= 0.5;
  var html = '';
  for (var i = 0; i < 5; i++) {
    if (i < full) html += '<span class="star star--full">★</span>';
    else if (i === full && half) html += '<span class="star star--half">★</span>';
    else html += '<span class="star star--empty">★</span>';
  }
  return html;
}

function productDetailUrl(product) {
  return 'product.html#id=' + product.id;
}

function getProductIdFromLocation() {
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  if (id) return id;

  var hash = window.location.hash.replace(/^#/, '');
  if (hash) {
    if (hash.indexOf('id=') === 0) return hash.slice(3);
    if (hash.indexOf('slug=') === 0) {
      var bySlug = getProductBySlug(hash.slice(5));
      return bySlug ? bySlug.id : null;
    }
    if (getProductById(hash)) return hash;
    var match = getProductBySlug(hash);
    if (match) return match.id;
  }

  var parts = window.location.pathname.split('/').filter(Boolean);
  var idx = parts.indexOf('product');
  if (idx >= 0 && parts[idx + 1]) {
    var segment = decodeURIComponent(parts[idx + 1]).replace(/\.html$/i, '');
    if (/^\d+$/.test(segment)) return segment;
    var fromPath = getProductBySlug(segment);
    if (fromPath) return fromPath.id;
  }

  return null;
}

function getProductSlugFromLocation() {
  var params = new URLSearchParams(window.location.search);
  if (params.get('slug')) return params.get('slug');
  var hash = window.location.hash.replace(/^#/, '');
  if (!hash) return null;
  if (hash.indexOf('slug=') === 0) return hash.slice(5);
  if (hash.indexOf('id=') !== 0 && getProductBySlug(hash)) return hash;
  return null;
}
