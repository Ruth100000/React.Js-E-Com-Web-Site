import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { IoCartOutline } from 'react-icons/io5'
import { useCart } from '../context/CartContext'
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi'
import ResponsiveMenu from '../components/ResponsiveMenu'

const Navbar = () => {


  const {cartItem}=useCart()
  const [openNav, setOpenNav]=useState(false)

  // Example cart items (replace later with context or state)
 

  return (
    <div className='bg-white py-3 shadow-2xl px-4 md:px-0'>
      <div className='max-w-6xl mx-auto flex justify-between items-center'>
        
        {/* Left Section: Logo + Location */}
        <div className='flex gap-7 items-center'>
          <Link to='/'>
            <h1 className='font-bold text-3xl'>
              <span className='text-red-500 font-serif'>Z</span>aptro
            </h1>
          </Link>

          <div className='md:flex gap-1 cursor-pointer text-gray-700 items-center hidden'>
            <MapPin className='text-red-500' />
            <span className='font-semibold'>Add Address</span>
          </div>
        </div>

        {/* Right Section: Navigation */}
        <nav className='flex gap-7 items-center'>
          <ul className='md:flex gap-7 items-center text-xl font-semibold hidden'>
                        <NavLink to={'/'} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>Home</li></NavLink>
                        <NavLink to={"/products"} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>Products</li></NavLink>
                        <NavLink to={"/about"} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>About</li></NavLink>
                        <NavLink to={"/contact"} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>Contact</li></NavLink>
                    </ul>

          {/* Cart Icon */}
          <Link to='/cart' className='relative'>
            <IoCartOutline className='h-7 w-7' />
            <span className='bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white text-sm'>
              {cartItem.length}
            </span>
          </Link>
          {
            openNav? <HiMenuAlt3 onClick={()=>setOpenNav(false)} className='h-7 w-7 md:hidden'/>:<HiMenuAlt1 onClick={()=>setOpenNav(true)} className='h-7 w-7 md:hidden'/>
          }
        </nav>
      </div>
      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav}/>
    </div>
  )
}

export default Navbar
