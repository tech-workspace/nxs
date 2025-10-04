# Nexus Plater - Corporate Gifts and Promotional Products UAE

A professional website for corporate gifts and promotional products in the United Arab Emirates.

## Features

- 🎁 Corporate gifts and promotional products
- 📱 Responsive design for all devices
- 🔒 Secure form handling with validation
- 🚀 SEO optimized for search engines
- 📧 Contact form with inquiry management
- 🎨 Modern, professional UI/UX

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templating, CSS3, JavaScript
- **Database**: MongoDB with Mongoose
- **Security**: Helmet.js, rate limiting, input sanitization
- **Deployment**: Railway.app

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5000`

## Deployment

This application is configured for deployment on Railway.app:

1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on git push

### Environment Variables Required

- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Set to "production" for production deployment

## SEO Features

- ✅ Meta tags and Open Graph optimization
- ✅ Structured data (Schema.org)
- ✅ Sitemap and robots.txt
- ✅ Mobile-friendly responsive design
- ✅ Fast loading and performance optimized

## Security Features

- ✅ Helmet.js security headers
- ✅ Rate limiting and DDoS protection
- ✅ Input sanitization and XSS protection
- ✅ CSRF protection
- ✅ Secure form validation

## License

MIT License - see LICENSE.txt for details