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

            <div className="flex items-center space-x-4">
                {/* social icons */}
                <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-gray-600 hover:text-blue-600 transition"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <title>Facebook</title>
                        <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.4c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.1h-1.07c-1.05 0-1.38.66-1.38 1.34v1.6h2.35l-.38 2.9h-1.97v7A10 10 0 0022 12z" />
                    </svg>
                </a>

                <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-gray-600 hover:text-pink-500 transition"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <title>Instagram</title>
                        <rect x="3" y="3" width="18" height="18" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                        <path d="M17.5 6.5h.01"></path>
                    </svg>
                </a>

                <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                    className="text-gray-600 hover:text-sky-500 transition"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <title>X</title>
                        <path d="M21.6 7.2c.2-.6-.1-1.3-.7-1.5-.6-.2-1.3.1-1.5.7L15.8 18.2c-.2.6.1 1.3.7 1.5.1.1.3.1.4.1.5 0 1-.3 1.2-.8l4.6-12zM2.4 16.8c-.2.6.1 1.3.7 1.5.2.1.4.1.6.1.4 0 .8-.2 1-.6L8.6 6.8c.2-.6-.1-1.3-.7-1.5-.6-.2-1.3.1-1.5.7L2.4 16.8zM17.9 3.6c-.6-.2-1.3.1-1.5.7L11.9 14.2c-.2.6.1 1.3.7 1.5.1.1.2.1.4.1.5 0 1-.3 1.2-.8l4.6-12c.2-.6-.1-1.3-.7-1.5z" />
                    </svg>
                </a>
            </div>
        </header>
    )
}
