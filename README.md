# Wanderlust

Wanderlust is a full-stack accommodation and vacation rental web application inspired by Airbnb. It allows users to explore stays across different categories, list accommodations with image uploads, leave reviews with ratings, and manage their listings securely.

## Features

- **Listing Management:** Create, view, update, and delete accommodation listings.
- **Image Uploads:** Cloudinary integration for cloud-based photo hosting and transformations.
- **Category Filtering:** Filter listings across categories including Trending, Valley, Adventure, Farm, Mansion, Pool, Camping, Hiking, and Arctic.
- **Keyword Search:** Multi-attribute keyword search across title, location, and country.
- **Review & Ratings:** Interactive star-rating submission and author-level deletion controls.
- **Authentication & Authorization:** Secure user registration, session management, and role-based owner/author permissions using Passport.js.
- **Responsive UI:** Built with Bootstrap 5, custom styles, and dynamic tax calculation toggles.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Templating Engine:** EJS, EJS-Mate
- **Authentication:** Passport.js, Passport-Local, Passport-Local-Mongoose
- **Validation:** Joi
- **Media Storage:** Cloudinary, Multer, Multer-Storage-Cloudinary
- **Session Store:** Connect-Mongo, Express-Session

## Project Structure

```
wanderlust/
├── controllers/       # Route controller logic (listings, reviews, users)
├── init/              # Database initialization and sample data
├── models/            # Mongoose schemas (Listing, Review, User)
├── public/            # Static assets (CSS stylesheets, client-side JS)
├── routes/            # Express route definitions
├── utils/             # Error handlers and async utilities
├── views/             # EJS templates, partials, and layouts
├── app.js             # Application entry point
├── cloudConfig.js     # Cloudinary service configuration
├── middlewares.js     # Authentication and validation middlewares
├── schema.js          # Joi data validation schemas
└── package.json       # Project dependencies and npm scripts
```

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- MongoDB instance (local or MongoDB Atlas connection)
- Cloudinary account for media storage

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URL=mongodb://127.0.0.1:27017/wanderlust
SECRET=your_session_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### Installation

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Seed sample data (optional):
   ```bash
   node init/index.js
   ```

3. Start the application:
   ```bash
   npm start
   ```

The application will be accessible at `http://localhost:3000`.

## License

This project is licensed under the ISC License.
