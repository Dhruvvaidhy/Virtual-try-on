import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup , signInWithRedirect} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
  
      await updateProfile(userCredential.user, {
        displayName: formData.email.split("@")[0],
      });
  
      dispatch(setUser({ 
        uid: userCredential.user.uid, 
        email: userCredential.user.email, 
        displayName: userCredential.user.displayName 
      })); // Only store serializable data
  
      alert("Signup Successful!");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Try logging in.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format. Please enter a valid email.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError(err.message);
      }
    }
  };
  

  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   if (formData.password !== formData.confirmPassword) {
  //     setError("Passwords do not match!");
  //     return;
  //   }
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       formData.email,
  //       formData.password
  //     );
  //     await updateProfile(userCredential.user, {
  //       displayName: formData.email.split("@")[0],
  //     });
  //     dispatch(setUser(userCredential.user)); // Store user in Redux

  //     alert("Signup Successful!");
  //     navigate("/"); // Redirect to Login page after signup
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };


  const isMobile = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };
  
  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      if (isMobile()) {
        await signInWithRedirect(auth, provider); // Use Redirect on Mobile
      } else {
        await signInWithPopup(auth, provider); // Use Popup on Desktop
      }
      alert("Signup with Google Successful!");
      navigate("/"); // Redirect to Home page
    } catch (err) {
      setError(err.message);
    }
  };

  // const handleGoogleSignup = async () => {
  //   const provider = new GoogleAuthProvider();
  //   try {
  //     await signInWithPopup(auth, provider);
  //     alert("Signup with Google Successful!");
  //     navigate("/"); // Redirect to Login page after Google signup
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Create an Account</h1>
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center bg-green-200 text-black py-2 rounded-lg mb-4 hover:bg-green-300"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
            alt="Google"
            className="w-6 h-6 mr-2"
          />
          Sign up with Google
        </button>
        <p className="text-center text-gray-600 mb-4">or continue with email</p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="your@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Ensure it's at least 6 characters"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 mb-1" htmlFor="confirmPassword">
              Repeat Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Type your password again"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-200 text-black py-2 rounded-lg hover:bg-green-300"
          >
            Sign up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;


// import React, { useState } from "react";
// import { auth } from "../firebaseConfig";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/authSlice";


// const Signup = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [error, setError] = useState("");

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };


//   const dispatch = useDispatch();
// const handleSignup = async (e) => {
//   e.preventDefault();
//   if (formData.password !== formData.confirmPassword) {
//     setError("Passwords do not match!");
//     return;
//   }
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       formData.email,
//       formData.password
//     );
//     await updateProfile(userCredential.user, {
//       displayName: formData.email.split("@")[0],
//     });
//     dispatch(setUser(userCredential.user)); // Store user in Redux
//     alert("Signup Successful!");
//   } catch (err) {
//     setError(err.message);
//   }
// };

//   // const handleSignup = async (e) => {
//   //   e.preventDefault();
//   //   if (formData.password !== formData.confirmPassword) {
//   //     setError("Passwords do not match!");
//   //     return;
//   //   }
//   //   try {
//   //     const userCredential = await createUserWithEmailAndPassword(
//   //       auth,
//   //       formData.email,
//   //       formData.password
//   //     );
//   //     await updateProfile(userCredential.user, {
//   //       displayName: formData.email.split("@")[0], // Use part of the email as username
//   //     });
//   //     alert("Signup Successful!");
//   //   } catch (err) {
//   //     setError(err.message);
//   //   }
//   // };

//   const handleGoogleSignup = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       await signInWithPopup(auth, provider);
//       alert("Signup with Google Successful!");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center mb-6">Create an Account</h1>
//         <button
//           type="button"
//           onClick={handleGoogleSignup}
//           className="w-full flex items-center justify-center bg-green-200 text-black py-2 rounded-lg mb-4 hover:bg-green-300"
//         >
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
//             alt="Google"
//             className="w-6 h-6 mr-2"
//           />
//           Sign in with Google
//         </button>
//         <p className="text-center text-gray-600 mb-4">or continue with email</p>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         <form onSubmit={handleSignup}>
//           <div className="mb-4">
//             <label className="block text-gray-600 mb-1" htmlFor="email">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               placeholder="your@gmail.com"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-600 mb-1" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Ensure it's at least 6 characters"
//               value={formData.password}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-600 mb-1" htmlFor="confirmPassword">
//               Repeat Password
//             </label>
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Type your password again"
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-200 text-black py-2 rounded-lg hover:bg-green-300"
//           >
//             Get Started
//           </button>
//         </form>
//         <p className="text-center text-gray-600 mt-6">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-500 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;


// import React, { useState } from "react";
// import { auth } from "../firebaseConfig";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     mobile: "",
//     password: "",
//   });
//   const [error, setError] = useState("");

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         formData.email,
//         formData.password
//       );
//       await updateProfile(userCredential.user, {
//         displayName: formData.username,
//       });
//       alert("Signup Successful!");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleGoogleSignup = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       await signInWithPopup(auth, provider);
//       alert("Signup with Google Successful!");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <form
//         className="bg-white p-8 shadow-md rounded-lg"
//         onSubmit={handleSignup}
//       >
//         <h1 className="text-2xl font-bold mb-4 text-center">Signup</h1>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleInputChange}
//           className="w-full p-2 border rounded mb-4"
//           required
//         />
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
//           type="text"
//           name="mobile"
//           placeholder="Mobile"
//           value={formData.mobile}
//           onChange={handleInputChange}
//           className="w-full p-2 border rounded mb-4"
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
//           Signup
//         </button>
//         <button
//           type="button"
//           onClick={handleGoogleSignup}
//           className="w-full mt-4 bg-red-500 text-white py-2 rounded"
//         >
//           Signup with Google
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;
