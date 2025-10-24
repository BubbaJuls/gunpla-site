import React from 'react'
import ProductCard from '../components/ProductCard'

const gunplaKits = [
  { name: 'Strike Freedom', grade: 'MG', price: '₱2,800', image: '/images/product1.png' },
  { name: 'OO Qant', grade: 'MG', price: '₱2,600', image: '/images/product2.png' },
  { name: 'Wing Zero Custom EW', grade: 'MG', price: '₱2,700', image: '/images/product3.png' },
  { name: 'Unicorn', grade: 'PG', price: '₱3,800', image: '/images/product4.png' },
  { name: 'RX 78 2', grade: 'HG', price: '₱1,200', image: '/images/product5.png' },
  { name: 'Build Strike Full Package', grade: 'RG', price: '₱2,100', image: '/images/product6.png' },
  { name: 'Zeta Gundam', grade: 'MG', price: '₱2,900', image: '/images/product7.png' },
  { name: 'Full Burnern', grade: 'RG', price: '₱2,300', image: '/images/product8.png' },
  { name: 'Sinanju', grade: 'MG', price: '₱3,000', image: '/images/product9.png' },
  { name: 'God Gundam', grade: 'HG', price: '₱1,500', image: '/images/product10.png' },
]

export default function Catalog() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">Gunpla Catalog</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {gunplaKits.map((kit, i) => (
          <ProductCard key={i} kit={kit} />
        ))}
      </div>
    </section>
  )
}
