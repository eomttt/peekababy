export interface ImageMetadata {
  id: string;
  filename: string;
  path: string;
  title: string;
  description?: string;
  tags: string[];
  dateTaken: Date;
  fileSize: number;
  dimensions: {
    width: number;
    height: number;
  };
}

export interface ImageGroup {
  year: number;
  month: number;
  monthName: string;
  images: ImageMetadata[];
}

export interface SearchFilters {
  query: string;
  tags: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}
