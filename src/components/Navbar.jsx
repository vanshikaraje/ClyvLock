import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-transparent text-white">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo text-2xl font-extrabold">
          <span className="bg-black/50 px-3 py-1 rounded-lg shadow-md flex items-center gap-1">
            <span className="text-indigo-400">&lt;</span>
            <span className="text-white">Clyvr</span>
            <span className="text-fuchsia-400">Lock/ &gt;</span>
          </span>
        </div>

        <button className="text-white bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 transition-colors duration-300 my-5 rounded-full flex justify-between items-center">
          <img
            className="invert w-10 p-1"
            src="/icons8-github.svg"
            alt="github logo"
          />
          <span className="font-bold px-2">GitHub</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
