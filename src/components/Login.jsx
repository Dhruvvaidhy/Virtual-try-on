import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import logo from "../assets/logo.png"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName || "",
        })
      ); 
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo at the top */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="w-26 h-20" />
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-4">Login to your account</h1>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-200 py-2 rounded-lg text-black font-semibold hover:bg-green-300"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Don’t have an account yet?{" "}
          <button
            className="text-blue-500 underline font-semibold cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState } from "react";
// import {
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
//   signInWithRedirect,
// } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../firebaseConfig";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/authSlice";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       dispatch(
//         setUser({
//           uid: userCredential.user.uid,
//           email: userCredential.user.email,
//           displayName: userCredential.user.displayName || "",
//         })
//       ); // Store only serializable data in Redux
//       navigate("/");
//     } catch (err) {
//       setError("Invalid email or password. Please try again.");
//     }
//   };

//   const isMobile = () => {
//     return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//   };

//   const handleGoogleLogin = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       let userCredential;
//       if (isMobile()) {
//         userCredential = await signInWithRedirect(auth, provider);
//       } else {
//         userCredential = await signInWithPopup(auth, provider);
//       }
//       dispatch(
//         setUser({
//           uid: userCredential.user.uid,
//           email: userCredential.user.email,
//           displayName: userCredential.user.displayName || "",
//         })
//       ); // Store only serializable data in Redux
//       navigate("/");
//     } catch (err) {
//       setError("Google Sign-In failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center mb-4">Login to your account</h1>
//         <button
//           onClick={handleGoogleLogin}
//           className="w-full flex items-center justify-center bg-green-200 text-black py-2 rounded-lg mb-4 hover:bg-green-300"
//         >
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
//             alt="Google"
//             className="w-6 h-6 mr-2"
//           />
//           Login with Google
//         </button>
//         <p className="text-center text-gray-600 mb-4">or continue with email</p>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-600 mb-1" htmlFor="email">
//               Email Address
//             </label>
//             <input
//               type="email"
//               placeholder="your@gmail.com"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-600 mb-1" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-200 py-2 rounded-lg text-black font-semibold hover:bg-green-300"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-center mt-6 text-gray-600">
//           Don’t have an account yet?{" "}
//           <button
//             className="text-blue-500 underline font-semibold"
//             onClick={() => navigate("/signup")}
//           >
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../firebaseConfig";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/authSlice";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();





//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       dispatch(setUser(userCredential.user)); // Store user in Redux
//       navigate("/"); // Redirect to dashboard after successful login
//     } catch (err) {
//       setError("Invalid email or password. Please try again.");
//     }
//   };

//   // const handleLogin = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     await signInWithEmailAndPassword(auth, email, password);
//   //     navigate("/"); // Redirect to dashboard after successful login
//   //   } catch (err) {
//   //     setError("Invalid email or password. Please try again.");
//   //   }
//   // };

//   const isMobile = () => {
//     return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//   };

//   const handleGoogleLogin = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       if (isMobile()) {
//         await signInWithRedirect(auth, provider); // Use Redirect on Mobile
//       } else {
//         await signInWithPopup(auth, provider); // Use Popup on Desktop
//       }
//       navigate("/"); // Redirect to Home page
//     } catch (err) {
//       setError("Google Sign-In failed. Please try again.");
//     }
//   };
  

//   // const handleGoogleLogin = async () => {
//   //   const provider = new GoogleAuthProvider();
//   //   try {
//   //     const userCredential = await signInWithPopup(auth, provider);
//   //     dispatch(setUser(userCredential.user)); // Store user in Redux
//   //     navigate("/"); // Redirect to dashboard after successful login
//   //   } catch (err) {
//   //     setError("Google Sign-In failed. Please try again.");
//   //   }
//   // };
//   // const handleGoogleLogin = async () => {
//   //   const provider = new GoogleAuthProvider();
//   //   try {
//   //     await signInWithPopup(auth, provider);
//   //     navigate("/"); // Redirect to dashboard after successful login
//   //   } catch (err) {
//   //     setError("Google Sign-In failed. Please try again.");
//   //   }
//   // };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center mb-4">Login to your account</h1>
//         <button
//           onClick={handleGoogleLogin}
//           className="w-full flex items-center justify-center bg-green-200 text-black py-2 rounded-lg mb-4 hover:bg-green-300"
//         >
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
//             alt="Google"
//             className="w-6 h-6 mr-2"
//           />
//           Login with Google
//         </button>
//         <p className="text-center text-gray-600 mb-4">or continue with email</p>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-600 mb-1" htmlFor="email">
//               Email Address
//             </label>
//             <input
//               type="email"
//               placeholder="your@gmail.com"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-600 mb-1" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-200 py-2 rounded-lg text-black font-semibold hover:bg-green-300"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-center mt-6 text-gray-600">
//           Don’t have an account yet?{" "}
//           <button
//             className="text-blue-500 underline font-semibold"
//             onClick={() => navigate("/signup")}
//           >
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../firebaseConfig";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/"); // Redirect to dashboard after successful login
//     } catch (err) {
//       setError("Invalid email or password. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <button
//             type="submit"
//             className="bg-[#ef4a60] w-full py-2 text-white font-semibold rounded-lg hover:bg-pink-600"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-center mt-6">
//           Don’t have an account?{" "}
//           <button
//             className="text-pink-500 underline font-semibold"
//             onClick={() => navigate("/signup")} // Navigate to the signup page
//           >
//             Sign up here
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { auth } from "../firebaseConfig"
// import { signInWithEmailAndPassword } from "firebase/auth";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, formData.email, formData.password);
//       alert("Login Successful!");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <form
//         className="bg-white p-8 shadow-md rounded-lg"
//         onSubmit={handleLogin}
//       >
//         <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleInputChange}
//           className="w-full p-2 border rounded mb-4"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleInputChange}
//           className="w-full p-2 border rounded mb-4"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
