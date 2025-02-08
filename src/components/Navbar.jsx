import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-blue-900 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-4xl mx-8 text-red-400 font-weight[900]'>tskP</span>
        </div>
      <ul className="flex gap-8 mx-10 mt-1">
        <li className='cursor-pointer hover:font-bold hover:text-red-400 transition-all hover:text-xl'>Home</li>
        <li className='cursor-pointer hover:font-bold hover:text-red-400 transition-all hover:text-xl'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
