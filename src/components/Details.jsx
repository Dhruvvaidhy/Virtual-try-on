import React from "react";

const Details = () => {
  return (
    <div className="bg-gray-100 py-16 px-8">
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        {/* Left Side - Details */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            How to use Try-on Diffusion
          </h2>
          <p className="text-gray-700 mb-4">
            <strong>1. Input Image:</strong> Provide an image of a person.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>2. Cloth Image:</strong> Upload a clothing image, preferably with a white or transparent background. Ensure the image contains only the clothing piece.
          </p>
          <ul className="text-gray-700 list-disc pl-6 space-y-2">
            <li>
              <strong>Upper Body:</strong> Overlay clothing items such as t-shirts, tank tops, shirts, jackets, etc.
            </li>
            <li>
              <strong>Lower Body:</strong> Overlay lower body clothing items like pants, trousers, skirts, shorts, etc.
            </li>
            <li>
              <strong>Full Body:</strong> Overlay a complete dress on a person's image.
            </li>
          </ul>
        </div>

        {/* Right Side - Image */}
        <div className="lg:w-1/2">
          <img
            src="https://via.placeholder.com/500x400"
            alt="Try-on Diffusion Example"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
