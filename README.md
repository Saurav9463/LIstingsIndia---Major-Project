🏡 ListingsIndia 
 A modern, full-stack accommodation booking platform inspired by Airbnb, built with the MERN stack.
Features • Demo • Installation • API Docs • Contributing

</div>
📋 Table of Contents

About
Features
Tech Stack
Installation
Usage
API Documentation
Project Structure
Screenshots
Contributing
License

🎯 About
ListingsIndia is a comprehensive accommodation booking platform that allows users to discover, book, and review properties across India. Built with modern web technologies, it provides a seamless experience for both property owners and travelers.
Why ListingsIndia?

🔐 Secure Authentication - Industry-standard user authentication and authorization
🏠 Property Management - Easy-to-use interface for listing properties
📅 Smart Booking System - Intuitive date selection with price calculation
⭐ Reviews & Ratings - Community-driven property reviews
❤️ Favorites - Save properties for later viewing
📱 Responsive Design - Works seamlessly on all devices

✨ Features
🎨 User Experience

✅ Clean, modern Material-UI interface
✅ Responsive design (mobile, tablet, desktop)
✅ Real-time form validation
✅ Loading states and error handling
✅ Intuitive navigation and filtering

🔒 Authentication & Security

✅ User registration and login
✅ Password hashing with bcrypt
✅ Session-based authentication
✅ Protected routes and API endpoints
✅ Owner-only edit/delete permissions

🏠 Listings Management

✅ Create, read, update, delete (CRUD) operations
✅ Image upload to Cloudinary
✅ Search and filter functionality
✅ Category-based filtering (trending, mountains, pools, etc.)
✅ Price display with tax toggle

📅 Booking System

✅ Date range picker with validation
✅ Guest count specification
✅ Automatic price calculation (base + service fee + GST)
✅ Booking history
✅ Cancel bookings

⭐ Reviews & Ratings

✅ 5-star rating system
✅ Text comments
✅ Author attribution
✅ Delete own reviews

❤️ Favorites

✅ Add/remove properties to favorites
✅ Favorites page with all saved listings
✅ Badge counter in navigation

🛠 Tech Stack
Backend

Node.js v24.2.0 - JavaScript runtime
Express.js v4.21.2 - Web application framework
MongoDB - NoSQL database
Mongoose v8.16.0 - MongoDB ODM
Passport.js - Authentication middleware
Cloudinary - Cloud-based image storage
Multer - File upload handling
Joi - Schema validation

Frontend

React 19.2.0 - UI library
Vite 7.1.9 - Build tool
Material-UI (MUI) v7.3.4 - Component library
React Router v7.9.3 - Client-side routing
Axios - HTTP client
Day.js - Date manipulation

Additional Tools

CORS - Cross-origin resource sharing
Express Session - Session management
Connect-Mongo - MongoDB session store

🚀 Installation
Prerequisites

Node.js v24.2.0 or higher
MongoDB Atlas account (or local MongoDB)
Cloudinary account
Git

1. Clone the Repository
bashgit clone https://github.com/yourusername/listingsindia.git
cd listingsindia
2. Install Dependencies
bash# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
3. Environment Variables
Create a .env file in the root directory:
env# MongoDB
ATLASDB_URL=mongodb+srv://username:password@cluster.mongodb.net/listingsindia

# Session Secret
SECRET=your-super-secret-session-key-here

# Cloudinary
CLOUD_NAME=your-cloudinary-cloud-name
API_KEY=your-cloudinary-api-key
API_SECRET=your-cloudinary-api-secret

# Environment
NODE_ENV=development
4. Seed the Database (Optional)
bash# This requires at least one user to exist
# First, start the server and create a user via signup
# Then run:
node server/seed/seedlisting.js
5. Start the Application
Development Mode
Terminal 1 - Backend (Port 8080):
bashnpm run dev
Terminal 2 - Frontend (Port 5173):
bashcd client
npm run dev
Access the Application

🌐 Frontend: http://localhost:5173
🔧 Backend API: http://localhost:8080

📖 Usage
For Travelers

Browse Listings - Explore properties on the homepage
Search & Filter - Use category filters to find specific types
View Details - Click on any listing for full information
Sign Up/Login - Create an account to book properties
Make Booking - Select dates, guests, and confirm
Add Reviews - Share your experience after booking
Save Favorites - Heart icon to save properties

For Property Owners

Create Account - Sign up as a user
Add Listing - Click "Create New Listing" in navigation
Upload Details - Add title, description, price, location, and image
Manage Properties - Edit or delete your listings
View Bookings - See who has booked your properties

📡 API Documentation
Base URL
http://localhost:8080/api
Authentication Endpoints
MethodEndpointDescriptionAuth RequiredPOST/api/signupRegister new user❌POST/api/loginLogin user❌GET/api/logoutLogout user✅GET/api/current-userGet current user✅
Listings Endpoints
MethodEndpointDescriptionAuth RequiredGET/api/listingsGet all listings❌GET/api/listings/:idGet single listing❌POST/api/listingsCreate listing✅PUT/api/listings/:idUpdate listing✅ (Owner)DELETE/api/listings/:idDelete listing✅ (Owner)
Reviews Endpoints
MethodEndpointDescriptionAuth RequiredPOST/api/listings/:id/reviewsCreate review✅DELETE/api/listings/:id/reviews/:reviewIdDelete review✅ (Author)
Favorites Endpoints
MethodEndpointDescriptionAuth RequiredGET/api/favoritesGet all favorites✅POST/api/favorites/:listingIdAdd to favorites✅DELETE/api/favorites/:listingIdRemove from favorites✅
Bookings Endpoints
MethodEndpointDescriptionAuth RequiredGET/api/bookingsGet user bookings✅POST/api/bookingsCreate booking✅DELETE/api/bookings/:idCancel booking✅
Example API Requests
Create a Listing
bashcurl -X POST http://localhost:8080/api/listings \
  -H "Content-Type: multipart/form-data" \
  -F "listing[title]=Beach Villa" \
  -F "listing[description]=Beautiful villa by the beach" \
  -F "listing[price]=8500" \
  -F "listing[location]=Goa" \
  -F "listing[country]=India" \
  -F "listing[image]=@/path/to/image.jpg"
Create a Booking
bashcurl -X POST http://localhost:8080/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "listingId": "6789abc...",
    "checkIn": "2025-12-20",
    "checkOut": "2025-12-25",
    "guests": 2,
    "totalPrice": 50000,
    "nights": 5
  }'
📁 Project Structure
listingsindia/
│
├── client/                      # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── bookings/       # Booking components
│   │   │   ├── layout/         # Navbar, Footer
│   │   │   ├── listings/       # Listing cards, filters
│   │   │   └── reviews/        # Review section
│   │   ├── context/
│   │   │   ├── AuthContext.jsx # Authentication state
│   │   │   └── Favorite.jsx    # Favorites state
│   │   ├── pages/
│   │   │   ├── Listings.jsx    # Browse listings
│   │   │   ├── ListingDetail.jsx
│   │   │   ├── ListingForm.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Favorites.jsx
│   │   │   └── Booking.jsx
│   │   ├── services/
│   │   │   └── api.js          # Axios configuration
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                      # Express Backend
│   ├── controller/
│   │   ├── listing.js          # Listing controllers
│   │   ├── review.js           # Review controllers
│   │   └── user.js             # User controllers
│   ├── models/
│   │   ├── listing.js          # Listing schema
│   │   ├── review.js           # Review schema
│   │   ├── user.js             # User schema
│   │   ├── favorite.js         # Favorite schema
│   │   └── booking.js          # Booking schema
│   ├── routes/
│   │   ├── listing.js          # Listing routes
│   │   ├── review.js           # Review routes
│   │   ├── user.js             # Auth routes
│   │   ├── favorite.js         # Favorite routes
│   │   └── booking.js          # Booking routes
│   ├── seed/
│   │   └── seedlisting.js      # Database seeder
│   ├── utils/
│   │   ├── expresserror.js     # Custom error class
│   │   └── wrapasync.js        # Async wrapper
│   ├── cloudinary.js           # Cloudinary config
│   ├── middleware.js           # Custom middleware
│   ├── schema.js               # Joi validation
│   └── index.js                # Server entry point
│
├── .env                         # Environment variables
├── .gitignore
├── package.json
└── README.md
📸 Screenshots
Homepage
Show Image
Listing Detail
Show Image
Create Listing
Show Image
My Bookings
Show Image
🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository
Create a feature branch

bash   git checkout -b feature/AmazingFeature

Commit your changes

bash   git commit -m 'Add some AmazingFeature'

Push to the branch

bash   git push origin feature/AmazingFeature

Open a Pull Request

Coding Standards

Follow ESLint configuration
Write meaningful commit messages
Add comments for complex logic
Test before submitting PR

🐛 Known Issues & Limitations

No email verification on signup
No payment gateway integration (bookings are free)
Limited search functionality (text-based only)
No real-time availability checking
Single image per listing

🚀 Future Enhancements

 Payment integration (Razorpay/Stripe)
 Email notifications
 Advanced search filters (price range, amenities)
 Multi-image upload per listing
 Calendar view for availability
 Host dashboard with analytics
 Chat/messaging system
 Social authentication (Google, Facebook)
 Email verification
 Password reset functionality

📄 License
This project is licensed under the ISC License.
👨‍💻 Author
Saurav Arora

GitHub: @yourusername
Email: your.email@example.com

🙏 Acknowledgments

Material-UI for the component library
Cloudinary for image hosting
MongoDB Atlas for database hosting
Inspired by Airbnb
