"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { text: 'Analytics', url: '/docs' },
    { text: 'About', url: '/about' },
  ];

  return (
    <nav className={`${isOpen? "bg-white":"bg-black" } border-b border-gray-700 backdrop-blur-md fixed top-0 left-0 right-0 `}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center gap-2 font-bold">
                <Image
                  src={isOpen ? "/Bot (2).png" : "/Bot (2).png"}
                  alt="PlutoFlow logo"
                  width={45}
                  height={45}
                />
                <div className={isOpen ? "text-white" : "text-white"}>
                  AgentGalaxy <span className={`py-1 px-1 text-sm rounded-sm ${isOpen ? "bg-gray-600" : "bg-gray-400"}`}>experimental</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center">
              <div className="flex gap-8 text-white py-2 px-4 rounded-l-sm">
                {menuItems.map((item, index) => (
                  <Link key={index} href={item.url}>
                    <div className="hover:text-gray-300">{item.text}</div>
                  </Link>
                ))}
              </div>
              <Link href="/modelform">
                <div className="bg-textcolor1 text-black py-1 px-2  rounded-md hover:text-pink-500">
                  Submit
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className={`${isOpen ? "text-white" : "text-black"} focus:outline-none`}>
              {isOpen ? <X size={24} /> : "Menu" }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 absolute z-20 w-full h-screen bg-black space-y-1 sm:px-3">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.url}>
                <div className="text-white hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium">
                  {item.text}
                </div>
              </Link>
            ))}
            <Link href="/modelform">
              <div className="bg-white text-black block px-3 py-2 text-base font-medium rounded-sm">
                Test your model
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;