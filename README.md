# ConnectWell Nepal Landing Page

A modern, responsive landing page for ConnectWell Nepal - a telehealth platform connecting patients with healthcare providers across Nepal.

## Features

- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Dark Mode**: Complete dark mode support with theme toggle
- **Mobile App Detection**: Smart redirect system that prompts mobile users to choose between app or web
- **Smooth Animations**: Subtle fade-in and scroll animations
- **Design System**: Built according to ConnectWell Nepal's official design system

## Design System

### Colors
- **Primary Navy Blue**: `#1A2F5A` - Used for headers, branding, navigation
- **Crimson Red**: `#DC143C` - Used for CTAs and accents
- **Success Green**: `#28A745` - Used for positive actions
- **Background**: `#FFFFFF` (light) / `#0D1B2A` (dark)

### Typography
- **Font Family**: Roboto (system fallbacks)
- **Headings**: Bold, 18px-36px
- **Body**: Regular, 14px-16px

### Components
- Cards with 12px border radius
- Buttons with 12px border radius
- Material Icons for visual elements
- Consistent spacing system (8px base unit)

## File Structure

```
CWN-LandingPage/
├── index.html      # Main HTML structure
├── styles.css      # All styling and design system
├── script.js       # JavaScript functionality
└── README.md       # Documentation
```

## Sections

1. **Navigation Bar**: Fixed header with logo, navigation links, and auth buttons
2. **Hero Section**: Main landing area with logo, headline, tagline, and CTAs
3. **Features Section**: 6 feature cards showcasing key platform benefits
4. **Screenshots Section**: Visual showcase of app interfaces
5. **Trust Section**: Statistics and trust indicators
6. **CTA Section**: Final call-to-action with download/signup buttons
7. **Footer**: Links, legal information, and social media

## Authentication Flow

### Desktop
- Clicking "Login" or "Sign Up" redirects directly to `https://app.connectwellnepal.com/login` or `/signup`

### Mobile
- Clicking "Login" or "Sign Up" shows a modal asking:
  - **Open App**: Attempts to open the native app (iOS/Android)
  - **Continue on Web**: Redirects to the web application

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Setup

1. Clone or download this repository
2. Open `index.html` in a web browser
3. For production, deploy to a web server

## Customization

### Update App URLs
Edit the `handleAuth` function in `script.js`:
```javascript
const appUrl = 'https://app.connectwellnepal.com';
```

### Update App Schemes (for mobile deep linking)
Edit the `openInApp` function in `script.js`:
- iOS: Update `appScheme` variable
- Android: Update `intentUrl` with your package name

### Add Screenshots
Replace the placeholder divs in the screenshots section with actual images:
```html
<div class="screenshot-placeholder">
    <img src="path/to/screenshot.png" alt="Feature name">
</div>
```

## Performance

- Optimized CSS with CSS variables for theming
- Lazy loading support for images
- Smooth scroll animations using Intersection Observer
- Minimal JavaScript footprint

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- WCAG AA contrast ratios
- Focus states for all interactive elements

## License

© 2026 ConnectWell Nepal. All rights reserved.
