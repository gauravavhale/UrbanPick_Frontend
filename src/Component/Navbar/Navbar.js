"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

export const Navbar = () => {

  const [isOpen, setISOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const openMenu = () => {
    setISOpen(!isOpen)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992)
      if (window.innerWidth >= 992) {
        setISOpen(false)  // close mobile menu on large screens automatically
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest('.nav-dropdown') &&
        !event.target.closest('.nav-label')
      ) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = [
    { label: 'Electronics', products: ["laptops", "smartphones", "tablets", "mobile-accessories", "mens-watches", "womens-watches"] },
    { label: 'Fashion', products: ["mens-shirts", "mens-shoes", "womens-bags", "womens-dresses", "womens-jewellery", "womens-shoes", "tops", "sunglassestops"] },
    { label: 'Home & Living', products: ["furniture", "home-decoration", "kitchen-accessories", "groceries", "sports-accessories"] },
    { label: 'Beauty', products: ["beauty", "skin-care", "fragrances"] },
    { label: 'Vehicles', products: ["motorcycle", "vehicle"] },
  ]

  const toggleDropdown = (label) => {
    if (openDropdown === label) {
      setOpenDropdown(null) // close if already open
    } else {
      setOpenDropdown(label) // open clicked dropdown
    }
  }

  return (
    <div>
      <div className='w-full flex flex-row py-4 justify-around items-center bg-[#ffffff] fixed top-0 z-100' >
        <Link href="/">
          <span className={`text-3xl font-bold bg-gradient-to-r from-[#ff6a00] to-[#ee0979] bg-clip-text text-transparent uppercase`}>UrbanPick</span>
        </Link>

        {/* Desktop nav with dropdown */}
        {!isMobile && (
          <div className='flex flex-row gap-6 relative'>
            {navLinks.map((link) => (
              <div key={link.label} className='flex flex-col relative'>
                <label
                  onClick={() => toggleDropdown(link.label)}
                  className='cursor-pointer text-lg font-semibold select-none nav-label'
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleDropdown(link.label) }}
                >
                  {link.label}
                </label>

                {openDropdown === link.label && (
                  <div
                    className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-50 nav-dropdown"
                    tabIndex={-1}
                  >
                    <ul className="flex flex-col">
                      {link.products.map((product, ind) => (
                        <li key={ind}>
                          <Link
                            href={`/product/${product}`}
                            className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-[#ff6a00] hover:to-[#ee0979] hover:text-white rounded-md transition-colors duration-200 cursor-pointer"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {product.charAt(0).toUpperCase() + product.slice(1).replace(/-/g, ' ')}
                          </Link>
                        </li>
                     ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Right side - Login and Cart */}
        <div className='flex flex-row text-xl font-bold gap-3'>
          <Link className='hidden md:block' href={'/login'}>Login</Link>
          <div className='flex flex-row items-center ml-4'>
            <Link href={'/cart'} className="flex items-center">
              <BsCart3 className='mr-1' />
              Cart
            </Link>
          </div>

          {/* Hamburger menu for mobile */}
          {isMobile && (
            <button onClick={openMenu} className='block lg:hidden text-2xl ml-4' >
              <GiHamburgerMenu />
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isOpen && (
  <div className='flex flex-col gap-4 p-4 bg-white border-t shadow-md'>
    {navLinks.map((link) => (
      <div key={link.label} className='relative group'>
        <button className='text-xl font-bold flex items-center justify-between w-full'>
          {link.label}
          {link.products?.length > 0 && (
            <span className='text-sm'>▼</span>
          )}
        </button>

        {/* dropdown for mobile */}
        {link.products?.length > 0 && (
          <div className='mt-2 flex flex-col bg-white border border-gray-200 rounded-md shadow-md overflow-hidden'>
            {link.products.map((product, i) => (
              <Link
                key={i}
                href={`/product/${product}`}
                className='px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-[#ff6a00] hover:to-[#ee0979] hover:text-white transition-colors duration-200'
                onClick={() => setISOpen(false)}
              >
                {product.charAt(0).toUpperCase() + product.slice(1).replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
)}
      
    </div>
  )
}
