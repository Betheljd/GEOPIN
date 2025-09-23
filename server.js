const express = require('express');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Apply security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: [
                "'self'",
                'https://unpkg.com',
                'https://cdn.jsdelivr.net',
                'https://maps.googleapis.com',
                'https://maps.gstatic.com',
                'https://fonts.googleapis.com',
                'https://cdn.tailwindcss.com',
                "'unsafe-inline'" // Required for some libraries like AOS and Vanta.js
            ],
            styleSrc: [
                "'self'",
                'https://unpkg.com',
                'https://cdn.jsdelivr.net',
                'https://fonts.googleapis.com',
                'https://cdn.tailwindcss.com',
                "'unsafe-inline'"
            ],
            imgSrc: [
                "'self'",
                'data:',
                'https://*.googleapis.com',
                'https://*.gstatic.com',
                'https://*.google.com',
                'https://maps.gstatic.com',
                'https://*.ggpht.com'
            ],
            connectSrc: [
                "'self'",
                'https://*.googleapis.com',
                'https://*.gstatic.com',
                'https://maps.googleapis.com',
                'ws://localhost:*' // For development with HMR
            ],
            fontSrc: [
                "'self'",
                'https://fonts.gstatic.com',
                'https://cdn.jsdelivr.net',
                'data:'
            ],
            frameSrc: [
                'https://www.google.com',
                'https://maps.google.com'
            ]
        }
    },
    crossOriginEmbedderPolicy: !isProduction,
    crossOriginOpenerPolicy: !isProduction,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    dnsPrefetchControl: true,
    frameguard: { action: 'deny' },
    hidePoweredBy: true,
    hsts: { maxAge: 15552000, includeSubDomains: true },
    ieNoOpen: true,
    noSniff: true,
    xssFilter: true
}));

// Enable gzip compression
app.use(compression());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

// Serve static files from the 'public' directory with cache control
const staticOptions = {
    maxAge: isProduction ? '1y' : '0',
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
            // All the files that don't have a hash in the filename should be cached for a short time
            res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        }
    }
};
app.use(express.static(path.join(__dirname, 'public'), staticOptions));

// API routes would go here
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve the main HTML file for all other routes (for SPA)
app.get('*', (req, res, next) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    
    // Set cache headers for the HTML file
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    // Send the file
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            if (!res.headersSent) {
                res.status(500).send('Error loading the application');
            }
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const server = app.listen(port, () => {
    console.log(`Server is running in ${isProduction ? 'production' : 'development'} mode`);
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Press Ctrl+C to stop the server`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    server.close(() => process.exit(1));
});

// Handle termination signals
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});
