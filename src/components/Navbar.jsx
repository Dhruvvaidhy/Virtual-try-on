import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 bg-black text-white p-3 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* 🔹 Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
        </Link>

        {/* 🔹 Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-lg flex-grow justify-center">
          <Link to="/" className="hover:text-[#ef4a60]">
            Home
          </Link>
          <Link to="/contact" className="hover:text-[#ef4a60]">
            Contact
          </Link>
          {!user && (
            <>
              <Link to="/signup" className="hover:text-[#ef4a60]">
                Signup
              </Link>
              <Link to="/login" className="hover:text-[#ef4a60]">
                Login
              </Link>
            </>
          )}
        </div>

        {/* 🔹 Get Started Button */}
        <Link
          to="/virtual"
          className="hidden md:block bg-[#ef4a60] px-5 py-2 rounded-full text-white text-lg font-semibold hover:bg-white hover:text-black transition duration-300"
        >
          Get Started
        </Link>

        {/* 🔹 User Icon (Moved to Right End) */}
        {user && (
          <div className="hidden md:block relative ml-4 ">
            <button
              onClick={toggleDropdown}
              className="focus:outline-none text-white text-3xl cursor-pointer"
            >
              <FaUserCircle />
            </button>
            {dropdownOpen && (
  <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
    <div className="px-4 py-2 text-center border-b border-gray-700">
      <FaUserCircle className="text-4xl mx-auto" />
      <p className="mt-2 font-semibold">{user.displayName || "User"}</p>
      <p className="text-sm text-gray-400">{user.email}</p>
    </div>
    <button
      onClick={handleLogout}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white hover:bg-gray-700"
    >
      <FaSignOutAlt className="text-xl" />
      Logout
    </button>
            {/* {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
                <div className="px-4 py-2 text-center border-b border-gray-700">
                  <FaUserCircle className="text-4xl mx-auto" />
                  <p className="mt-2 font-semibold">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white hover:bg-gray-700"
                >
                  <FaSignOutAlt className="text-xl" />
                  Logout
                </button>
                {/* <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                >
                  Logout
                </button> */}
              </div>
            )} 
          </div>
        )}

        {/* 🔹 Mobile Menu Button */}
        <button className="md:hidden text-white text-2xl" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* 🔹 Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 flex flex-col items-center pt-10 transform transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        {/* 🔹 Mobile Menu Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="h-24 w-auto" />
          {user && (
            <div className="text-center mt-4 ">
              <FaUserCircle className="text-4xl mx-auto text-white " />
              <p className="text-white font-semibold mt-2">
                {user.displayName || "User"}
              </p>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
          )}
        </div>

        {/* 🔹 Mobile Menu Links */}
        <div className="flex flex-col items-center space-y-4 text-xl">
          <Link
            to="/"
            className="text-white hover:text-[#ef4a60]"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-[#ef4a60]"
            onClick={toggleMenu}
          >
            Contact
          </Link>
          {!user ? (
            <>
              <Link
                to="/signup"
                className="text-white hover:text-[#ef4a60]"
                onClick={toggleMenu}
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="text-white hover:text-[#ef4a60]"
                onClick={toggleMenu}
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="mt-3 text-xl flex items-center gap-2 bg-[#ef4a60] px-6 py-2 rounded-full text-white hover:bg-red-700"
            >
              <FaSignOutAlt className="text-2xl" />
              Logout
            </button>
            // <button
            //   onClick={handleLogout}
            //   className="mt-3 text-xl bg-red-500 px-6 py-2 rounded-full text-white hover:bg-red-700"
            // >

            //   Logout
            // </button>
          )}
        </div>

        {/* 🔹 Get Started Button */}
        <Link
          to="/virtual"
          className="mt-6 bg-[#ef4a60] px-6 py-2 rounded-full text-white text-xl font-semibold hover:bg-white hover:text-black transition duration-300"
          onClick={toggleMenu}
        >
          Get Started
        </Link>

        {/* 🔹 Close Button */}
        <button
          className="absolute top-5 right-6 text-white text-3xl"
          onClick={toggleMenu}
        >
          <FaTimes />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
// import { auth } from "../firebaseConfig";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import logo from "../assets/logo.png";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   // 🔹 Listen for authentication changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   // 🔹 Toggle mobile menu
//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   // 🔹 Toggle user dropdown
//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   // 🔹 Logout function
//   const handleLogout = async () => {
//     await signOut(auth);
//     setDropdownOpen(false);
//     navigate("/");
//   };

//   return (
//     <nav className="sticky top-0 bg-black text-white p-3 w-full z-50 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">

//         {/* 🔹 Logo */}
//         <Link to="/" className="flex items-center">
//           <img src={logo} alt="Logo" className="h-16 w-auto" />
//         </Link>

//         {/* 🔹 Desktop Menu with Authentication Controls */}
//         <div className="hidden md:flex items-center space-x-6 text-lg">
//           <Link to="/" className="hover:text-[#ef4a60]">Home</Link>
//           <Link to="/contact" className="hover:text-[#ef4a60]">Contact</Link>

//           {user ? (
//             <div className="relative">
//               {/* 🔹 User Icon Button */}
//               <button
//                 onClick={toggleDropdown}
//                 className="focus:outline-none text-white text-3xl"
//               >
//                 <FaUserCircle />
//               </button>

//               {/* 🔹 Dropdown Box */}
//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
//                   <div className="px-4 py-2 text-center border-b border-gray-700">
//                     <FaUserCircle className="text-4xl mx-auto" />
//                     <p className="mt-2 font-semibold">{user.displayName || "User"}</p>
//                     <p className="text-sm text-gray-400">{user.email}</p>
//                   </div>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <>
//               <Link to="/signup" className="hover:text-[#ef4a60]">Signup</Link>
//               <Link to="/login" className="hover:text-[#ef4a60]">Login</Link>
//             </>
//           )}
//         </div>

//         {/* 🔹 Mobile Menu Button */}
//         <button className="md:hidden text-white text-2xl" onClick={toggleMenu}>
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* 🔹 Mobile Menu */}
//       <div
//         className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 flex flex-col items-center justify-start pt-10 transform transition-all duration-300 ${
//           isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
//         }`}
//       >
//         {/* 🔹 Mobile Menu Logo */}
//         <div className="flex items-center mb-6">
//           <img src={logo} alt="Logo" className="h-24 w-auto" />
//         </div>

//         {/* 🔹 Mobile Menu Links */}
//         <Link to="/" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>Home</Link>
//         <Link to="/contact" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>Contact</Link>

//         {/* 🔹 Mobile Authentication Controls */}
//         {user ? (
//           <>
//             <p className="text-white mt-6 text-xl">{user.displayName || "User"}</p>
//             <button
//               onClick={handleLogout}
//               className="mt-3 text-xl bg-red-500 px-6 py-2 rounded-full text-white hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/signup" className="mt-6 text-xl bg-[#ef4a60] px-6 py-2 rounded-full text-white hover:bg-white hover:text-black" onClick={toggleMenu}>
//               Signup
//             </Link>
//             <Link to="/login" className="mt-3 text-xl bg-[#ef4a60] px-6 py-2 rounded-full text-white hover:bg-white hover:text-black" onClick={toggleMenu}>
//               Login
//             </Link>
//           </>
//         )}

//         {/* 🔹 Close Button */}
//         <button className="absolute top-5 right-6 text-white text-3xl" onClick={toggleMenu}>
//           <FaTimes />
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
// import { auth } from "../firebaseConfig";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import logo from "../assets/logo.png";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   // 🔹 Listen for authentication changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   // 🔹 Toggle mobile menu
//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   // 🔹 Toggle user dropdown
//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   // 🔹 Logout function
//   const handleLogout = async () => {
//     await signOut(auth);
//     setDropdownOpen(false);
//     navigate("/");
//   };

//   return (
//     <nav className="sticky top-0 bg-black text-white p-3 w-full z-50 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">

//         {/* 🔹 Logo */}
//         <Link to="/" className="flex items-center">
//           <img src={logo} alt="Logo" className="h-16 w-auto" />
//         </Link>

//         {/* 🔹 Desktop Menu */}
//         <ul className="hidden md:flex space-x-6 text-lg">
//           <Link to="/" className="hover:text-[#ef4a60]">Home</Link>
//           <Link to="/contact" className="hover:text-[#ef4a60]">Contact</Link>
//         </ul>

//         {/*  User Authentication Controls  */}
//         <div className="hidden md:flex items-center space-x-4">
//           {user ? (
//             <div className="relative">
//               {/* 🔹 User Icon Button */}
//               <button
//                 onClick={toggleDropdown}
//                 className="focus:outline-none text-white text-3xl"
//               >
//                 <FaUserCircle />
//               </button>

//               {/* 🔹 Dropdown Box */}
//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
//                   <div className="px-4 py-2 text-center border-b border-gray-700">
//                     <FaUserCircle className="text-4xl mx-auto" />
//                     <p className="mt-2 font-semibold">{user.displayName || "User"}</p>
//                     <p className="text-sm text-gray-400">{user.email}</p>
//                   </div>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <>
//               <Link to="/signup" className="bg-[#ef4a60] px-4 py-1 text-lg font-semibold rounded-full text-white hover:bg-white hover:text-black">
//                 Signup
//               </Link>
//               <Link to="/login" className="bg-[#ef4a60] px-4 py-1 text-lg font-semibold rounded-full text-white hover:bg-white hover:text-black">
//                 Login
//               </Link>
//             </>
//           )}

//           {/* 🔹 Get Started Button */}
//           <Link to="/virtual" className="ml-4 bg-[#ef4a60] px-5 py-2 rounded-full text-white text-lg font-semibold hover:bg-white hover:text-black transition duration-300">
//             Get Started
//           </Link>
//         </div>

//         {/* 🔹 Mobile Menu Button */}
//         <button className="md:hidden text-white text-2xl" onClick={toggleMenu}>
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* 🔹 Mobile Menu */}
//       <div
//         className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 flex flex-col items-center justify-start pt-10 transform transition-all duration-300 ${
//           isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
//         }`}
//       >
//         {/* 🔹 Mobile Menu Logo */}
//         <div className="flex items-center mb-6">
//           <img src={logo} alt="Logo" className="h-24 w-auto" />
//         </div>

//         {/* 🔹 Mobile Menu Links */}
//         <Link to="/" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>Home</Link>

//         <Link to="/contact" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>Contact</Link>

//         {/* 🔹 Mobile Authentication Controls */}
//         {user ? (
//           <>
//             <p className="text-white mt-6 text-xl">{user.displayName || "User"}</p>
//             <button
//               onClick={handleLogout}
//               className="mt-3 text-xl bg-red-500 px-6 py-2 rounded-full text-white hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/signup" className="mt-6 text-xl bg-[#ef4a60] px-6 py-2 rounded-full text-white hover:bg-white hover:text-black" onClick={toggleMenu}>
//               Signup
//             </Link>
//             <Link to="/login" className="mt-3 text-xl bg-[#ef4a60] px-6 py-2 rounded-full text-white hover:bg-white hover:text-black" onClick={toggleMenu}>
//               Login
//             </Link>
//           </>
//         )}

//         {/* 🔹 Get Started Button */}
//         <Link to="/virtual" className="mt-6 bg-[#ef4a60] px-6 py-2 rounded-full text-white text-xl font-semibold hover:bg-blue-600 transition duration-300" onClick={toggleMenu}>
//           Get Started
//         </Link>

//         {/* 🔹 Close Button */}
//         <button className="absolute top-5 right-6 text-white text-3xl" onClick={toggleMenu}>
//           <FaTimes />
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
// import { auth } from "../firebaseConfig";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import logo from "../assets/logo.png";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // 🔹 Listen for authentication changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   // 🔹 Toggle menu function
//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   // 🔹 Logout function
//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate("/"); // Redirect to home after logout
//   };

//   return (
//     <nav className="sticky top-0 bg-black text-white p-2 w-full z-50 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">

//         {/* 🔹 Logo */}
//         <div className="flex">
//           <img src={logo} alt="Logo" className="h-16 w-auto" />
//         </div>

//         {/* 🔹 Desktop Menu */}
//         <ul className="hidden md:flex space-x-6 text-lg">
//           <Link to="/" className="hover:text-[#ef4a60]">Home</Link>
//           <Link to="/contact" className="hover:text-[#ef4a60]">Contact</Link>
//         </ul>

//         {/* 🔹 User Authentication Controls */}
//         <div className="hidden md:flex items-center space-x-4">
//           {user ? (
//             // 🔹 Show Profile Icon & Name when logged in
//             <div className="relative group">
//               <button className="flex items-center space-x-2">
//                 <FaUserCircle className="text-2xl" />
//                 <span className="text-lg">{user.displayName || "User"}</span>
//               </button>
//               {/* 🔹 Dropdown for Profile & Logout */}
//               <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block">
//                 <p className="px-4 py-2 text-white border-b border-gray-700">{user.email}</p>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           ) : (
//             // 🔹 Show Signup & Login when not logged in
//             <>
//               <Link to="/signup" className="bg-[#ef4a60] px-4 py-1 text-lg font-semibold rounded-full text-white hover:bg-white hover:text-black">
//                 Signup
//               </Link>
//               <Link to="/login" className="bg-[#ef4a60] px-4 py-1 text-lg font-semibold rounded-full text-white hover:bg-white hover:text-black">
//                 Login
//               </Link>
//             </>
//           )}
//         </div>

//         {/* 🔹 Mobile Menu Button */}
//         <button className="md:hidden text-white text-2xl" onClick={toggleMenu}>
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* 🔹 Mobile Menu */}
//       <div
//         className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 flex flex-col items-center justify-start pt-10 transform transition-all duration-300 ${
//           isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
//         }`}
//       >
//         {/* 🔹 Mobile Menu Logo */}
//         <div className="flex items-center mb-6">
//           <img src={logo} alt="Logo" className="h-24 w-auto" />
//         </div>

//         {/* 🔹 Mobile Menu Links */}
//         <Link to="/" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>Home</Link>
//         <Link to="/about" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>About</Link>
//         <Link to="/contact" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>Contact</Link>

//         {/* 🔹 Mobile Authentication Controls */}
//         {user ? (
//           // 🔹 Show Profile & Logout Button when logged in
//           <>
//             <p className="text-white mt-6 text-xl">{user.displayName || "User"}</p>
//             <button
//               onClick={handleLogout}
//               className="mt-3 text-xl bg-red-500 px-6 py-2 rounded-full text-white hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           // 🔹 Show Signup & Login when not logged in
//           <>
//             <Link to="/signup" className="mt-6 text-xl bg-[#ef4a60] px-6 py-2 rounded-full text-white hover:bg-white hover:text-black" onClick={toggleMenu}>
//               Signup
//             </Link>
//             <Link to="/login" className="mt-3 text-xl bg-[#ef4a60] px-6 py-2 rounded-full text-white hover:bg-white hover:text-black" onClick={toggleMenu}>
//               Login
//             </Link>
//           </>
//         )}

//         {/* 🔹 Close Button */}
//         <button className="absolute top-5 right-6 text-white text-3xl" onClick={toggleMenu}>
//           <FaTimes />
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
// import logo from "../assets/logo.png"; // Add your logo image in the assets folder

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   // Toggle menu function
//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="sticky top-0 bg-black text-white p-2 w-full z-50 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">

//         {/* Logo (Visible in both desktop & mobile) */}
//         <div className="flex">
//           <img src={logo} alt="Rockme Logo" className="h-22 w-auto" />
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

//       {/* Mobile Menu (Logo remains visible at top) */}
//       <div
//         className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 flex flex-col items-center justify-start pt-10 transform transition-all duration-300 ${
//           isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
//         }`}
//       >
//         {/* Mobile Menu Logo */}
//         <div className="flex items-center mb-6">
//           <img src={logo} alt="Rockme Logo" className="h-24 w-auto" />
//         </div>

//         {/* Mobile Menu Links */}
//         <Link to="/" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>Home</Link>
//         <Link to="/about" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>About</Link>
//         <Link to="/contact" className="text-xl py-3 text-white hover:text-[#ef4a60]" onClick={toggleMenu}>Contact</Link>

//         {/* Mobile Menu Buttons */}
//         <Link to="/login" className="mt-6 text-xl bg-[#ef4a60] px-6 py-2 rounded-full text-white hover:bg-white hover:text-black" onClick={toggleMenu}>
//           Login
//         </Link>
//         <Link to="/virtual" className="mt-3 text-xl bg-[#ef4a60] px-6 py-2 rounded-full text-white hover:bg-white hover:text-black" onClick={toggleMenu}>
//           Get Started
//         </Link>

//         {/* Close Button */}
//         <button className="absolute top-5 right-6 text-white text-3xl" onClick={toggleMenu}>
//           <FaTimes />
//         </button>
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
