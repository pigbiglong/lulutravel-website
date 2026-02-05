# AGENTS.md - lulutravel Website

## Project Overview

**lulutravel** is a premium China tours and travel website featuring an Oriental Garden design aesthetic. It is a static website built with pure HTML5, CSS3, and vanilla JavaScript without any frontend frameworks or build tools.

The website targets travelers seeking high-end, customized travel experiences in China, with a design theme inspired by traditional Chinese gardens (墨绿/竹青/黛色 + 暖木色).

## Technology Stack

| Category | Technology |
|----------|------------|
| Markup | HTML5 |
| Styling | CSS3 (Custom Properties, Flexbox, Grid) |
| Scripting | Vanilla JavaScript (ES6+) |
| Fonts | Google Fonts (Cormorant Garamond, Noto Serif SC, Inter) |
| Icons | Inline SVG |
| Build Tools | None (static site) |
| Package Manager | None |

## Project Structure

```
lulutravel-website/
├── index.html              # Homepage (Landing page)
├── about.html              # About Us page
├── product.html            # Product detail page (template)
├── product-classic.html    # Classic tour product
├── product-culinary.html   # Culinary tour product
├── product-nature.html     # Nature tour product
├── booking.html            # Booking form page
├── cart.html               # Shopping cart page
├── login.html              # Authentication page (Sign In/Sign Up)
├── profile.html            # User profile page
├── blog.html               # Blog/Articles page
├── contact.html            # Contact form page
├── faq.html                # FAQ page
├── terms.html              # Terms of Service
├── privacy.html            # Privacy Policy
├── 404.html                # Error page
├── style.css               # Shared styles (auth, cart, booking pages)
├── product-style.css       # Product pages specific styles
├── css/
│   └── style.css           # Homepage and main styles
├── js/
│   └── main.js             # Main JavaScript (navbar, animations, scroll)
└── assets/
    └── images/             # Image assets (empty, using external images)
```

## Design System

### Color Palette (Oriental Garden Theme)

| Name | Chinese | Hex Code | Usage |
|------|---------|----------|-------|
| Ink Green | 墨绿 | `#1a3a2f` / `#2D4A3E` | Primary brand color, headers |
| Bamboo Green | 竹青 | `#4A7C59` / `#3d5a47` | Accent color, highlights |
| Dai Black | 黛色 | `#2c3e35` / `#1A1A1A` | Text color |
| Warm Wood | 暖木色 | `#c9a962` / `#C4A77D` | CTAs, accents, hover states |
| Cream | 米白 | `#f8f6f3` / `#F5F2EB` | Background color |

### Typography

| Font | Usage |
|------|-------|
| Cormorant Garamond | English headings, serif titles |
| Noto Serif SC | Chinese text, serif headings |
| Inter | Body text, UI elements, sans-serif |

### CSS Variables

Each page defines its own CSS variables in `:root`. Common variables include:

```css
:root {
    --color-ink: #1A1A1A;
    --color-green-dark: #2D4A3E;
    --color-green: #4A7C59;
    --color-wood: #C4A77D;
    --color-cream: #F5F2EB;
    --font-serif: 'Cormorant Garamond', Georgia, serif;
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --transition-smooth: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Key Features

### Navigation
- Fixed navigation bar with transparent-to-solid transition on scroll
- Mobile hamburger menu with slide-down animation
- Smooth scroll to anchor links with offset for fixed header

### Animations
- Intersection Observer API for scroll-triggered fade-in animations
- Parallax effect on hero sections
- Subtle zoom animation on hero background images
- Hover effects on cards and buttons

### Interactive Components
- Booking forms with validation
- Guest selector with increment/decrement buttons
- Modal dialogs for confirmations
- Tab-based authentication (Sign In / Sign Up)

### Responsive Design
- Mobile-first approach
- Breakpoints:
  - `max-width: 1024px` - Tablet
  - `max-width: 768px` - Mobile landscape
  - `max-width: 480px` - Mobile portrait

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Language attribute: `lang="zh-CN"` for Chinese pages, `lang="en"` for English pages
- Include viewport meta tag for responsive design
- Use descriptive class names (BEM-like naming)

### CSS
- Use CSS Custom Properties for theming (defined in `:root`)
- Prefer `rem` units for scalability
- Use CSS Grid for layouts, Flexbox for components
- Include vendor prefixes for backdrop-filter and other modern properties
- Mobile-first media queries

### JavaScript
- Use `const` and `let` (avoid `var`)
- Event delegation pattern for dynamic elements
- Feature detection before using modern APIs
- Comments in English for code clarity

## Page Descriptions

| Page | Purpose | Key Features |
|------|---------|--------------|
| `index.html` | Homepage | Hero section, experience cards, testimonials, CTA |
| `product*.html` | Product details | Hero image, itinerary, highlights, booking card |
| `booking.html` | Booking form | Multi-step form, date picker, guest selection |
| `cart.html` | Shopping cart | Cart items, quantity adjustment, checkout flow |
| `login.html` | Authentication | Tabbed login/register, form validation |
| `profile.html` | User dashboard | Order history, personal info, preferences |

## Testing

Since this is a static website without a build process:

1. **Manual Testing**: Open HTML files directly in browser
2. **Responsive Testing**: Use browser DevTools device emulation
3. **Cross-browser**: Test in Chrome, Firefox, Safari, Edge
4. **No automated tests**: The project does not include Jest, Cypress, or other testing frameworks

## Deployment

The website is designed to be deployed as static files:

1. **No build step required** - deploy files directly
2. **Compatible with**:
   - GitHub Pages
   - Netlify
   - Vercel
   - Any static web server (nginx, Apache)
   - CDN (Cloudflare, AWS S3)

## Important Notes

1. **Image Assets**: The `assets/images/` directory is empty. Images are loaded from external URLs (Unsplash or placeholder services).

2. **No Backend**: This is a frontend-only prototype. Form submissions and authentication are simulated with JavaScript (likely using `localStorage` for state management).

3. **Mixed Languages**: The codebase contains both English and Chinese content. Primary content is in Chinese (`zh-CN`), with some pages in English.

4. **Duplicate Styles**: Some CSS is duplicated across HTML files (inline `<style>` tags) and external CSS files. When making style changes, check both locations.

5. **No Package Management**: There is no `package.json`, `requirements.txt`, or other dependency files. All dependencies are loaded via CDN (Google Fonts).

## Common Tasks

### Adding a New Page
1. Copy an existing HTML file as template
2. Update the `<title>` and content
3. Add page-specific styles in `<style>` tag or link external CSS
4. Update navigation links in all pages (manual update required)

### Modifying Global Styles
- Edit `css/style.css` for homepage-related global styles
- Edit `style.css` for shared component styles
- Edit `product-style.css` for product page specific styles

### Adding JavaScript Functionality
- Add to `js/main.js` for site-wide features
- Add inline `<script>` tags for page-specific functionality

## Security Considerations

- No server-side validation (frontend-only)
- No HTTPS enforcement (configure at server level)
- No CSP headers (configure at server level)
- Forms use client-side validation only
