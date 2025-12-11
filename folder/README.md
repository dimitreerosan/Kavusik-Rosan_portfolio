# Portfolio

A modern, minimal portfolio site built with React, Vite and Tailwind CSS. Inspired by p5aholic and vgil.fr.

## Features

- **Interactive Canvas Background** - p5.js-like particle animation in Hero section
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Project Grid & Modal** - Showcase work with detailed project information
- **Contact Form** - Integrated with Formspree or mailto
- **Performance Optimized** - Code splitting, lazy loading and Vite build
- **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation
- **SEO Ready** - Structured data, meta tags and semantic markup

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├─ components/
│  ├─ Nav.jsx              # Navigation bar
│  ├─ Hero.jsx             # Hero section with CTA
│  ├─ HeroCanvas.jsx       # Interactive canvas background
│  ├─ About.jsx            # About section with skills
│  ├─ ProjectsGrid.jsx     # Projects grid with modal
│  ├─ ProjectCard.jsx      # Individual project card
│  ├─ ContactForm.jsx      # Contact form
│  └─ Footer.jsx           # Footer
├─ App.jsx                 # Main app component
├─ main.jsx                # Entry point
└─ index.css               # Global styles
public/
├─ fonts/                  # Custom font files (woff2)
└─ images/                 # Project images
```

## Configuration

### Adding Fonts

1. Place `.woff2` font files in `public/fonts/`
2. Update `src/styles/globals.css` with your font names
3. Update `tailwind.config.js` font family variables

### Setting Up Contact Form

**Option A: Formspree**
1. Sign up at [formspree.io](https://formspree.io)
2. Get your form ID
3. Uncomment and update the Formspree endpoint in `ContactForm.jsx`

**Option B: Mailto**
- Update the email address in `ContactForm.jsx`

### Projects Content

Edit the `projects` array in `ProjectsGrid.jsx` with your project details:
- `title`, `category`, `description`
- `technologies` array
- `image` path
- `link` to project

## Customization

### Colors & Branding
- Edit CSS variables in `src/styles/globals.css`
- Update brand name in `Nav.jsx`
- Modify colors in `tailwind.config.js`

### Typography
- Font faces defined in `globals.css`
- Font families in `tailwind.config.js`
- Text sizing in Tailwind classes

## Performance

- **Code Splitting** - Three.js libraries split into separate chunk
- **Lazy Loading** - ContactForm and Footer loaded with Suspense
- **Font Optimization** - Preloaded with `font-display: swap`
- **Image Optimization** - Use next-gen formats (WebP, AVIF)

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Focus visible states

## Deployment

### Vercel
```bash
npm run build
# Push to GitHub and connect to Vercel
```

### Netlify
```bash
npm run build
# Drag & drop `dist` folder to Netlify
# Or connect GitHub repo to Netlify
```

Build settings:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT License - feel free to use this as a template.

## Credits

Inspired by:
- [p5aholic](https://p5aholic.com)
- [vgil.fr](https://vgil.fr)

---

Built with ❤️ using React, Vite and Tailwind CSS.
