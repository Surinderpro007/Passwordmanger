import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className="bg-white rounded-lg shadow-sm  mt-3 dark:bg-gray-800 w-[70%] m-auto">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">

      <img src="../icons/logo.png" className="h-12 w-12" alt="Logo" />

    <button
      data-collapse-toggle="navbar-default"
      type="button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-default"
      aria-expanded="false"
    >
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>

    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">


      <div className='link-via-app bg-gradient-to-r from-blue-300 via-green-300 to-orange-200 py-0 px-2 rounded-full '>
        <button className='flex justify-center items-center cursor-pointer'>
          <img className='w-10' src="../icons/github.png" alt="github" />
          <span>Github</span>
        </button>
      </div>
    </div>
  </div>
</nav>

      
    </div>
  )
}

export default Navbar
