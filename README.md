🏡 ListingsIndia :
 A modern, full-stack accommodation booking platform inspired by Airbnb, built with the MERN stack.

</div>

🎯 About :
ListingsIndia is a comprehensive accommodation booking platform that allows users to discover, book, and review properties across India. Built with modern web technologies, it provides a seamless experience for both property owners and travelers.
</div>
Why ListingsIndia?

🔐 Secure Authentication - Industry-standard user authentication and authorization
🏠 Property Management - Easy-to-use interface for listing properties
📅 Smart Booking System - Intuitive date selection with price calculation
⭐ Reviews & Ratings - Community-driven property reviews
❤️ Favorites - Save properties for later viewing
📱 Responsive Design - Works seamlessly on all devices
</div>

✨ Features
</div>
🎨 User Experience

✅ Clean, modern Material-UI interface
✅ Responsive design (mobile, tablet, desktop)
✅ Real-time form validation
✅ Loading states and error handling
✅ Intuitive navigation and filtering
</div>
🔒 Authentication & Security
</div>
✅ User registration and login
✅ Password hashing with bcrypt
✅ Session-based authentication
✅ Protected routes and API endpoints
✅ Owner-only edit/delete permissions
</div>
🏠 Listings Management

✅ Create, read, update, delete (CRUD) operations
✅ Image upload to Cloudinary
✅ Search and filter functionality
✅ Category-based filtering (trending, mountains, pools, etc.)
✅ Price display with tax toggle
</div>
📅 Booking System

✅ Date range picker with validation
✅ Guest count specification
✅ Automatic price calculation (base + service fee + GST)
✅ Booking history
✅ Cancel bookings
</div>
⭐ Reviews & Ratings

✅ 5-star rating system
✅ Text comments
✅ Author attribution
✅ Delete own reviews
</div>

❤️ Favorites
</div>
✅ Add/remove properties to favorites
✅ Favorites page with all saved listings
✅ Badge counter in navigation

🛠 Tech Stack
</div>
Backend

Node.js v24.2.0 - JavaScript runtime
Express.js v4.21.2 - Web application framework
MongoDB - NoSQL database
Mongoose v8.16.0 - MongoDB ODM
Passport.js - Authentication middleware
Cloudinary - Cloud-based image storage
Multer - File upload handling
Joi - Schema validation
</div>
Frontend

React 19.2.0 - UI library
Vite 7.1.9 - Build tool
Material-UI (MUI) v7.3.4 - Component library
React Router v7.9.3 - Client-side routing
Axios - HTTP client
Day.js - Date manipulation
</div>
Additional Tools

CORS - Cross-origin resource sharing
Express Session - Session management
Connect-Mongo - MongoDB session store


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


👨‍💻 Author
Saurav Arora

GitHub: @Saurav9463
Email: sauravarora700@gmail.com

🙏 Acknowledgments

Material-UI for the component library
Cloudinary for image hosting
MongoDB Atlas for database hosting
Inspired by Airbnb
