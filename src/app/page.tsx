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
import { Search } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-foreground">Image Gallery</h1>
          <p className="mt-2 text-muted-foreground">
            Browse and search through your image collection
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="pb-6">
          <SearchBar onSearch={setSearchFilters} />

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredImages.length} image
              {filteredImages.length !== 1 ? "s" : ""}
              {searchFilters.query && ` matching "${searchFilters.query}"`}
              {searchFilters.tags.length > 0 &&
                ` with tags: ${searchFilters.tags.join(", ")}`}
            </p>
          </div>
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
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No images found
            </h3>
            <p className="text-muted-foreground">
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
