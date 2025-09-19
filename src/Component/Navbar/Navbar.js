"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const length = useSelector((state) => state.appReducer.cart.length);

  const navLinks = [
    {
      label: "Electronics",
      products: ["laptops", "smartphones", "tablets", "mobile-accessories", "mens-watches", "womens-watches"],
    },
    {
      label: "Fashion",
      products: ["mens-shirts", "mens-shoes", "womens-bags", "womens-dresses", "womens-jewellery", "womens-shoes", "tops"],
    },
    {
      label: "Home & Living",
      products: ["furniture", "home-decoration", "kitchen-accessories", "groceries", "sports-accessories"],
    },
    { label: "Beauty", products: ["beauty", "skin-care", "fragrances"] },
    { label: "Vehicles", products: ["motorcycle", "vehicle"] },
  ];

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="w-full flex flex-row py-4 justify-between items-center px-6 bg-white fixed top-0 z-50 shadow">
        {/* Logo */}
        <Link href="/">
          <span className="text-3xl font-bold bg-gradient-to-r from-[#ff6a00] to-[#ee0979] bg-clip-text text-transparent uppercase">
            UrbanPick
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex flex-row gap-6 relative">
          {navLinks.map((link) => (
            <div key={link.label} className="relative">
              <button
                onClick={() => toggleDropdown(link.label)}
                className="cursor-pointer text-lg font-semibold select-none nav-label"
              >
                {link.label}
              </button>

              {openDropdown === link.label && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-50 nav-dropdown">
                  <ul className="flex flex-col">
                    {link.products.map((product, ind) => (
                      <li key={ind}>
                        <Link
                          href={`/product/${product}`}
                          className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-[#ff6a00] hover:to-[#ee0979] hover:text-white rounded-md transition-colors duration-200"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {product.charAt(0).toUpperCase() + product.slice(1).replace(/-/g, " ")}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side */}
        <div className="flex flex-row text-xl font-bold gap-4 items-center">
          <Link className="hidden md:block" href="/login">
            Login
          </Link>

          {/* Cart */}
          <div className="flex items-center relative">
            <Link href="/cart" className="flex items-center relative">
              <BsCart3 className="mr-1 text-2xl" />
              <span>Cart</span>
              {length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                  {length}
                </span>
              )}
            </Link>
          </div>

          {/* Hamburger (only on mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block lg:hidden text-2xl ml-2"
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed top-[64px] left-0 w-full h-screen overflow-y-auto bg-white border-t shadow-md z-40 pb-20 lg:hidden">
          <div className="flex flex-col gap-4 p-4">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                <button
                  onClick={() => toggleDropdown(link.label)}
                  className="text-xl font-bold flex items-center justify-between w-full"
                >
                  {link.label}
                  {link.products?.length > 0 && (
                    <span className="text-sm">
                      {openDropdown === link.label ? "▲" : "▼"}
                    </span>
                  )}
                </button>

                {/* Mobile dropdown */}
                {openDropdown === link.label && (
                  <div className="mt-2 flex flex-col bg-white border border-gray-200 rounded-md shadow-md overflow-hidden">
                    {link.products.map((product, i) => (
                      <Link
                        key={i}
                        href={`/product/${product}`}
                        className="px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-[#ff6a00] hover:to-[#ee0979] hover:text-white transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {product.charAt(0).toUpperCase() + product.slice(1).replace(/-/g, " ")}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/login"
              className="mt-6 w-full text-lg font-semibold text-white bg-gradient-to-r from-[#ff6a00] to-[#ee0979] rounded-xl px-4 py-3 text-center shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
