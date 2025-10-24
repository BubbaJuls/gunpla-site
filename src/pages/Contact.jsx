import React from 'react'

export default function Contact() {
  return (
    <section className="py-20 px-6 max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10">Contact Us</h2>
      <form className="bg-white shadow-md rounded-2xl p-8 space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Name</label>
          <input type="text" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-600" placeholder="Your Name" />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input type="email" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-600" placeholder="Your Email" />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-600" rows="4" placeholder="Your Message"></textarea>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition w-full">
          Send Message
        </button>
      </form>
    </section>
  )
}
