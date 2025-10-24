import React from 'react'

export default function ProductCard({ kit }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 overflow-hidden">
      <span className="absolute top-2 left-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
        {kit.grade}
      </span>
      <img
        src={kit.image}
        alt={kit.name}
        className="w-full h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
      />
      <div className="p-4 text-center">
        <h4 className="text-xl font-semibold text-gray-800 truncate">{kit.name}</h4>
        <p className="text-blue-600 font-bold mt-2">{kit.price}</p>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm transition">
          Add to Cart
        </button>
      </div>
    </div>
  )
}
