import { useState } from "react";
import { FaUpload, FaTrash } from "react-icons/fa";

export default function VirtualFitTool() {
  const [category, setCategory] = useState("Upper body");
  const [modelImage, setModelImage] = useState(null);
  const [clothesImage, setClothesImage] = useState(null);

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

  return (
    <div
      className="p-4 sm:p-6 min-h-screen flex justify-center items-center bg-[url('https://m.media-amazon.com/images/S/aplus-media-library-service-media/75420914-cfb8-4aca-9a37-90144e61b9c9.__CR0,0,1464,625_PT0_SX1464_V1___.png')] bg-cover bg-center"
    >
      <div className="backdrop-blur-lg shadow-lg border border-white/20 rounded-lg p-4 sm:p-6 flex flex-col md:flex-row max-w-6xl w-full gap-6">
        
        {/* Left Section */}
        <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/20 pb-4 md:pb-0">
          
          {/* Model Image Upload */}
          <div className="border border-white/20 bg-white/30 backdrop-blur-lg p-4 rounded-lg text-center mb-4">
            <p className="text-lg font-semibold mb-2">Model Image</p>
            <div className="border-2 border-white/20 p-4 rounded-lg relative h-40 flex items-center justify-center">
              {modelImage ? (
                <img src={modelImage} alt="Model" className="max-w-full max-h-full object-contain rounded-lg" />
              ) : (
                <p className="text-gray-200">No Image Uploaded</p>
              )}
              <div className="absolute bottom-2 flex gap-3">
                <label className="p-2 bg-gray-200 rounded-full cursor-pointer">
                  <FaUpload size={20} />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setModelImage)} />
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
            <p className="text-lg font-semibold mb-2">Clothes Image</p>
            <div className="border-2 border-white/20 p-4 rounded-lg relative h-40 flex items-center justify-center">
              {clothesImage ? (
                <img src={clothesImage} alt="Clothes" className="max-w-full max-h-full object-contain rounded-lg" />
              ) : (
                <p className="text-gray-200">No Image Uploaded</p> 
              )}
              <div className="absolute bottom-2 flex gap-3">
                <label className="p-2 bg-gray-200 rounded-full cursor-pointer">
                  <FaUpload size={20} />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setClothesImage)} />
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
            <select className="w-full p-2 border rounded-lg mt-2 bg-white/30 backdrop-blur-lg border-white/20 text-black" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Upper body</option>
              <option>Lower body</option>
              <option>Full body</option>
            </select> 
          </div>

          {/* Generate Button */}
          <button className="w-full bg-purple-600 text-white p-3 rounded-lg mt-4">
            Generate
          </button>  
        </div>

        {/* Right Section - Output Image */}
        <div className="w-full md:w-2/3">
          <p className="text-lg font-semibold text-center text-white">Generated Output</p>
          <div className="border border-white/20 bg-white/20 backdrop-blur-lg p-4 rounded-lg mt-2 h-96 flex items-center justify-center">
            <img src="/output-placeholder.png" alt="Output" className="max-w-full max-h-full object-contain rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
