var RES = 'resources/';
var IMG_PRODUCTS = RES + 'products/';
var IMG_CAROUSEL = RES + 'carousel/';
var IMG_BRAND = RES + 'brand/logo.png';
var IMG_SITE = RES + 'site/bg-ibo.jpg';
/** Local dev: MP4 in resources/videos. Production (Vercel): YouTube embed in hero-video.js */
var VIDEO_HERO_LOCAL = RES + 'videos/a-boy-with-gundam.mp4';
var VIDEO_HERO_YOUTUBE_ID = 'Zt62nsFLqA0';
var VIDEO_HERO_YOUTUBE_WATCH = 'https://www.youtube.com/watch?v=Zt62nsFLqA0';

var SITE_SALE_TITLE = 'Road to 50 Flash Sale';
var SITE_SALE_TAGLINE =
  'Countdown to the Mobile Suit Gundam 50th in 2029 — limited-time deals on HG, RG, MG & PG';

var HERO_SLIDES = [
  {
    id: 'neon-rx-78',
    image: IMG_CAROUSEL + 'neon-rx-78-2.png',
    alt: 'Neon wireframe illustration of the RX-78-2 Gundam',
    title: SITE_SALE_TITLE,
    subtitle: 'Flash deals on the original RX-78-2 — build toward the 50th in 2029',
    cta: { href: 'product.html#id=5', label: 'Shop RX-78-2' },
  },
  {
    id: 'neon-zeta',
    image: IMG_CAROUSEL + 'neon-zeta.png',
    alt: 'Neon wireframe illustration of the Zeta Gundam',
    title: 'Zeta Gundam · Road to 50',
    subtitle: 'Transformable engineering in RG, MG, and more',
    cta: { href: 'product.html#id=7', label: 'View RG Zeta' },
  },
  {
    id: 'neon-nu',
    image: IMG_CAROUSEL + 'neon-nu-gundam.png',
    alt: 'Neon wireframe illustration of the Nu Gundam',
    title: 'Nu Gundam Collection',
    subtitle: 'Fin funnel flair — HG and MG kits on sale',
    cta: { href: 'catalog.html?grade=HG', label: 'Shop HG' },
  },
  {
    id: 'neon-qant',
    image: IMG_CAROUSEL + 'neon-00-qant.png',
    alt: 'Neon wireframe illustration of the 00 Qan[T] Gundam',
    title: '00 Qan[T] · Trans-Am Ready',
    subtitle: 'Real Grade precision — Road to 50 flash pricing',
    cta: { href: 'product.html#id=2', label: 'View RG Qan[T]' },
  },
  {
    id: 'neon-mkii',
    image: IMG_CAROUSEL + 'neon-gundam-mk-ii.png',
    alt: 'Neon wireframe illustration of the Gundam Mk-II',
    title: 'Gundam Mk-II Highlights',
    subtitle: 'A Universal Century favorite — browse MG and HG builds',
    cta: { href: 'catalog.html?grade=MG', label: 'Shop MG' },
  },
  {
    id: 'neon-deathscythe',
    image: IMG_CAROUSEL + 'neon-deathscythe.png',
    alt: 'Neon wireframe illustration of the Gundam Deathscythe Hell',
    title: 'Wing Gundam Legacy',
    subtitle: 'Bold silhouettes across HG, MG, and PG',
    cta: { href: 'catalog.html', label: 'Browse All Kits' },
  },
];

function productModelImage(product) {
  return product.modelImage || product.image;
}

function productBoxImage(product) {
  return product.boxImage || product.modelImage || product.image;
}

var PRODUCTS = [
  {
    id: '1',
    slug: 'rg-strike-freedom',
    name: 'Strike Freedom',
    grade: 'RG',
    category: 'rg',
    price: 2400,
    originalPrice: 3000,
    salePercent: 20,
    modelImage: IMG_PRODUCTS + 'rg-strike-freedom-model.png',
    boxImage: IMG_PRODUCTS + 'rg-strike-freedom-box.jpg',
    image: IMG_PRODUCTS + 'rg-strike-freedom-model.png',
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
    originalPrice: 2800,
    salePercent: 20,
    modelImage: IMG_PRODUCTS + 'rg-oo-qant-model.png',
    boxImage: IMG_PRODUCTS + 'rg-oo-qant-box.jpg',
    image: IMG_PRODUCTS + 'rg-oo-qant-model.png',
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
    originalPrice: 3300,
    salePercent: 30,
    modelImage: IMG_PRODUCTS + 'rg-wing-zero-custom-model.png',
    boxImage: IMG_PRODUCTS + 'rg-wing-zero-custom-box.jpg',
    image: IMG_PRODUCTS + 'rg-wing-zero-custom-model.png',
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
    originalPrice: 3300,
    salePercent: 20,
    modelImage: IMG_PRODUCTS + 'rg-unicorn-model.jpg',
    boxImage: IMG_PRODUCTS + 'rg-unicorn-box.jpg',
    image: IMG_PRODUCTS + 'rg-unicorn-model.jpg',
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
    originalPrice: 3600,
    salePercent: 50,
    modelImage: IMG_PRODUCTS + 'rg-rx-78-2-model.jpg',
    boxImage: IMG_PRODUCTS + 'rg-rx-78-2-box.jpg',
    image: IMG_PRODUCTS + 'rg-rx-78-2-model.jpg',
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
    originalPrice: 2600,
    salePercent: 20,
    modelImage: IMG_PRODUCTS + 'rg-build-strike-model.jpg',
    image: IMG_PRODUCTS + 'rg-build-strike-model.jpg',
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
    originalPrice: 3600,
    salePercent: 30,
    modelImage: IMG_PRODUCTS + 'rg-zeta-gundam-model.jpg',
    boxImage: IMG_PRODUCTS + 'rg-zeta-gundam-box.jpg',
    image: IMG_PRODUCTS + 'rg-zeta-gundam-model.jpg',
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
    originalPrice: 2500,
    salePercent: 20,
    modelImage: IMG_PRODUCTS + 'rg-full-burnern-model.png',
    image: IMG_PRODUCTS + 'rg-full-burnern-model.png',
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
    originalPrice: 4500,
    salePercent: 40,
    modelImage: IMG_PRODUCTS + 'rg-sinanju-model.jpg',
    boxImage: IMG_PRODUCTS + 'rg-sinanju-box.jpg',
    image: IMG_PRODUCTS + 'rg-sinanju-model.jpg',
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
    originalPrice: 2700,
    salePercent: 30,
    modelImage: IMG_PRODUCTS + 'rg-god-gundam-model.jpg',
    boxImage: IMG_PRODUCTS + 'rg-god-gundam-box.jpg',
    image: IMG_PRODUCTS + 'rg-god-gundam-model.jpg',
    rating: 4.6,
    sold: 654,
    featured: false,
    description:
      'RG God Gundam from G Gundam. Fiery color scheme with bold presence—great for martial-arts poses and vibrant displays.',
  },
  {
    id: '11',
    slug: 'hg-rx-78-2-revive',
    name: 'RX-78-2 Gundam (Revive)',
    grade: 'HG',
    category: 'hg',
    price: 950,
    originalPrice: 1200,
    salePercent: 20,
    modelImage: IMG_PRODUCTS + 'hg-rx-78-2-revive-model.jpg',
    boxImage: IMG_PRODUCTS + 'hg-rx-78-2-revive-box.jpg',
    image: IMG_PRODUCTS + 'hg-rx-78-2-revive-model.jpg',
    rating: 4.7,
    sold: 1240,
    featured: true,
    description:
      'HGUC RX-78-2 Gundam Revive — modern proportions and crisp molding in a fast, beginner-friendly build. The definitive HG take on the original Gundam.',
  },
  {
    id: '12',
    slug: 'hg-barbatos',
    name: 'Gundam Barbatos',
    grade: 'HG',
    category: 'hg',
    price: 890,
    originalPrice: 1250,
    salePercent: 30,
    modelImage: IMG_PRODUCTS + 'hg-barbatos-model.jpg',
    boxImage: IMG_PRODUCTS + 'hg-barbatos-box.jpg',
    image: IMG_PRODUCTS + 'hg-barbatos-model.jpg',
    rating: 4.8,
    sold: 1580,
    featured: true,
    description:
      'HGI-BO Gundam Barbatos from Iron-Blooded Orphans. Rugged inner frame feel, great articulation, and iconic asymmetrical silhouette out of the box.',
  },
  {
    id: '13',
    slug: 'hg-unicorn-destroy',
    name: 'Unicorn Gundam (Destroy Mode)',
    grade: 'HG',
    category: 'hg',
    price: 1100,
    originalPrice: 1400,
    salePercent: 20,
    modelImage: IMG_PRODUCTS + 'hg-unicorn-destroy-model.jpg',
    boxImage: IMG_PRODUCTS + 'hg-unicorn-destroy-box.jpg',
    image: IMG_PRODUCTS + 'hg-unicorn-destroy-model.jpg',
    rating: 4.6,
    sold: 890,
    featured: false,
    description:
      'HGUC Unicorn Gundam in Destroy Mode with psycho-frame red parts. Transformation and solid UC presence without the MG price tag.',
  },
  {
    id: '14',
    slug: 'hg-freedom-revive',
    name: 'Freedom Gundam (Revive)',
    grade: 'HG',
    category: 'hg',
    price: 980,
    originalPrice: 1650,
    salePercent: 40,
    modelImage: IMG_PRODUCTS + 'hg-freedom-revive-model.jpg',
    boxImage: IMG_PRODUCTS + 'hg-freedom-revive-box.jpg',
    image: IMG_PRODUCTS + 'hg-freedom-revive-model.jpg',
    rating: 4.7,
    sold: 1020,
    featured: false,
    description:
      'HGCE Freedom Gundam Revive with updated proportions and beam rifle effects. Wings deploy for a dramatic shelf pose in SEED style.',
  },
  {
    id: '15',
    slug: 'hg-nu-gundam',
    name: 'Nu Gundam',
    grade: 'HG',
    category: 'hg',
    price: 1150,
    originalPrice: 1600,
    salePercent: 30,
    modelImage: IMG_PRODUCTS + 'hg-nu-gundam-model.jpg',
    boxImage: IMG_PRODUCTS + 'hg-nu-gundam-box.jpg',
    image: IMG_PRODUCTS + 'hg-nu-gundam-model.jpg',
    rating: 4.8,
    sold: 760,
    featured: true,
    description:
      'HGUC Nu Gundam with fin funnels and Amuro’s classic mobile suit lines. Excellent color separation and display presence for Char’s Counterattack fans.',
  },
  {
    id: '16',
    slug: 'hg-wing-zero',
    name: 'Wing Gundam Zero',
    grade: 'HG',
    category: 'hg',
    price: 900,
    originalPrice: 1150,
    salePercent: 20,
    modelImage: IMG_PRODUCTS + 'hg-wing-zero-model.jpg',
    boxImage: IMG_PRODUCTS + 'hg-wing-zero-box.jpg',
    image: IMG_PRODUCTS + 'hg-wing-zero-model.jpg',
    rating: 4.5,
    sold: 680,
    featured: false,
    description:
      'HGAC Wing Gundam Zero with twin buster rifle and large wing unit. A must-have for Endless Waltz collectors at 1/144 scale.',
  },
  {
    id: '17',
    slug: 'hg-zaku-ii',
    name: 'Zaku II',
    grade: 'HG',
    category: 'hg',
    price: 750,
    originalPrice: 1500,
    salePercent: 50,
    modelImage: IMG_PRODUCTS + 'hg-zaku-ii-model.jpg',
    boxImage: IMG_PRODUCTS + 'hg-zaku-ii-box.jpg',
    image: IMG_PRODUCTS + 'hg-zaku-ii-model.jpg',
    rating: 4.6,
    sold: 1410,
    featured: false,
    description:
      'HGUC Zaku II — the grunt suit everyone recognizes. Quick build, great for army painting, and pairs perfectly with any RX-78 display.',
  },
  {
    id: '18',
    slug: 'hg-aile-strike',
    name: 'Aile Strike Gundam',
    grade: 'HG',
    category: 'hg',
    price: 920,
    originalPrice: 1150,
    salePercent: 20,
    modelImage: IMG_PRODUCTS + 'hg-aile-strike-model.png',
    boxImage: IMG_PRODUCTS + 'hg-aile-strike-box.jpg',
    image: IMG_PRODUCTS + 'hg-aile-strike-model.png',
    rating: 4.6,
    sold: 940,
    featured: false,
    description:
      'HGCE Aile Strike Gundam with striker pack. Clean SEED styling, solid articulation, and the classic hero look for your 1/144 lineup.',
  },
  {
    id: '19',
    slug: 'hg-gquuuuuux',
    name: 'GQuuuuuuX',
    grade: 'HG',
    category: 'hg',
    price: 1050,
    originalPrice: 1500,
    salePercent: 30,
    modelImage: IMG_PRODUCTS + 'hg-gquuuuuux-model.jpg',
    boxImage: IMG_PRODUCTS + 'hg-gquuuuuux-box.jpg',
    image: IMG_PRODUCTS + 'hg-gquuuuuux-model.jpg',
    rating: 4.5,
    sold: 520,
    featured: false,
    description:
      'HG GQuuuuuuX from GQuuuuuuX — bold new-era design with striking color blocking. A fresh centerpiece for modern UC/GQuuuuuuX shelves.',
  },
  {
    id: '20',
    slug: 'hg-zaku-ii-johnny-ridden',
    name: 'Zaku II High Mobility (Johnny Ridden)',
    grade: 'HG',
    category: 'hg',
    price: 850,
    originalPrice: 1400,
    salePercent: 40,
    modelImage: IMG_PRODUCTS + 'hg-zaku-ii-johnny-ridden-model.jpg',
    boxImage: IMG_PRODUCTS + 'hg-zaku-ii-johnny-ridden-box.jpg',
    image: IMG_PRODUCTS + 'hg-zaku-ii-johnny-ridden-model.jpg',
    rating: 4.7,
    sold: 610,
    featured: false,
    description:
      'HGUC Johnny Ridden High Mobility Zaku II in iconic red. Extra thrusters and commander flair — perfect next to a white Gundam build.',
  },
  {
    id: '21',
    slug: 'mg-rx-78-2-ver-3',
    name: 'RX-78-2 Gundam Ver. 3.0',
    grade: 'MG',
    category: 'mg',
    price: 3200,
    originalPrice: 4000,
    salePercent: 20,
    modelImage: IMG_PRODUCTS + 'mg-rx-78-2-ver-3-model.jpg',
    boxImage: IMG_PRODUCTS + 'mg-rx-78-2-ver-3-box.jpg',
    image: IMG_PRODUCTS + 'mg-rx-78-2-ver-3-model.jpg',
    rating: 4.8,
    sold: 890,
    featured: true,
    description:
      'MG RX-78-2 Gundam Ver. 3.0 with refined proportions and color-coded runners. The benchmark MG for classic UC fans and serious builders.',
  },
  {
    id: '22',
    slug: 'mg-wing-zero-ew-verka',
    name: 'Wing Gundam Zero EW (Ver.Ka)',
    grade: 'MG',
    category: 'mg',
    price: 4500,
    originalPrice: 6400,
    salePercent: 30,
    modelImage: IMG_PRODUCTS + 'mg-wing-zero-ew-verka-model.jpg',
    boxImage: IMG_PRODUCTS + 'mg-wing-zero-ew-verka-box.jpg',
    image: IMG_PRODUCTS + 'mg-wing-zero-ew-verka-model.jpg',
    rating: 4.8,
    sold: 540,
    featured: true,
    description:
      'MG Wing Gundam Zero EW Ver.Ka with massive wing spread and Katoki detail. A showpiece MG that dominates any display shelf.',
  },
  {
    id: '23',
    slug: 'mg-freedom-2',
    name: 'Freedom Gundam Ver. 2.0',
    grade: 'MG',
    category: 'mg',
    price: 3800,
    originalPrice: 4800,
    salePercent: 20,
    modelImage: IMG_PRODUCTS + 'mg-freedom-2-model.jpg',
    boxImage: IMG_PRODUCTS + 'mg-freedom-2-box.jpg',
    image: IMG_PRODUCTS + 'mg-freedom-2-model.jpg',
    rating: 4.7,
    sold: 620,
    featured: false,
    description:
      'MG Freedom Gundam 2.0 with inner frame and updated SEED styling. Beam sabers, rifles, and wing binders for dynamic aerial poses.',
  },
  {
    id: '24',
    slug: 'mg-barbatos',
    name: 'Gundam Barbatos',
    grade: 'MG',
    category: 'mg',
    price: 4200,
    originalPrice: 7000,
    salePercent: 40,
    modelImage: IMG_PRODUCTS + 'mg-barbatos-model.jpg',
    boxImage: IMG_PRODUCTS + 'mg-barbatos-box.jpg',
    image: IMG_PRODUCTS + 'mg-barbatos-model.jpg',
    rating: 4.8,
    sold: 710,
    featured: false,
    description:
      'MG Gundam Barbatos with full inner frame and weathered IBO aesthetic. Hefty feel, excellent articulation, and mace included.',
  },
  {
    id: '25',
    slug: 'mg-strike-freedom',
    name: 'Strike Freedom Gundam',
    grade: 'MG',
    category: 'mg',
    price: 4800,
    originalPrice: 6900,
    salePercent: 30,
    modelImage: IMG_PRODUCTS + 'mg-strike-freedom-model.jpg',
    boxImage: IMG_PRODUCTS + 'mg-strike-freedom-box.jpg',
    image: IMG_PRODUCTS + 'mg-strike-freedom-model.jpg',
    rating: 4.7,
    sold: 480,
    featured: false,
    description:
      'MG Strike Freedom Gundam with dragoons and gold frame accents. High parts count and stunning finished presence for SEED Destiny fans.',
  },
  {
    id: '26',
    slug: 'mg-unicorn-ova',
    name: 'Unicorn Gundam (OVA)',
    grade: 'MG',
    category: 'mg',
    price: 5200,
    originalPrice: 6500,
    salePercent: 20,
    modelImage: IMG_PRODUCTS + 'mg-unicorn-ova-model.jpg',
    boxImage: IMG_PRODUCTS + 'mg-unicorn-ova-box.jpg',
    image: IMG_PRODUCTS + 'mg-unicorn-ova-model.jpg',
    rating: 4.8,
    sold: 390,
    featured: false,
    description:
      'MG Unicorn Gundam OVA version with transformation and psycho-frame. Premium engineering and UC flagship detail at 1/100 scale.',
  },
  {
    id: '27',
    slug: 'mg-zaku-ii-ver-2',
    name: 'Zaku II Ver. 2.0',
    grade: 'MG',
    category: 'mg',
    price: 3000,
    originalPrice: 6000,
    salePercent: 50,
    modelImage: IMG_PRODUCTS + 'mg-zaku-ii-ver-2-model.jpg',
    boxImage: IMG_PRODUCTS + 'mg-zaku-ii-ver-2-box.jpg',
    image: IMG_PRODUCTS + 'mg-zaku-ii-ver-2-model.jpg',
    rating: 4.6,
    sold: 820,
    featured: false,
    description:
      'MG Zaku II Ver. 2.0 — the grunt suit at Master Grade scale. Inner frame, mono-eye gimmick, and tons of pose options for Zeon displays.',
  },
  {
    id: '28',
    slug: 'mg-dynames',
    name: 'Gundam Dynames',
    grade: 'MG',
    category: 'mg',
    price: 3400,
    originalPrice: 4900,
    salePercent: 30,
    modelImage: IMG_PRODUCTS + 'mg-dynames-model.jpg',
    boxImage: IMG_PRODUCTS + 'mg-dynames-box.jpg',
    image: IMG_PRODUCTS + 'mg-dynames-model.jpg',
    rating: 4.7,
    sold: 450,
    featured: false,
    description:
      'MG Gundam Dynames with GN sniper rifle and shield. Lockon’s 00 unit — great for sniper poses and panel-lined 00 displays.',
  },
  {
    id: '29',
    slug: 'mg-exia',
    name: 'Gundam Exia',
    grade: 'MG',
    category: 'mg',
    price: 3600,
    originalPrice: 4500,
    salePercent: 20,
    modelImage: IMG_PRODUCTS + 'mg-exia-model.jpg',
    boxImage: IMG_PRODUCTS + 'mg-exia-box.jpg',
    image: IMG_PRODUCTS + 'mg-exia-model.jpg',
    rating: 4.7,
    sold: 510,
    featured: false,
    description:
      'MG Gundam Exia with GN sword and solid 00-era engineering. Sharp lines, clear green GN condensers, and satisfying inner frame build.',
  },
  {
    id: '30',
    slug: 'mg-sazabi-verka',
    name: 'Sazabi Ver.Ka',
    grade: 'MG',
    category: 'mg',
    price: 5500,
    originalPrice: 9000,
    salePercent: 40,
    modelImage: IMG_PRODUCTS + 'mg-sazabi-verka-model.jpg',
    boxImage: IMG_PRODUCTS + 'mg-sazabi-verka-box.jpg',
    image: IMG_PRODUCTS + 'mg-sazabi-verka-model.jpg',
    rating: 4.9,
    sold: 340,
    featured: true,
    description:
      'MG Sazabi Ver.Ka — Char’s flagship in massive 1/100 scale. Funnels, bulk, and Katoki detail make this a centerpiece MG build.',
  },
  {
    id: '31',
    slug: 'pg-unicorn',
    name: 'Unicorn Gundam',
    grade: 'PG',
    category: 'pg',
    price: 14500,
    originalPrice: 20500,
    salePercent: 30,
    modelImage: IMG_PRODUCTS + 'pg-unicorn-model.jpg',
    boxImage: IMG_PRODUCTS + 'pg-unicorn-box.jpg',
    image: IMG_PRODUCTS + 'pg-unicorn-model.jpg',
    rating: 4.9,
    sold: 120,
    featured: true,
    description:
      'PG Unicorn Gundam with LED-ready psycho-frame and full transformation. The ultimate UC display kit for collectors with shelf space.',
  },
  {
    id: '32',
    slug: 'pg-strike-freedom',
    name: 'Strike Freedom Gundam',
    grade: 'PG',
    category: 'pg',
    price: 16000,
    originalPrice: 20000,
    salePercent: 20,
    modelImage: IMG_PRODUCTS + 'pg-strike-freedom-model.jpg',
    boxImage: IMG_PRODUCTS + 'pg-strike-freedom-box.jpg',
    image: IMG_PRODUCTS + 'pg-strike-freedom-model.jpg',
    rating: 4.8,
    sold: 95,
    featured: false,
    description:
      'PG Strike Freedom Gundam with light-up options and massive wing spread. A premium SEED Destiny statement piece for serious collectors.',
  },
  {
    id: '33',
    slug: 'pg-rx-78-2',
    name: 'RX-78-2 Gundam',
    grade: 'PG',
    category: 'pg',
    price: 12500,
    originalPrice: 21000,
    salePercent: 40,
    modelImage: IMG_PRODUCTS + 'pg-rx-78-2-model.jpg',
    boxImage: IMG_PRODUCTS + 'pg-rx-78-2-box.jpg',
    image: IMG_PRODUCTS + 'pg-rx-78-2-model.jpg',
    rating: 4.8,
    sold: 140,
    featured: false,
    description:
      'PG RX-78-2 Gundam — the original hero at 1/60 scale. Core fighter gimmick, incredible size, and classic UC nostalgia in one box.',
  },
  {
    id: '34',
    slug: 'pg-wing-zero-custom',
    name: 'Wing Gundam Zero Custom',
    grade: 'PG',
    category: 'pg',
    price: 15000,
    originalPrice: 30000,
    salePercent: 50,
    modelImage: IMG_PRODUCTS + 'pg-wing-zero-custom-model.jpg',
    boxImage: IMG_PRODUCTS + 'pg-wing-zero-custom-box.jpg',
    image: IMG_PRODUCTS + 'pg-wing-zero-custom-model.jpg',
    rating: 4.8,
    sold: 88,
    featured: false,
    description:
      'PG Wing Gundam Zero Custom with enormous wings and twin buster rifle. An Endless Waltz legend that commands attention on any shelf.',
  },
  {
    id: '35',
    slug: 'pg-exia',
    name: 'Gundam Exia',
    grade: 'PG',
    category: 'pg',
    price: 13500,
    originalPrice: 19500,
    salePercent: 30,
    modelImage: IMG_PRODUCTS + 'pg-exia-model.jpg',
    boxImage: IMG_PRODUCTS + 'pg-exia-box.jpg',
    image: IMG_PRODUCTS + 'pg-exia-model.jpg',
    rating: 4.7,
    sold: 72,
    featured: false,
    description:
      'PG Gundam Exia with GN drive lighting and refined 00 proportions. A tall, sharp 1/60 build for 00 fans who want flagship detail.',
  },
];

var CATEGORIES = [
  { id: 'all', label: 'All Kits' },
  { id: 'rg', label: 'Real Grade', grade: 'RG' },
  { id: 'hg', label: 'High Grade', grade: 'HG' },
  { id: 'mg', label: 'Master Grade', grade: 'MG' },
  { id: 'pg', label: 'Perfect Grade', grade: 'PG' },
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
  if (price && typeof price === 'object') {
    var product = price;
    if (product.salePercent) return product.salePercent;
    price = product.price;
    original = product.originalPrice;
  }
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
