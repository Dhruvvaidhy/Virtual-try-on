import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png"; // Add your logo image in the assets folder

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu function
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 bg-black text-white p-2 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo (Visible in both desktop & mobile) */}
        <div className="flex">
          <img src={logo} alt="Rockme Logo" className="h-25 w-auto" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg">
          <Link to="/" className="hover:text-[#ef4a60]">Home</Link>
          <Link to="/about" className="hover:text-[#ef4a60]">About</Link>
          <Link to="/contact" className="hover:text-[#ef4a60]">Contact</Link>
        </ul> 

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="bg-[#ef4a60] px-4 py-1 text-lg font-semibold rounded-full text-white hover:bg-white hover:text-black">
            Login
          </Link>
          <Link to="/virtual" className="bg-[#ef4a60] px-4 py-1 text-lg font-semibold rounded-full text-white hover:bg-white hover:text-black">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white text-2xl" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu (Logo remains visible at top) */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 flex flex-col items-center justify-start pt-10 transform transition-all duration-300 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        {/* Mobile Menu Logo */}
        <div className="flex items-center mb-6">
          <img src={logo} alt="Rockme Logo" className="h-28 w-auto" />
        </div>

        {/* Mobile Menu Links */}
        <Link to="/" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>Home</Link>
        <Link to="/about" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>About</Link>
        <Link to="/contact" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>Contact</Link>

        {/* Mobile Menu Buttons */}
        <Link to="/login" className="mt-6 text-xl bg-[#ef4a60] px-6 py-2 rounded-full text-white hover:bg-white hover:text-black" onClick={toggleMenu}>
          Login
        </Link>
        <Link to="/virtual" className="mt-3 text-xl bg-[#ef4a60] px-6 py-2 rounded-full text-white hover:bg-white hover:text-black" onClick={toggleMenu}>
          Get Started
        </Link>

        {/* Close Button */}
        <button className="absolute top-5 right-6 text-white text-3xl" onClick={toggleMenu}>
          <FaTimes />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   // Toggle menu function
//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
// <nav className="sticky top-0 bg-black text-white p-4  w-full z-50 shadow-lg"> 
//      <div className="container mx-auto flex justify-between items-center">

//         {/* Logo */}
//         <div className="text-2xl font-bold">
//           <span className="text-white">Rock</span>
//           <span className="text-[#ef4a60]">me</span>
//         </div>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex space-x-6 text-lg">
//           <Link to="/" className="hover:text-[#ef4a60]">Home</Link>
//           <Link to="/about" className="hover:text-[#ef4a60]">About</Link>
//           <Link to="/contact" className="hover:text-[#ef4a60]">Contact</Link>
//         </ul>

//         {/* Desktop Buttons */}
//         <div className="hidden md:flex items-center space-x-4">
//           <Link to="/login" className="bg-[#ef4a60] px-4 py-1 text-lg font-semibold rounded-full text-white hover:bg-white hover:text-black">
//             Login
//           </Link>
//           <Link to="/virtual" className="bg-[#ef4a60] px-4 py-1 text-lg font-semibold rounded-full text-white hover:bg-white hover:text-black">
//             Get Started
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <button className="md:hidden text-white text-2xl" onClick={toggleMenu}>
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* Mobile Menu - Improved Transition */}
//       <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col items-center justify-center transform transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}>
//         <button className="absolute top-5 right-6 text-white text-3xl" onClick={toggleMenu}>
//           <FaTimes />
//         </button>
//         <Link to="/" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>Home</Link>
//         <Link to="/about" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>About</Link>
//         <Link to="/contact" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>Contact</Link>
//         <Link to="/login" className="mt-6 text-xl bg-[#ef4a60] px-6 py-2 rounded-full text-white hover:bg-white hover:text-black" onClick={toggleMenu}>Login</Link>
//         <Link to="/virtual" className="mt-3 text-xl bg-[#ef4a60] px-6 py-2 rounded-full text-white hover:bg-white hover:text-black" onClick={toggleMenu}>Get Started</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   // Toggle menu function
//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-black/10 text-white p-4 fixed w-full z-50 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">

//         {/* Logo */}
//         <div className="text-2xl font-bold">
//           <span className="text-white">Rock</span>
//           <span className="text-[#ef4a60]">me</span>
//         </div>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex space-x-6 text-lg">
//           <Link to="/" className="hover:text-[#ef4a60]">Home</Link>
//           <Link to="/about" className="hover:text-[#ef4a60]">About</Link>
//           <Link to="/contact" className="hover:text-[#ef4a60]">Contact</Link>
//         </ul>

//         {/* Desktop Buttons */}
//         <div className="hidden md:flex items-center space-x-4">
//           <Link to="/login" className="bg-[#ef4a60] px-4 py-1 text-lg font-semibold rounded-full text-white hover:bg-white hover:text-black">
//             Login
//           </Link>
//           <Link to="/virtual" className="bg-[#ef4a60] px-4 py-1 text-lg font-semibold rounded-full text-white hover:bg-white hover:text-black">
//             Get Started
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <button className="md:hidden text-white text-2xl" onClick={toggleMenu}>
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* Mobile Menu (Corrected) */}
//       <div className={`md:hidden fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
//         <button className="absolute top-5 right-6 text-white text-3xl" onClick={toggleMenu}>
//           <FaTimes />
//         </button>
//         <Link to="/" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>Home</Link>
//         <Link to="/about" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>About</Link>
//         <Link to="/contact" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>Contact</Link>
//         <Link to="/login" className="mt-6 text-xl bg-[#ef4a60] px-6 py-2 rounded-full text-white hover:bg-white hover:text-black" onClick={toggleMenu}>Login</Link>
//         <Link to="/virtual" className="mt-3 text-xl bg-[#ef4a60] px-6 py-2 rounded-full text-white hover:bg-white hover:text-black" onClick={toggleMenu}>Get Started</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;