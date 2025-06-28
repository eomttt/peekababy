import { ImageMetadata, ImageGroup, SearchFilters } from "../types/image";

export function groupImagesByYearMonth(images: ImageMetadata[]): ImageGroup[] {
  const groups: { [key: string]: ImageGroup } = {};

  images.forEach((image) => {
    const year = image.dateTaken.getFullYear();
    const month = image.dateTaken.getMonth();
    const monthName = image.dateTaken.toLocaleDateString("en-US", {
      month: "long",
    });
    const key = `${year}-${month}`;

    if (!groups[key]) {
      groups[key] = {
        year,
        month,
        monthName,
        images: [],
      };
    }

    groups[key].images.push(image);
  });

  // Sort images within each group by date
  Object.values(groups).forEach((group) => {
    group.images.sort((a, b) => b.dateTaken.getTime() - a.dateTaken.getTime());
  });

  // Convert to array and sort by year/month (newest first)
  return Object.values(groups).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });
}

export function filterImages(
  images: ImageMetadata[],
  filters: SearchFilters
): ImageMetadata[] {
  return images.filter((image) => {
    // Text search in title, description, and tags
    if (filters.query) {
      const searchText = filters.query.toLowerCase();
      const titleMatch = image.title.toLowerCase().includes(searchText);
      const descriptionMatch =
        image.description?.toLowerCase().includes(searchText) || false;
      const tagMatch = image.tags.some((tag) =>
        tag.toLowerCase().includes(searchText)
      );

      if (!titleMatch && !descriptionMatch && !tagMatch) {
        return false;
      }
    }

    // Tag filter
    if (filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some((tag) =>
        image.tags.some(
          (imageTag) => imageTag.toLowerCase() === tag.toLowerCase()
        )
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    // Date range filter
    if (filters.dateRange) {
      const imageDate = image.dateTaken.getTime();
      const startDate = filters.dateRange.start.getTime();
      const endDate = filters.dateRange.end.getTime();

      if (imageDate < startDate || imageDate > endDate) {
        return false;
      }
    }

    return true;
  });
}

export function getAllTags(images: ImageMetadata[]): string[] {
  const tagSet = new Set<string>();
  images.forEach((image) => {
    image.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
