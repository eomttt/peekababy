# Image Gallery Application

A modern, responsive image gallery built with Next.js, TypeScript, and Tailwind CSS. This application allows you to browse, search, and view images organized by year and month.

## Features

- **Image Grouping**: Images are automatically grouped by year and month
- **Search Functionality**: Search images by title, description, or tags
- **Tag Filtering**: Filter images by multiple tags
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Image Details**: Click on any image to view detailed information
- **Modern UI**: Clean, intuitive interface with smooth animations

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd peekababy
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Browsing Images

- Images are automatically grouped by year and month
- Scroll through the gallery to browse all images
- Each image shows a thumbnail with basic information on hover

### Searching Images

- Use the search bar to find images by title, description, or tags
- Type any keyword to search across all image metadata
- Results update in real-time as you type

### Filtering by Tags

- Click on "Filter by tags" to see all available tags
- Select multiple tags to filter images
- Selected tags appear as badges that can be removed individually
- Use "Clear all filters" to reset search and tag filters

### Viewing Image Details

- Click on any image thumbnail to open the detail view
- The detail modal shows:
  - Image preview (placeholder icon for now)
  - File information (filename, size, dimensions)
  - Date taken
  - Description
  - All associated tags
- Click the close button or outside the modal to return to the gallery

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main application page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── SearchBar.tsx     # Search and filter component
│   ├── ImageThumbnail.tsx # Individual image thumbnail
│   ├── ImageGroup.tsx    # Year/month group component
│   └── ImageDetail.tsx   # Image detail modal
├── data/
│   └── sampleImages.ts   # Sample image data
├── types/
│   └── image.ts          # TypeScript type definitions
└── utils/
    └── imageUtils.ts     # Utility functions for image processing
```

## Adding Real Images

To use real images instead of placeholders:

1. Place your image files in the `public/images/` directory
2. Update the `src/data/sampleImages.ts` file with your image metadata
3. Replace the placeholder divs in `ImageThumbnail.tsx` and `ImageDetail.tsx` with actual `<img>` tags

Example image metadata:

```typescript
{
  id: 'unique-id',
  filename: 'my-image.jpg',
  path: '/images/my-image.jpg',
  title: 'My Image Title',
  description: 'Optional description',
  tags: ['tag1', 'tag2', 'tag3'],
  dateTaken: new Date('2024-01-15'),
  fileSize: 2048576,
  dimensions: { width: 1920, height: 1080 }
}
```

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React 19**: Latest React features and hooks

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Customization

The application is highly customizable:

- Modify the color scheme by updating Tailwind classes
- Add new search filters in the `SearchBar` component
- Extend the image metadata structure in `types/image.ts`
- Add new utility functions in `utils/imageUtils.ts`

## License

This project is open source and available under the [MIT License](LICENSE).
