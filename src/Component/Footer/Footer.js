"use client"
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">SwiftCart</h2>
          <p className="text-sm">
            Your one-stop shop for the best products at unbeatable prices. 
            We bring quality and value together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-yellow-400 transition">Home</Link></li>
            <li><Link href="/shop" className="hover:text-yellow-400 transition">Shop</Link></li>
            <li><Link href="/about" className="hover:text-yellow-400 transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-yellow-400 transition">FAQ</Link></li>
            <li><Link href="/returns" className="hover:text-yellow-400 transition">Returns</Link></li>
            <li><Link href="/shipping" className="hover:text-yellow-400 transition">Shipping Info</Link></li>
            <li><Link href="/privacy" className="hover:text-yellow-400 transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Stay Connected</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-yellow-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaLinkedinIn /></a>
          </div>
          <form className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full p-2 rounded-l-md text-gray-800 focus:outline-none" 
            />
            <button 
              type="submit" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-r-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} SwiftCart. All rights reserved.
      </div>
    </footer>
  );
};

