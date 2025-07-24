# ImageSlider Block

The ImageSlider block creates a beautiful, responsive image carousel with a coverflow effect where the center slide is prominently displayed larger than the surrounding slides.

## Features

- **Responsive Design**: Adapts to different screen sizes with appropriate slide counts
- **Coverflow Effect**: 3D carousel effect with the center slide emphasized
- **Autoplay**: Optional automatic sliding with customizable delay
- **Aspect Ratio Control**: Choose from multiple aspect ratios for consistent image display
- **Navigation**: Touch/swipe support on mobile, arrow navigation on desktop
- **Pagination**: Dot indicators showing current slide position

## Configuration Options

### Content Fields

- **Subtitle**: Optional subtitle text displayed above the title
- **Title**: Main heading for the slider section (required)
- **Description**: Optional descriptive text below the title

### Images

- **Images Array**: Collection of images for the slider (minimum 3, maximum 10)
  - Each image includes the media file and optional alt text

### Display Settings

- **Aspect Ratio**: Choose from:
  - 16:9 (Video format)
  - 4:3 (Standard photo)
  - 3:2 (Classic photo)
  - 1:1 (Square)
  - 3:4 (Portrait)

### Autoplay Settings

- **Enable Autoplay**: Toggle automatic sliding
- **Autoplay Delay**: Time between slides (1-10 seconds)

## Visual Design

The slider features:

- Center slide is scaled 1.1x larger than surrounding slides
- Smooth transitions and hover effects
- Shadow effects for depth
- Rounded corners for modern appearance
- Theme-aware colors using CSS custom properties

## Responsive Breakpoints

- **Mobile (320px+)**: 1.2 slides visible
- **Small (640px+)**: 1.5 slides visible
- **Medium (768px+)**: 2 slides visible
- **Large (1024px+)**: 2.5 slides visible
- **XL (1280px+)**: 3 slides visible

## Usage in Payload CMS

1. Navigate to Pages in the admin panel
2. Edit or create a page
3. In the Content tab, add a new block
4. Select "Image Slider" from the block types
5. Fill in the content fields (subtitle, title, description)
6. Add your images to the images array
7. Configure the aspect ratio and autoplay settings
8. Save and publish your page

The block will automatically handle the responsive layout and animations.
