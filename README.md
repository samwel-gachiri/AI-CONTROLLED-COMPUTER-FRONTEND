# Computer AI Automation - Web Client

A modern, responsive Vue.js web application for Computer AI Automation. Built with Vue 3, Tailwind CSS, and modern web technologies.

## Features

- 🎨 Modern, sleek design with Tailwind CSS
- 📱 Fully responsive across all devices
- ⚡ Fast performance with Vite
- 🔧 Component-based architecture
- 🎯 SEO optimized with meta tags
- 🌙 Smooth animations and transitions
- 📊 Device detection for smart downloads
- 🔒 Authentication system integration

## Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** Vue Router 4
- **State Management:** Pinia
- **Icons:** Lucide Vue Next
- **HTTP Client:** Axios
- **Meta Management:** @vueuse/head

## Project Structure

```
client/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── layout/       # Layout components (Header, Footer)
│   │   └── ui/           # UI components (FeatureCard, DownloadButton)
│   ├── composables/      # Vue composables
│   ├── stores/           # Pinia stores
│   ├── views/            # Page components
│   ├── router/           # Vue Router configuration
│   ├── App.vue           # Root component
│   ├── main.js           # Application entry point
│   └── style.css         # Global styles
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
└── postcss.config.js     # PostCSS configuration
```

## Pages

- **Home** (`/`) - Landing page with hero section and features
- **Features** (`/features`) - Detailed feature showcase
- **Pricing** (`/pricing`) - Pricing plans and FAQ
- **Enterprise** (`/enterprise`) - Enterprise solutions
- **Blog** (`/blog`) - Blog listing and articles
- **Download** (`/download`) - Download page with platform detection
- **Authentication** (`/auth`) - Sign in/up pages
- **Dashboard** (`/dashboard`) - User dashboard (protected)

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Configuration

### Environment Variables

Create a `.env` file in the client directory:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=Computer AI Automation
```

### Tailwind CSS

The project uses a custom Tailwind configuration with:
- Custom color palette (primary and gray scales)
- Custom fonts (Inter for sans-serif, JetBrains Mono for monospace)
- Custom animations (fade-in, slide-up, float)
- Responsive breakpoints

### Vue Router

The router is configured with:
- History mode for clean URLs
- Route-based code splitting
- Navigation guards for authentication
- Meta tags for SEO

## Components

### Layout Components

- **Header** - Navigation bar with responsive menu
- **Footer** - Site footer with links and social media

### UI Components

- **FeatureCard** - Reusable card for displaying features
- **DownloadButton** - Smart download button with platform detection

### Composables

- **useDeviceDetection** - Detects user's OS and architecture for downloads
- **useAuthStore** - Authentication state management

## Styling

The project uses Tailwind CSS with custom utilities:

- `.btn` - Base button styles
- `.btn-primary` - Primary button variant
- `.btn-secondary` - Secondary button variant
- `.btn-ghost` - Ghost button variant
- `.container` - Responsive container
- `.section` - Standard section spacing
- `.gradient-text` - Gradient text effect
- `.card` - Card component styles

## Build and Deployment

### Production Build

```bash
npm run build
```

This creates an optimized build in the `dist` directory.

### Deployment

The built files can be deployed to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Traditional web servers

### Build Optimization

The build is optimized with:
- Code splitting by route
- Vendor chunk separation
- Asset optimization
- Tree shaking
- Minification

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Follow the existing code style
2. Use TypeScript for new features
3. Add proper documentation
4. Test on multiple devices
5. Ensure accessibility compliance

## License

This project is part of the Computer AI Automation suite.