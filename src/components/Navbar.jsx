import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  
  const linkClasses = (path) =>
    `hover:text-blue-600 transition font-medium ${location.pathname === path ? 'text-blue-600 underline' : ''}`

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-600 flex items-center">
        <img src="/images/logo.png" alt="Logo" className="w-10 mr-2"/> Gunpla Hobby PH
      </h1>
      <nav className="space-x-6">
        <Link to="/" className={linkClasses('/')}>Home</Link>
        <Link to="/catalog" className={linkClasses('/catalog')}>Catalog</Link>
        <Link to="/about" className={linkClasses('/about')}>About</Link>
        <Link to="/contact" className={linkClasses('/contact')}>Contact</Link>
      </nav>
    </header>
  )
}
