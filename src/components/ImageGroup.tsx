"use client";

import { ImageGroup as ImageGroupType, ImageMetadata } from "../types/image";
import ImageThumbnail from "./ImageThumbnail";

interface ImageGroupProps {
  group: ImageGroupType;
  onImageClick: (image: ImageMetadata) => void;
}

export default function ImageGroup({ group, onImageClick }: ImageGroupProps) {
  return (
    <div className="mb-12">
      {/* Group Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 mb-6 border-b border-border -mx-4 px-4">
        <h2 className="text-2xl font-bold text-foreground">
          {group.monthName} {group.year}
        </h2>
        <p className="text-muted-foreground">
          {group.images.length} image{group.images.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Image Grid - Checkerboard Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 auto-rows-fr">
        {group.images.map((image) => (
          <div key={image.id} className="w-full">
            <ImageThumbnail image={image} onClick={onImageClick} />
          </div>
        ))}
      </div>
    </div>
  );
}
