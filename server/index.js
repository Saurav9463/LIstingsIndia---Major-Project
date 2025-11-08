if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Url = process.env.ATLASDB_URL;
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./utils/expresserror.js")
const listings = require("./routes/listing.js")
const reviews = require("./routes/review.js")
const user = require("./routes/user.js")
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const cors = require("cors");
const favorites = require("./routes/favorite.js");
const bookings = require("./routes/booking.js");

main()
.then(()=>{
    console.log("connected to db")
})
.catch((err)=>{
        console.log(err)
});

async function main(){
    await mongoose.connect(Url);
}

// CORS Configuration
app.use(cors({
    origin: "http://localhost:5173", // React dev server
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
    mongoUrl:Url,
    touchAfter:24*60*60,
    crypto:{
        secret:process.env.SECRET
    }
})
store.on("error",function(e){
    console.log("session error",e);
})

const sessionOptions = {
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now() + (1000 * 60 * 60 * 24 * 30),
        maxAge:1000 * 60 * 60 * 24 * 30
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curruser= req.user;
    next();
})

// API Routes
app.use("/api/listings",listings)
app.use("/api/listings/:id/reviews",reviews)
app.use("/api",user)
app.use("/api/favorites", favorites);
app.use("/api/bookings", bookings);

// Get current user endpoint
app.get("/api/current-user", (req,res) => {
    if(req.isAuthenticated()){
        res.json({ user: req.user });
    } else {
        res.status(401).json({ error: "Not authenticated" });
    }
});

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found!"))
})

app.use((err, req, res, next) => {
    let {statusCode=500, message="Something went wrong!"} = err;
    res.status(statusCode).json({ error: message });
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
})