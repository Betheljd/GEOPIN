# GeoPin - Military & Customs Tracking System

A modern web application for military and customs tracking with real-time geolocation features.

## 🚀 Features

- 🌍 Interactive map interface with real-time location tracking
- 📱 Responsive design that works on all devices
- 🛡️ Secure with best practices (CSP, Helmet.js, rate limiting)
- ⚡ Optimized performance with compression and caching
- 🎨 Modern UI with Tailwind CSS and smooth animations
- 🔒 Secure authentication (to be implemented)
- 📊 Data visualization and analytics (to be implemented)

## 📋 Prerequisites

- Node.js (v14 or later)
- npm (comes with Node.js)
- Google Maps API key (for map functionality)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/GEOPIN.git
   cd GEOPIN
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment file and update it with your Google Maps API key:

   ```bash
   cp .env.example .env
   ```

   Then edit the `.env` file and add your Google Maps API key:

   ```env
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```
   
   The application will be available at [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
GEOPIN/
├── public/               # Static files
│   ├── index.html        # Main HTML file
│   ├── css/              # CSS files
│   │   └── styles.css    # Main styles
│   └── js/               # JavaScript files
│       └── app.js        # Main application logic
├── .env.example          # Example environment variables
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── .editorconfig         # Editor configuration
├── .gitignore            # Git ignore file
├── server.js             # Express server
├── package.json          # Project dependencies and scripts
└── README.md             # This file
```

## 🛠️ Technologies Used

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) for smooth animations
- [Feather Icons](https://feathericons.com/) for beautiful icons
- [Vanta.js](https://www.vantajs.com/) for animated backgrounds
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview) for mapping

### Backend
- [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- [Helmet.js](https://helmetjs.github.io/) for security headers
- [compression](https://www.npmjs.com/package/compression) for gzip compression
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) for rate limiting
- [dotenv](https://www.npmjs.com/package/dotenv) for environment variables

### Development Tools
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io/) for code formatting
- [Nodemon](https://nodemon.io/) for automatic server restarts

## ⚙️ Configuration

### Google Maps API

1. Get a Google Maps JavaScript API key from the [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the following APIs in the Google Cloud Console:
   - Maps JavaScript API
   - Geocoding API
   - Places API
3. Add your API key to the `.env` file:

   ```env
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

## 🛠 Development

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-reload
- `npm run lint` - Run ESLint to check for code issues
- `npm run format` - Format code using Prettier

### Code Style

This project uses:
- ESLint for code linting
- Prettier for code formatting
- EditorConfig for consistent editor settings

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [AOS](https://michalsnik.github.io/aos/) for smooth animations
- [Feather Icons](https://feathericons.com/) for beautiful icons
- [Vanta.js](https://www.vantajs.com/) for animated backgrounds
- [Google Maps Platform](https://developers.google.com/maps) for mapping
- [Express](https://expressjs.com/) for the web framework
- [Helmet.js](https://helmetjs.github.io/) for securing Express apps
