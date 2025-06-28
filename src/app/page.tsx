"use client";

import { useState, useMemo } from "react";
import { sampleImages } from "../data/sampleImages";
import { ImageMetadata, SearchFilters } from "../types/image";
import {
  groupImagesByYearMonth,
  filterImages,
  getAllTags,
} from "../utils/imageUtils";
import SearchBar from "../components/SearchBar";
import ImageGroup from "../components/ImageGroup";
import ImageDetail from "../components/ImageDetail";

export default function Home() {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: "",
    tags: [],
  });
  const [selectedImage, setSelectedImage] = useState<ImageMetadata | null>(
    null
  );

  // Get all available tags for the search component
  const allTags = useMemo(() => getAllTags(sampleImages), []);

  // Filter images based on search criteria
  const filteredImages = useMemo(() => {
    return filterImages(sampleImages, searchFilters);
  }, [searchFilters]);

  // Group filtered images by year/month
  const imageGroups = useMemo(() => {
    return groupImagesByYearMonth(filteredImages);
  }, [filteredImages]);

  const handleImageClick = (image: ImageMetadata) => {
    setSelectedImage(image);
  };

  const handleCloseDetail = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Image Gallery</h1>
          <p className="mt-2 text-gray-600">
            Browse and search through your image collection
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <SearchBar allTags={allTags} onSearch={setSearchFilters} />

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredImages.length} image
            {filteredImages.length !== 1 ? "s" : ""}
            {searchFilters.query && ` matching "${searchFilters.query}"`}
            {searchFilters.tags.length > 0 &&
              ` with tags: ${searchFilters.tags.join(", ")}`}
          </p>
        </div>

        {/* Image Groups */}
        {imageGroups.length > 0 ? (
          <div className="space-y-8">
            {imageGroups.map((group) => (
              <ImageGroup
                key={`${group.year}-${group.month}`}
                group={group}
                onImageClick={handleImageClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No images found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or clearing the filters.
            </p>
          </div>
        )}
      </main>

      {/* Image Detail Modal */}
      <ImageDetail image={selectedImage} onClose={handleCloseDetail} />
    </div>
  );
}
