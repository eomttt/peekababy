"use client";

import { ImageMetadata } from "../types/image";
import { formatFileSize, formatDate } from "../utils/imageUtils";

interface ImageThumbnailProps {
  image: ImageMetadata;
  onClick: (image: ImageMetadata) => void;
}

export default function ImageThumbnail({
  image,
  onClick,
}: ImageThumbnailProps) {
  return (
    <div
      className="group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
      onClick={() => onClick(image)}
    >
      {/* Image Placeholder */}
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-12 h-12 text-gray-400 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-xs text-gray-500">
            {image.dimensions.width} × {image.dimensions.height}
          </p>
        </div>
      </div>

      {/* Overlay with image info */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-end">
        <div className="w-full p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <h3 className="font-semibold text-sm mb-1 truncate">{image.title}</h3>
          <p className="text-xs text-gray-300 mb-2">
            {formatDate(image.dateTaken)}
          </p>
          <div className="flex flex-wrap gap-1">
            {image.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-white bg-opacity-20 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {image.tags.length > 2 && (
              <span className="px-2 py-1 bg-white bg-opacity-20 rounded text-xs">
                +{image.tags.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* File size badge */}
      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
        {formatFileSize(image.fileSize)}
      </div>
    </div>
  );
}
