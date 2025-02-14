import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import errorImage from "../assets/error.png"; // Replace with your image

const ErrorPage = () => {
  return (
    <div 
      className="h-screen flex items-center justify-center bg-[url('https://img.freepik.com/free-vector/pastel-abstract-nebula_91008-229.jpg')] 
      bg-no-repeat bg-cover bg-center"
    >
      <div className="backdrop-blur-lg bg-white/20 shadow-lg border border-white/20 p-8 rounded-lg text-center w-96">
        {/*  Logo (Replace with your brand logo) */}
        <h1 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center justify-center">
          <img src={logo} alt="Logo" className="h-16 mr-2" />
        </h1>

        {/*  Error Image */}
        <img src={errorImage} alt="404 Error" className="w-32 mx-auto" />

        {/*  Error Text */}
        <h2 className="text-xl font-bold text-purple-600 mt-4">
          Oops, Page Not Found
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          It will be as straightforward as Occidental; in fact, it will be just like Occidental to an English speaker.
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="mt-5 inline-block bg-white/30 text-black px-6 py-2 rounded-full text-lg font-semibold hover:bg-white/60 hover:text-black transition"
        >
          🔙 Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;



// import React from "react";
// import { Link } from "react-router-dom";
// import logo from "../assets/logo.png"
// import errorImage from "../assets/error.png"; // Replace with your image

// const ErrorPage = () => {
//   return (
//     <div className="h-screen flex items-center justify-center bg-[url('https://img.freepik.com/free-vector/pastel-abstract-nebula_91008-229.jpg')]">
//       <div className="backdrop-blur-lg bg-white/20 shadow-lg border border-white/20 p-8 rounded-lg  text-center w-96">
//         {/* Logo (Replace with your brand logo) */}
//         <h1 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center justify-center">
//           <img src={logo} alt="Logo" className="h-16 mr-2" />
//         </h1>

//         {/* Error Image */}
//         <img src={errorImage} alt="404 Error" className="w-32 mx-auto" />

//         {/* Error Text */}
//         <h2 className="text-xl font-bold text-purple-600 mt-4">
//           Oops, Page Not Found
//         </h2>
//         <p className="text-gray-600 text-sm mt-2">
//           It will be as straightforward as Occidental; in fact, it will be just like Occidental to an English speaker.
//         </p>

//         {/* Back to Home Button */}
//         <Link
//           to="/"
//           className="mt-5 inline-block bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-600 transition"
//         >
//           🔙 Back to Home
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ErrorPage;
