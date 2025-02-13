import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const formRef = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_s5oi7i7", // Replace with your EmailJS Service ID
        "template_fnh7nbt", // Replace with your EmailJS Template ID
        formRef.current,
        "VIXg9QOBYMjfBc4TY" // Replace with your EmailJS Public Key
      )
      .then(
        (result) => {
          setStatus("Message sent successfully!");
          e.target.reset();
        },
        (error) => {
          setStatus("Failed to send the message. Please try again.");
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://style.me/wp-content/uploads/2021/01/city-view-new-york.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative text-center text-white py-32 lg:py-38">
          <h2 className="text-[#ef4a60] text-lg font-semibold uppercase">
            Get In Touch
          </h2>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Ask us anything!</h1>
          <p className="text-lg lg:text-xl">
            We'd love to hear from you. We’re confident you’ll find Style.me to
            be the perfect fit.
          </p>
        </div>
      </div>

      {/* Form and Contact Info Positioned Below */}
      <div className="relative -mt-28 z-10 mb-4 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          {/* Form Section */}
          <div className="flex-1 bg-white shadow-lg p-8 rounded-lg mb-8 lg:mb-0">
            <form ref={formRef} onSubmit={sendEmail} className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-6">
                <input
                  type="text"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                  name="first_name"
                  placeholder="First Name"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                /> 
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <select
                  name="country"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                >
                  <option>Select Country*</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <input
                  type="text"
                  name="company_name"
                  placeholder="Company Name*"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <input
                  type="number"
                  name="phone"
                  placeholder="Work Phone*"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div className="w-full px-3">
                <textarea
                  name="message"
                  placeholder="Enter your message here*"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="w-full px-3">
                <button
                  type="submit"
                  className="bg-[#ef4a60] text-white font-semibold mt-6 py-3 px-8 rounded-lg hover:bg-pink-600"
                >
                  Send Message
                </button>
              </div>
            </form>
            {/* Status Message */}
            {status && <p className="mt-4 text-center text-pink-500">{status}</p>}
          </div>

          {/* Contact Information Section */}
          <div className="flex-1 bg-white shadow-lg p-8 rounded-lg">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Contact Info</h3>
                <p className="text-sm text-gray-600 mt-2">
                  <a href="" className="text-[#ef4a60]">
                    dhruv786.oceanmtech@gmail.com
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">India</h3>
                <p className="text-sm text-gray-600">
                  801, Silver Trade Center, Uttran, Surat (394105)
                  <br />
                  Surat, Gujarat.
                </p>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-pink-500">
                  <i className="fab fa-linkedin"></i>
                </a> 
                <a href="#" className="text-gray-600 hover:text-pink-500">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-600 hover:text-pink-500">
                  <i className="fab fa-youtube"></i>
                </a> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;



// import React from "react";

// const ContactPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header Section */}
//       <div className="relative">
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage:
//               "url('https://style.me/wp-content/uploads/2021/01/city-view-new-york.jpg')",
//           }}
//         >
//           <div className="absolute inset-0 bg-black opacity-50"></div>
//         </div>
//         <div className="relative text-center text-white py-32 lg:py-38">
//           <h2 className="text-[#ef4a60] text-lg font-semibold uppercase">
//             Get In Touch
//           </h2>
//           <h1 className="text-4xl lg:text-5xl font-bold mb-4">Ask us anything!</h1>
//           <p className="text-lg lg:text-xl">
//             We'd love to hear from you. We’re confident you’ll find Style.me to
//             be the perfect fit.
//           </p>
//         </div>
//       </div>

//       {/* Form and Contact Info Positioned Below */}
//       <div className="relative -mt-28 z-10 mb-4 container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row lg:space-x-12">
//           {/* Form Section */}
//           <div className="flex-1 bg-white shadow-lg p-8 rounded-lg mb-8 lg:mb-0">
//             <form className="flex flex-wrap -mx-3">
//               <div className="w-full md:w-1/2 px-3 mb-6">
//                 <input
//                   type="text"
//                   placeholder="First Name"
//                   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//               <div className="w-full md:w-1/2 px-3 mb-6">
//                 <input
//                   type="text"
//                   placeholder="Last Name"
//                   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//               <div className="w-full md:w-1/2 px-3 mb-6">
//                 <select
//                   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
//                 >
//                   <option>Select Country*</option>
//                   <option>United States</option>
//                   <option>Canada</option>
//                   <option>Other</option>
//                 </select>
//               </div>
//               <div className="w-full md:w-1/2 px-3 mb-6">
//                 <input
//                   type="text"
//                   placeholder="Company Name*"
//                   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//               <div className="w-full md:w-1/2 px-3 mb-6">
//                 <input
//                   type="email"
//                   placeholder="Email*"
//                   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//               <div className="w-full md:w-1/2 px-3 mb-6">
//                 <input
//                   type="tel"
//                   placeholder="Work Phone"
//                   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//               <div className="w-full px-3">
//                 <textarea
//                   placeholder="Enter your message here*"
//                   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
//                   rows="4"
//                 ></textarea>
//               </div>
//             </form>
//             <button className="bg-[#ef4a60] text-white font-semibold mt-6 py-3 px-8 rounded-lg hover:bg-pink-600">
//               Send Message
//             </button>
//           </div>

//           {/* Contact Information Section */}
//           <div className="flex-1 bg-white shadow-lg p-8 rounded-lg">
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-semibold">Contact Info</h3>
//                 <p className="text-sm text-gray-600 mt-2">
//                   <a href="mailto:contact@style.me" className="text-[#ef4a60]">
//                     contact@style.me
//                   </a>
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold">North America</h3>
//                 <p className="text-sm text-gray-600">
//                   New York, US
//                   <br />
//                   124 9th Street, Unit 3-286
//                   <br />
//                   Brooklyn, NY 11215
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold">Asia</h3>
//                 <p className="text-sm text-gray-600">
//                   Taipei, Taiwan
//                   <br />
//                   7F, No. 105, Songren Road,
//                   <br />
//                   Xinyi District
//                 </p>
//               </div>
//               <div className="flex space-x-4">
//                 <a href="#" className="text-gray-600 hover:text-pink-500">
//                   <i className="fab fa-linkedin"></i>
//                 </a>
//                 <a href="#" className="text-gray-600 hover:text-pink-500">
//                   <i className="fab fa-twitter"></i>
//                 </a>
//                 <a href="#" className="text-gray-600 hover:text-pink-500">
//                   <i className="fab fa-youtube"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;


// import React from "react";

// const ContactPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header Section */}
//       <div className="relative">
//   <div
//     className="absolute inset-0 bg-cover bg-center"
//     style={{
//       backgroundImage: "url('https://style.me/wp-content/uploads/2021/01/city-view-new-york.jpg')",
//     }}
//   >
//     <div className="absolute inset-0 bg-black opacity-50"></div>
//   </div>
//   <div
//     className="relative text-left text-white py-28 pl-4"
//     // Increased padding to make the header taller
//   >
//     <h2 className="text-pink-500 text-lg font-semibold uppercase">
//       Get In Touch
//     </h2>
//     <h1 className="text-4xl font-bold mb-4">Ask us anything!<br/> We'd love to hear from you.</h1>
//     <p className="text-lg">
//       We’re confident you’ll find Style.me to be the
//       perfect fit.
//     </p>
//   </div>
// </div>


//       {/* Form Positioned Over Header */}
//       <div className="relative -mt-28 z-10 container mx-auto px-4">
//         <div className="bg-white shadow-lg p-8 rounded-lg mx-auto max-w-4xl">
//           <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <input
//               type="text"
//               placeholder="First Name"
//               className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
//             />
//             <input
//               type="text"
//               placeholder="Last Name"
//               className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
//             />
//             <select
//               className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
//             >
//               <option>Select Country*</option>
//               <option>United States</option>
//               <option>Canada</option>
//               <option>Other</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Company Name*"
//               className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
//             />
//             <input
//               type="email"
//               placeholder="Email*"
//               className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
//             />
//             <input
//               type="tel"
//               placeholder="Work Phone"
//               className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
//             />
//             <textarea
//               placeholder="Enter your message here*"
//               className="col-span-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
//               rows="4"
//             ></textarea>
//           </form>
//           <button className="bg-pink-500 text-white font-semibold mt-6 py-3 px-8 rounded-lg hover:bg-pink-600">
//             Send Message
//           </button>
//         </div>
//       </div>

//       {/* Contact Information Section */}
//       <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
//         {/* Contact Information */}
//         <div className="bg-white shadow-lg p-8 rounded-lg space-y-6">
//           <div>
//             <h3 className="text-lg font-semibold">Contact Info</h3>
//             <p className="text-sm text-gray-600 mt-2">
//               <a href="mailto:contact@style.me" className="text-pink-500">
//                 contact@style.me
//               </a>
//             </p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">North America</h3>
//             <p className="text-sm text-gray-600">
//               New York, US
//               <br />
//               124 9th Street, Unit 3-286
//               <br />
//               Brooklyn, NY 11215
//             </p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">Asia</h3>
//             <p className="text-sm text-gray-600">
//               Taipei, Taiwan
//               <br />
//               7F, No. 105, Songren Road,
//               <br />
//               Xinyi District
//             </p>
//           </div>
//           <div className="flex space-x-4">
//             <a href="#" className="text-gray-600 hover:text-pink-500">
//               <i className="fab fa-linkedin"></i>
//             </a>
//             <a href="#" className="text-gray-600 hover:text-pink-500">
//               <i className="fab fa-twitter"></i>
//             </a>
//             <a href="#" className="text-gray-600 hover:text-pink-500">
//               <i className="fab fa-youtube"></i>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;
