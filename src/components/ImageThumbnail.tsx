"use client";

import { ImageMetadata } from "../types/image";
import { formatFileSize, formatDate } from "../utils/imageUtils";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Image, Calendar } from "lucide-react";

interface ImageThumbnailProps {
  image: ImageMetadata;
  onClick: (image: ImageMetadata) => void;
}

export default function ImageThumbnail({
  image,
  onClick,
}: ImageThumbnailProps) {
  return (
    <Card
      className="group relative overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
      onClick={() => onClick(image)}
    >
      <CardContent className="p-0">
        {/* Image Placeholder */}
        <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
          <div className="text-center">
            <Image className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">
              {image.dimensions.width} × {image.dimensions.height}
            </p>
          </div>
        </div>

        {/* Overlay with image info */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-end">
          <div className="w-full p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
            <h3 className="font-semibold text-sm mb-1 truncate">
              {image.title}
            </h3>
            <div className="flex items-center text-xs text-muted-foreground mb-2">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(image.dateTaken)}
            </div>
            <div className="flex flex-wrap gap-1">
              {image.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-white/20 hover:bg-white/30"
                >
                  {tag}
                </Badge>
              ))}
              {image.tags.length > 2 && (
                <Badge variant="secondary" className="text-xs bg-white/20">
                  +{image.tags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* File size badge */}
        <div className="absolute top-2 right-2">
          <Badge
            variant="secondary"
            className="text-xs bg-black/50 text-white border-0"
          >
            {formatFileSize(image.fileSize)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
