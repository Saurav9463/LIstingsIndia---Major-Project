# 🏠 ListingsIndia

**A full-stack vacation rental platform inspired by Airbnb, built with the MERN stack**


---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 Overview

**ListingsIndia** is a vacation rental marketplace platform where users can:
- Browse property listings across India
- Create and manage their own rental listings
- Leave reviews and ratings for properties
- Securely authenticate and manage their profile

This project demonstrates full-stack development proficiency with user authentication, CRUD operations, image uploads, and cloud integration.

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login with Passport.js
- Session-based authentication with MongoDB store
- Password hashing and salting with `passport-local-mongoose`
- Protected routes with custom middleware

### 🏡 Listing Management (CRUD)
- **Create**: Add new property listings with images
- **Read**: Browse all listings or view individual property details
- **Update**: Edit your own listings (owner-only access)
- **Delete**: Remove listings with cascade deletion of reviews

### ⭐ Review System
- Leave ratings (1-5 stars) and comments
- Visual star rating interface
- Author tracking for reviews
- Delete reviews (author-only access)

### 📸 Image Upload
- Cloudinary integration for image storage
- Multer middleware for file handling
- Image transformation (blur effect for edit preview)
- CDN delivery for fast loading

### 🎨 User Interface
- Responsive Bootstrap design
- Filter system for property types
- Tax toggle (GST calculation display)
- Flash messages for user feedback
- Custom error pages

### 🔒 Security Features
- Password encryption
- HTTP-only session cookies
- Input validation (client & server-side)
- Authorization checks before modifications
- Protected environment variables

---

## 🛠️ Tech Stack

### Frontend
- **Template Engine**: EJS (Embedded JavaScript)
- **CSS Framework**: Bootstrap 5.3
- **Icons**: Font Awesome 6.7
- **Styling**: Custom CSS

### Backend
- **Runtime**: Node.js 24.2.0
- **Framework**: Express.js 4.21.2
- **Authentication**: Passport.js (Local Strategy)
- **Session Management**: Express-session with Connect-Mongo

### Database
- **Database**: MongoDB Atlas
- **ODM**: Mongoose 8.16.0

### Cloud Services
- **Image Storage**: Cloudinary
- **File Upload**: Multer 2.0.1

### Validation
- **Server-side**: Joi 17.13.3
- **Client-side**: Bootstrap validation

---

## 🏗️ Project Architecture

```
ListingsIndia/
├── client/                  # Frontend assets
│   └── public/
│       ├── css/
│       │   ├── style.css
│       │   └── rating.css
│       └── js/
│           └── script.js
├── server/
│   ├── models/             # Mongoose schemas
│   │   ├── listing.js
│   │   ├── review.js
│   │   └── user.js
│   ├── controllers/        # Route handlers
│   │   ├── listing.js
│   │   ├── review.js
│   │   └── user.js
│   ├── routes/             # Express routes
│   │   ├── listing.js
│   │   ├── review.js
│   │   └── user.js
│   ├── views/              # EJS templates
│   │   ├── layouts/
│   │   ├── includes/
│   │   ├── listings/
│   │   └── user/
│   ├── utils/              # Helper functions
│   │   ├── wrapasync.js
│   │   └── expresserror.js
│   ├── middleware.js       # Custom middleware
│   ├── cloudinary.js       # Cloudinary config
│   ├── schema.js           # Joi validation
│   └── index.js            # Entry point
├── .gitignore
├── .env                    # Environment variables
├── package.json
└── README.md
```

**MVC Architecture**:
- **Models**: Define data structure (MongoDB schemas)
- **Views**: EJS templates for UI rendering
- **Controllers**: Business logic for route handling

---

## 📥 Installation

### Prerequisites
- Node.js (v24.2.0 or higher)
- MongoDB Atlas account
- Cloudinary account
- Git

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/Saurav9463/ListingsIndia---Major-Project.git
cd ListingsIndia---Major-Project
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# MongoDB Atlas Connection
ATLASDB_URL=your_mongodb_connection_string

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

# Session Secret
SECRET=your_secret_key_for_sessions

# Node Environment
NODE_ENV=development
```

4. **Initialize database** (optional)
```bash
node init/app.js
```
This will populate the database with sample listings.

5. **Start the application**
```bash
npm start
# or for development with auto-restart
npm run dev
```

6. **Access the application**

Open your browser and navigate to:
```
http://localhost:8080
```

---

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `ATLASDB_URL` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `CLOUD_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `API_KEY` | Cloudinary API key | `123456789012345` |
| `API_SECRET` | Cloudinary API secret | `abcdefghijklmnopqrstuvwxyz` |
| `SECRET` | Session encryption key | `supersecretkey123` |
| `NODE_ENV` | Environment mode | `development` or `production` |

---

## 🚀 Usage

### User Flows

#### 1. **Browse Listings**
- Visit homepage to see all available properties
- Click on any listing to view details
- Toggle "Display total after taxes" to see GST calculation

#### 2. **Create Account**
- Click "Sign up" in navigation
- Fill registration form (username, email, password)
- Automatic login after registration

#### 3. **Add a Listing**
- Login to your account
- Click "Create New Listing"
- Fill in property details and upload image
- Submit to publish

#### 4. **Edit Your Listing**
- Navigate to your listing
- Click "Edit" button (only visible to owner)
- Modify details or replace image
- Save changes

#### 5. **Leave a Review**
- View any listing detail page
- Scroll to review section
- Select star rating and add comment
- Submit review (requires login)

#### 6. **Search Properties**
- Use search bar in navigation
- Enter destination or keywords
- View filtered results

---

## 🛣️ API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/signup` | Render signup form | No |
| POST | `/signup` | Create new user | No |
| GET | `/login` | Render login form | No |
| POST | `/login` | Authenticate user | No |
| GET | `/logout` | End user session | Yes |

### Listing Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/listings` | Get all listings | No |
| GET | `/listings/new` | Render create form | Yes |
| POST | `/listings` | Create new listing | Yes |
| GET | `/listings/:id` | Get single listing | No |
| GET | `/listings/:id/edit` | Render edit form | Yes (Owner) |
| PUT | `/listings/:id` | Update listing | Yes (Owner) |
| DELETE | `/listings/:id` | Delete listing | Yes (Owner) |

### Review Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/listings/:id/reviews` | Create review | Yes |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete review | Yes (Author) |

---

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, handled by passport)
}
```

### Listing Model
```javascript
{
  title: String (required),
  description: String,
  image: {
    url: String,
    filename: String
  },
  price: Number,
  location: String,
  country: String,
  review: [ObjectId] (ref: Review),
  owner: ObjectId (ref: User)
}
```

### Review Model
```javascript
{
  comment: String,
  rating: Number (1-5),
  createdAt: Date,
  author: ObjectId (ref: User)
}
```

---

## 🔮 Future Enhancements

- [ ] **Search & Filters**: Advanced filtering by price, location, amenities
- [ ] **Booking System**: Date availability and reservation functionality
- [ ] **Payment Integration**: Razorpay/Stripe for secure payments
- [ ] **Geolocation**: Mapbox integration for map view
- [ ] **Real-time Chat**: Socket.io for host-guest messaging
- [ ] **Email Notifications**: Nodemailer for booking confirmations
- [ ] **Mobile App**: React Native version
- [ ] **Admin Panel**: Content moderation and user management
- [ ] **Multi-language Support**: Hindi, Tamil, Telugu
- [ ] **Progressive Web App**: Offline capability with service workers

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style and structure
- Write clear commit messages
- Test your changes before submitting
- Update documentation for new features

---


## 👤 Contact

**Saurav Arora**

- GitHub: [@Saurav9463](https://github.com/Saurav9463)
- Project Link: [https://github.com/Saurav9463/ListingsIndia---Major-Project](https://github.com/Saurav9463/ListingsIndia---Major-Project)

---

## 🙏 Acknowledgments

- [Airbnb](https://www.airbnb.com/) for design inspiration
- [Bootstrap](https://getbootstrap.com/) for UI components
- [Cloudinary](https://cloudinary.com/) for image hosting
- [MongoDB Atlas](https://www.mongodb.com/atlas) for database hosting
- [Font Awesome](https://fontawesome.com/) for icons

---

## 📊 Project Stats

- **Lines of Code**: ~1000+
- **Development Time**: 2 months
- **Models**: 3 (User, Listing, Review)
- **Routes**: 15+ endpoints
- **Dependencies**: 14 packages

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ by Saurav Arora

</div>
