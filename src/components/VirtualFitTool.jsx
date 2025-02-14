import { useState } from "react";
import axios from "axios";
import { FaUpload, FaTrash, FaDownload } from "react-icons/fa";
import { useSelector } from "react-redux";


export default function VirtualFitTool() {
  const [category, setCategory] = useState("Upper body");
  const [modelImage, setModelImage] = useState(null);
  const [clothesImage, setClothesImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [loading, setLoading] = useState(false);
 



  const api_key = "SG_15ae1b9c16b00d64"; // Replace with actual API key
  const url = "https://api.segmind.com/v1/try-on-diffusion";

  // Convert file to Base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  // Handle Image Upload
  const handleImageUpload = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  // Handle Image Delete
  const handleDeleteImage = (setImage) => {
    setImage(null);
  };

  // Handle Generate Button Click
  const handleGenerate = async () => {
    if (!modelImage || !clothesImage) {
      alert("Please upload both Model and Clothes images.");
      return;
    }

    setLoading(true);
    setOutputImage(null);

    try {
      // Convert images to Base64
      const modelBase64 = await fileToBase64(document.querySelector("#modelImageInput").files[0]);
      const clothesBase64 = await fileToBase64(document.querySelector("#clothesImageInput").files[0]);

      // Request Payload
      const data = {
        model_image: modelBase64,
        cloth_image: clothesBase64,
        category: category,
        num_inference_steps: 35,
        guidance_scale: 2,
        seed: 12467,
        base64: true,
      };

      // API Request
      const response = await axios.post(url, data, {
        headers: { "x-api-key": api_key },
      });

      // Set Output Image
      setOutputImage(`data:image/png;base64,${response.data.image}`);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };


  const user = useSelector((state) => state.auth.user);

  const handleDownload = () => {
    if (!user) {
      alert("You must be logged in to download the generated image.");
      return;
    }
    if (outputImage) {
      const link = document.createElement("a");
      link.href = outputImage;
      link.download = "generated_outfit.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  // // Handle Image Download
  // const handleDownload = () => {
  //   if (outputImage) {
  //     const link = document.createElement("a");
  //     link.href = outputImage;
  //     link.download = "generated_outfit.png";
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   }
  // };

  return (
    <div className="p-4 sm:p-6 min-h-screen flex justify-center items-center bg-[url('https://m.media-amazon.com/images/S/aplus-media-library-service-media/75420914-cfb8-4aca-9a37-90144e61b9c9.__CR0,0,1464,625_PT0_SX1464_V1___.png')] bg-cover bg-center">
      <div className="backdrop-blur-lg shadow-lg border border-white/20 rounded-lg p-4 sm:p-6 flex flex-col md:flex-row max-w-6xl w-full gap-6">
        
        {/* Left Section */}
        <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/20 pb-4 md:pb-0">
          
          {/* Model Image Upload */}
          <div className="border border-white/20 bg-white/30 backdrop-blur-lg p-4 rounded-lg text-center mb-4">
            <p className="text-lg font-semibold mb-2 text-white">Model Image</p>
            <div className="border-2 border-white/20 p-4 rounded-lg relative h-40 flex items-center justify-center">
              {modelImage ? (
                <img src={modelImage} alt="Model" className="max-w-full max-h-full object-contain rounded-lg" />
              ) : (
                <p className="text-gray-200">No Image Uploaded</p>
              )}
              <div className="absolute bottom-2 flex gap-3">
                <label className="p-2 bg-gray-200 rounded-full cursor-pointer">
                  <FaUpload size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="modelImageInput"
                    onChange={(e) => handleImageUpload(e, setModelImage)}
                  />
                </label>
                {modelImage && (
                  <button className="p-2 bg-red-500 text-white rounded-full" onClick={() => handleDeleteImage(setModelImage)}>
                    <FaTrash size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Clothes Image Upload */}
          <div className="border border-white/20 bg-white/30 backdrop-blur-lg p-4 rounded-lg text-center mb-4">
            <p className="text-lg font-semibold mb-2 text-white">Clothes Image</p>
            <div className="border-2 border-white/20 p-4 rounded-lg relative h-40 flex items-center justify-center">
              {clothesImage ? (
                <img src={clothesImage} alt="Clothes" className="max-w-full max-h-full object-contain rounded-lg" />
              ) : (
                <p className="text-gray-200">No Image Uploaded</p>
              )}
              <div className="absolute bottom-2 flex gap-3">
                <label className="p-2 bg-gray-200 rounded-full cursor-pointer">
                  <FaUpload size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="clothesImageInput"
                    onChange={(e) => handleImageUpload(e, setClothesImage)}
                  /> 
                </label> 
                {clothesImage && (
                  <button className="p-2 bg-red-500 text-white rounded-full" onClick={() => handleDeleteImage(setClothesImage)}>
                    <FaTrash size={20} />
                  </button>
                )} 
              </div>
            </div>
          </div>

          {/* Category Selection */}
          <div className="mb-4">
            <label className="block text-lg font-semibold text-white">Category</label>
            <select
              className="w-full p-2 border rounded-lg mt-2 bg-white/30 backdrop-blur-lg border-white/20 text-black"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Upper body">Upper Body</option>
              <option value="Lower body">Lower Body</option>
              <option value="Dress">Full Body</option>
            </select>
          </div> 

          {/* Generate Button */}
          <button
            className="w-full bg-purple-600 text-white p-3 rounded-lg mt-4"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button> 
        </div>

        {/* Right Section - Output Image & Download */}
        <div className="w-full md:w-2/3 text-center">
          <p className="text-lg font-semibold text-white">Generated Output</p>
          <div className="border border-white/20 bg-white/20 backdrop-blur-lg p-4 rounded-lg mt-2 h-104 flex items-center justify-center relative">
            {outputImage && (
              <>
                <img src={outputImage} alt="Output" className="max-w-full max-h-full object-contain rounded-lg" />
                <button
                  className="absolute top-2 right-2 bg-green-600 text-white p-3 rounded-full flex items-center cursor-pointer"
                  onClick={handleDownload}
                >
                  <FaDownload size={20} />
                </button>
              </>
            )}
          </div>
        </div> 
      </div>
    </div>
  );
}



// import { useState } from "react";
// import axios from "axios";
// import { FaUpload, FaTrash } from "react-icons/fa";

// export default function VirtualFitTool() {
//   const [category, setCategory] = useState("Upper body");
//   const [modelImage, setModelImage] = useState(null);
//   const [clothesImage, setClothesImage] = useState(null);
//   const [outputImage, setOutputImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const api_key = "SG_15ae1b9c16b00d64"; // Replace with actual API key
//   const url = "https://api.segmind.com/v1/try-on-diffusion";

//   // Convert file to Base64
//   const fileToBase64 = (file) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result.split(",")[1]);
//       reader.onerror = (error) => reject(error);
//     });

//   // Handle Image Upload
//   const handleImageUpload = (event, setImage) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setImage(imageUrl);
//     }
//   };

//   // Handle Image Delete
//   const handleDeleteImage = (setImage) => {
//     setImage(null);
//   };

//   // Handle Generate Button Click
//   const handleGenerate = async () => {
//     if (!modelImage || !clothesImage) {
//       alert("Please upload both Model and Clothes images.");
//       return;
//     }

//     setLoading(true);
//     setOutputImage(null);

//     try {
//       // Convert images to Base64
//       const modelBase64 = await fileToBase64(document.querySelector("#modelImageInput").files[0]);
//       const clothesBase64 = await fileToBase64(document.querySelector("#clothesImageInput").files[0]);

//       // Request Payload
//       const data = {
//         model_image: modelBase64,
//         cloth_image: clothesBase64,
//         category: category,
//         num_inference_steps: 35,
//         guidance_scale: 2,
//         seed: 12467,
//         base64: true,
//       };

//       // API Request
//       const response = await axios.post(url, data, {
//         headers: { "x-api-key": api_key },
//       });

//       // Set Output Image
//       setOutputImage(`data:image/png;base64,${response.data.image}`);
//     } catch (error) {
//       console.error("Error:", error.response ? error.response.data : error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 sm:p-6 min-h-screen flex justify-center items-center bg-[url('https://m.media-amazon.com/images/S/aplus-media-library-service-media/75420914-cfb8-4aca-9a37-90144e61b9c9.__CR0,0,1464,625_PT0_SX1464_V1___.png')] bg-cover bg-center">
//       <div className="backdrop-blur-lg shadow-lg border border-white/20 rounded-lg p-4 sm:p-6 flex flex-col md:flex-row max-w-6xl w-full gap-6">
        
//         {/* Left Section */}
//         <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/20 pb-4 md:pb-0">
          
//           {/* Model Image Upload */}
//           <div className="border border-white/20 bg-white/30 backdrop-blur-lg p-4 rounded-lg text-center mb-4">
//             <p className="text-lg font-semibold mb-2 text-white">Model Image</p>
//             <div className="border-2 border-white/20 p-4 rounded-lg relative h-40 flex items-center justify-center">
//               {modelImage ? (
//                 <img src={modelImage} alt="Model" className="max-w-full max-h-full object-contain rounded-lg" />
//               ) : (
//                 <p className="text-gray-200">No Image Uploaded</p>
//               )}
//               <div className="absolute bottom-2 flex gap-3">
//                 <label className="p-2 bg-gray-200 rounded-full cursor-pointer">
//                   <FaUpload size={20} />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     id="modelImageInput"
//                     onChange={(e) => handleImageUpload(e, setModelImage)}
//                   />
//                 </label>
//                 {modelImage && (
//                   <button className="p-2 bg-red-500 text-white rounded-full" onClick={() => handleDeleteImage(setModelImage)}>
//                     <FaTrash size={20} />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Clothes Image Upload */}
//           <div className="border border-white/20 bg-white/30 backdrop-blur-lg p-4 rounded-lg text-center mb-4">
//             <p className="text-lg font-semibold mb-2 text-white">Clothes Image</p>
//             <div className="border-2 border-white/20 p-4 rounded-lg relative h-40 flex items-center justify-center">
//               {clothesImage ? (
//                 <img src={clothesImage} alt="Clothes" className="max-w-full max-h-full object-contain rounded-lg" />
//               ) : (
//                 <p className="text-gray-200">No Image Uploaded</p>
//               )}
//               <div className="absolute bottom-2 flex gap-3">
//                 <label className="p-2 bg-gray-200 rounded-full cursor-pointer">
//                   <FaUpload size={20} />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     id="clothesImageInput"
//                     onChange={(e) => handleImageUpload(e, setClothesImage)}
//                   /> 
//                 </label> 
//                 {clothesImage && (
//                   <button className="p-2 bg-red-500 text-white rounded-full" onClick={() => handleDeleteImage(setClothesImage)}>
//                     <FaTrash size={20} />
//                   </button>
//                 )} 
//               </div>
//             </div>
//           </div>

//           {/* Category Selection */}
//           <div className="mb-4">
//             <label className="block text-lg font-semibold text-white">Category</label>
//             <select
//               className="w-full p-2 border rounded-lg mt-2 bg-white/30 backdrop-blur-lg border-white/20 text-black"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             >
//               <option value="Upper body">Upper Body</option>
//               <option value="Lower body">Lower Body</option>
//               <option value="Dress">Full Body</option>
//             </select>
//           </div> 

//           {/* Generate Button */}
//           <button
//             className="w-full bg-purple-600 text-white p-3 rounded-lg mt-4"
//             onClick={handleGenerate}
//             disabled={loading}
//           >
//             {loading ? "Generating..." : "Generate"}
//           </button> 
//         </div>

//         {/* Right Section - Output Image */}
//         <div className="w-full md:w-2/3 text-center">
//           <p className="text-lg font-semibold text-white">Generated Output</p>
//           <div className="border border-white/20 bg-white/20 backdrop-blur-lg p-4 rounded-lg mt-2 h-104 flex items-center justify-center">
//             {loading ? (
//               <div className="flex flex-col items-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
//                 <p className="mt-2 text-white">Generating...</p>
//               </div>
//             ) : outputImage ? (
//               <img src={outputImage} alt="Output" className="max-w-full max-h-full object-contain rounded-lg" />
//             ) : (
//               <p className="text-gray-200">Output will appear here</p>
//             )}
//           </div>
//         </div> 
//       </div>
//     </div>
//   );
// }




// import { useState } from "react";
// import axios from "axios";
// import { FaUpload, FaTrash } from "react-icons/fa";

// export default function VirtualFitTool() {
//   const [category, setCategory] = useState("Upper body");
//   const [modelImage, setModelImage] = useState(null);
//   const [clothesImage, setClothesImage] = useState(null);
//   const [outputImage, setOutputImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const api_key = "SG_15ae1b9c16b00d64"; // Replace with actual API key
//   const url = "https://api.segmind.com/v1/try-on-diffusion";

//   // Convert file to Base64
//   const fileToBase64 = (file) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result.split(",")[1]);
//       reader.onerror = (error) => reject(error);
//     });

//   // Handle Image Upload
//   const handleImageUpload = (event, setImage) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setImage(imageUrl);
//     }
//   };

//   // Handle Image Delete
//   const handleDeleteImage = (setImage) => {
//     setImage(null);
//   };

//   // Handle Generate Button Click
//   const handleGenerate = async () => {
//     if (!modelImage || !clothesImage) {
//       alert("Please upload both Model and Clothes images.");
//       return;
//     }

//     setLoading(true);
//     setOutputImage(null);

//     try {
//       // Convert images to Base64
//       const modelBase64 = await fileToBase64(document.querySelector("#modelImageInput").files[0]);
//       const clothesBase64 = await fileToBase64(document.querySelector("#clothesImageInput").files[0]);

//       // Request Payload
//       const data = {
//         model_image: modelBase64,
//         cloth_image: clothesBase64,
//         category: category,
//         num_inference_steps: 35,
//         guidance_scale: 2,
//         seed: 12467,
//         base64: true, // Get the result as Base64
//       };

//       // API Request
//       const response = await axios.post(url, data, {
//         headers: { "x-api-key": api_key },
//       });

//       // Set Output Image
//       setOutputImage(`data:image/png;base64,${response.data.image}`);
//     } catch (error) {
//       console.error("Error:", error.response ? error.response.data : error.message);
//     } finally {
//       setLoading(false);
//     }
//   };  

//   return (
//     <div className="p-4 sm:p-6 min-h-screen flex justify-center items-center bg-[url('https://m.media-amazon.com/images/S/aplus-media-library-service-media/75420914-cfb8-4aca-9a37-90144e61b9c9.__CR0,0,1464,625_PT0_SX1464_V1___.png')] bg-cover bg-center">
//       <div className="backdrop-blur-lg shadow-lg border border-white/20 rounded-lg p-4 sm:p-6 flex flex-col md:flex-row max-w-6xl w-full gap-6">
        
//         {/* Left Section */}
//         <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/20 pb-4 md:pb-0">
          
//           {/* Model Image Upload */}
//           <div className="border border-white/20 bg-white/30 backdrop-blur-lg p-4 rounded-lg text-center mb-4">
//             <p className="text-lg font-semibold mb-2 text-white">Model Image</p>
//             <div className="border-2 border-white/20 p-4 rounded-lg relative h-40 flex items-center justify-center">
//               {modelImage ? (
//                 <img src={modelImage} alt="Model" className="max-w-full max-h-full object-contain rounded-lg" />
//               ) : (
//                 <p className="text-gray-200">No Image Uploaded</p>
//               )}
//               <div className="absolute bottom-2 flex gap-3">
//                 <label className="p-2 bg-gray-200 rounded-full cursor-pointer">
//                   <FaUpload size={20} />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     id="modelImageInput"
//                     onChange={(e) => handleImageUpload(e, setModelImage)}
//                   />
//                 </label>
//                 {modelImage && (
//                   <button className="p-2 bg-red-500 text-white rounded-full" onClick={() => handleDeleteImage(setModelImage)}>
//                     <FaTrash size={20} />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Clothes Image Upload */}
//           <div className="border border-white/20 bg-white/30 backdrop-blur-lg p-4 rounded-lg text-center mb-4">
//             <p className="text-lg font-semibold mb-2 text-white">Clothes Image</p>
//             <div className="border-2 border-white/20 p-4 rounded-lg relative h-40 flex items-center justify-center">
//               {clothesImage ? (
//                 <img src={clothesImage} alt="Clothes" className="max-w-full max-h-full object-contain rounded-lg" />
//               ) : (
//                 <p className="text-gray-200">No Image Uploaded</p>
//               )}
//               <div className="absolute bottom-2 flex gap-3">
//                 <label className="p-2 bg-gray-200 rounded-full cursor-pointer">
//                   <FaUpload size={20} />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     id="clothesImageInput"
//                     onChange={(e) => handleImageUpload(e, setClothesImage)}
//                   /> 
//                 </label> 
//                 {clothesImage && (
//                   <button className="p-2 bg-red-500 text-white rounded-full" onClick={() => handleDeleteImage(setClothesImage)}>
//                     <FaTrash size={20} />
//                   </button>
//                 )} 
//               </div>
//             </div>
//           </div>

//           {/* Category Selection */}
//           <div className="mb-4">
//             <label className="block text-lg font-semibold text-white">Category</label>
//             <select
//               className="w-full p-2 border rounded-lg mt-2 bg-white/30 backdrop-blur-lg border-white/20 text-black"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             >
//               <option value="Upper body">Upper Body</option>
//               <option value="Lower body">Lower Body</option>
//               <option value="Dress">Full Body</option>
//             </select>
//           </div> 

//           {/* Generate Button */}
//           <button
//             className="w-full bg-purple-600 text-white p-3 rounded-lg mt-4"
//             onClick={handleGenerate}
//             disabled={loading}
//           >
//             {loading ? "Generating..." : "Generate"}
//           </button> 
//         </div>

//         {/* Right Section - Output Image */}
//         <div className="w-full md:w-2/3">
//           <p className="text-lg font-semibold text-center text-white">Generated Output</p>
//           <div className="border border-white/20 bg-white/20 backdrop-blur-lg p-4 rounded-lg mt-2 h-104 flex items-center justify-center">
//             {outputImage ? (
//               <img src={outputImage} alt="Output" className="max-w-full max-h-full object-contain rounded-lg" />
//             ) : (
//               <p className="text-gray-900">{loading ? "Generating..." : "Output will appear here"}</p>
//             )}
//           </div>
//         </div> 
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";
// import { FaUpload, FaTrash } from "react-icons/fa";

// export default function VirtualFitTool() {
//   const [category, setCategory] = useState("Upper body");
//   const [modelImage, setModelImage] = useState(null);
//   const [clothesImage, setClothesImage] = useState(null);

//   // Handle Image Upload
//   const handleImageUpload = (event, setImage) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setImage(imageUrl);
//     }
//   };

//   // Handle Image Delete
//   const handleDeleteImage = (setImage) => {
//     setImage(null);
//   };

//   return (
//     <div
//       className="p-4 sm:p-6 min-h-screen flex justify-center items-center bg-[url('https://m.media-amazon.com/images/S/aplus-media-library-service-media/75420914-cfb8-4aca-9a37-90144e61b9c9.__CR0,0,1464,625_PT0_SX1464_V1___.png')] bg-cover bg-center"
//     >
//       <div className="backdrop-blur-lg shadow-lg border border-white/20 rounded-lg p-4 sm:p-6 flex flex-col md:flex-row max-w-6xl w-full gap-6">
        
//         {/* Left Section */}
//         <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/20 pb-4 md:pb-0">
          
//           {/* Model Image Upload */}
//           <div className="border border-white/20 bg-white/30 backdrop-blur-lg p-4 rounded-lg text-center mb-4">
//             <p className="text-lg font-semibold mb-2">Model Image</p>
//             <div className="border-2 border-white/20 p-4 rounded-lg relative h-40 flex items-center justify-center">
//               {modelImage ? (
//                 <img src={modelImage} alt="Model" className="max-w-full max-h-full object-contain rounded-lg" />
//               ) : (
//                 <p className="text-gray-200">No Image Uploaded</p>
//               )}
//               <div className="absolute bottom-2 flex gap-3">
//                 <label className="p-2 bg-gray-200 rounded-full cursor-pointer">
//                   <FaUpload size={20} />
//                   <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setModelImage)} />
//                 </label>
//                 {modelImage && (
//                   <button className="p-2 bg-red-500 text-white rounded-full" onClick={() => handleDeleteImage(setModelImage)}>
//                     <FaTrash size={20} />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Clothes Image Upload */}
//           <div className="border border-white/20 bg-white/30 backdrop-blur-lg p-4 rounded-lg text-center mb-4">
//             <p className="text-lg font-semibold mb-2">Clothes Image</p>
//             <div className="border-2 border-white/20 p-4 rounded-lg relative h-40 flex items-center justify-center">
//               {clothesImage ? (
//                 <img src={clothesImage} alt="Clothes" className="max-w-full max-h-full object-contain rounded-lg" />
//               ) : (
//                 <p className="text-gray-200">No Image Uploaded</p> 
//               )}
//               <div className="absolute bottom-2 flex gap-3">
//                 <label className="p-2 bg-gray-200 rounded-full cursor-pointer">
//                   <FaUpload size={20} />
//                   <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setClothesImage)} />
//                 </label>
//                 {clothesImage && (
//                   <button className="p-2 bg-red-500 text-white rounded-full" onClick={() => handleDeleteImage(setClothesImage)}>
//                     <FaTrash size={20} />
//                   </button>
//                 )}  
//               </div>
//             </div>
//           </div>

//           {/* Category Selection */}
//           <div className="mb-4">
//             <label className="block text-lg font-semibold text-white">Category</label>
//             <select className="w-full p-2 border rounded-lg mt-2 bg-white/30 backdrop-blur-lg border-white/20 text-black" value={category} onChange={(e) => setCategory(e.target.value)}>
//               <option>Upper body</option>
//               <option>Lower body</option>
//               <option>Full body</option>
//             </select> 
//           </div>

//           {/* Generate Button */}
//           <button className="w-full bg-purple-600 text-white p-3 rounded-lg mt-4">
//             Generate
//           </button>  
//         </div>

//         {/* Right Section - Output Image */}
//         <div className="w-full md:w-2/3">
//           <p className="text-lg font-semibold text-center text-white">Generated Output</p>
//           <div className="border border-white/20 bg-white/20 backdrop-blur-lg p-4 rounded-lg mt-2 h-96 flex items-center justify-center">
//             <img src="/output-placeholder.png" alt="Output" className="max-w-full max-h-full object-contain rounded-lg" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
