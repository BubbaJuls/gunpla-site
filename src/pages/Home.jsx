import React from 'react'

const featuredGunplas = [
  { name: 'Strike Freedom', price: '₱2,800', image: '/images/product1.png' },
  { name: 'OO Qant', price: '₱2,600', image: '/images/product2.png' },
  { name: 'Wing Zero Custom EW', price: '₱2,700', image: '/images/product3.png' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white text-center py-32">
        <div className="absolute inset-0">
          <img
            src="/images/hero.webp"
            alt="Gunpla showcase"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
              Build. Collect. Display.
            </span>
          </h2>
          <p className="mb-8 text-lg text-gray-200">
            Find authentic Bandai Gunpla kits for all grades — HG, RG, MG, and PG.
          </p>
          <a
            href="/catalog"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition"
          >
            Browse Kits
          </a>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h3 className="text-4xl font-bold text-center mb-12">Featured Gunplas</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {featuredGunplas.map((kit, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 overflow-hidden"
            >
              <img
                src={kit.image}
                alt={kit.name}
                className="w-full h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
              <div className="p-4 text-center">
                <h4 className="text-xl font-semibold text-gray-800 truncate">{kit.name}</h4>
                <p className="text-blue-600 font-bold mt-2">{kit.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
