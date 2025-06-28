"use client";

import { ImageMetadata } from "../types/image";
import { formatFileSize, formatDate } from "../utils/imageUtils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Image, Calendar, FileText, HardDrive, Monitor } from "lucide-react";

interface ImageDetailProps {
  image: ImageMetadata | null;
  onClose: () => void;
}

export default function ImageDetail({ image, onClose }: ImageDetailProps) {
  return (
    <Dialog open={!!image} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{image?.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image */}
          <Card>
            <CardContent className="p-6">
              <div className="bg-muted rounded-lg flex items-center justify-center aspect-square">
                <div className="text-center">
                  <Image className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    {image?.dimensions.width} × {image?.dimensions.height}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Filename:</span>
                    <span className="font-mono text-foreground">
                      {image?.filename}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Date Taken:
                    </span>
                    <span className="text-foreground">
                      {image && formatDate(image.dateTaken)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center">
                      <HardDrive className="w-4 h-4 mr-1" />
                      File Size:
                    </span>
                    <span className="text-foreground">
                      {image && formatFileSize(image.fileSize)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center">
                      <Monitor className="w-4 h-4 mr-1" />
                      Dimensions:
                    </span>
                    <span className="text-foreground">
                      {image?.dimensions.width} × {image?.dimensions.height}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {image?.description && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{image.description}</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {image?.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
