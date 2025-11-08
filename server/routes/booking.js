const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Listing = require("../models/listing");
const { isloggedin } = require("../middleware");

// Get all bookings for logged-in user
router.get("/", isloggedin, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate("listing")
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
});

// Get booking by ID
router.get("/:id", isloggedin, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("listing")
            .populate("user");
        
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        
        res.json(booking);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch booking" });
    }
});

// Create new booking
router.post("/", isloggedin, async (req, res) => {
    try {
        const { listingId, checkIn, checkOut, guests, totalPrice, nights } = req.body;
        
        // Validate dates
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (checkInDate < today) {
            return res.status(400).json({ error: "Check-in date cannot be in the past" });
        }
        
        if (checkOutDate <= checkInDate) {
            return res.status(400).json({ error: "Check-out must be after check-in" });
        }
        
        // Check if listing exists
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        
        // Create booking
        const booking = new Booking({
            listing: listingId,
            user: req.user._id,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guests,
            totalPrice,
            nights,
            status: 'confirmed'
        });
        
        await booking.save();
        await booking.populate('listing');
        
        res.status(201).json({ 
            message: "Booking confirmed successfully", 
            booking 
        });
    } catch (err) {
        console.error("Booking error:", err);
        res.status(500).json({ error: "Failed to create booking" });
    }
});

// Cancel booking
router.delete("/:id", isloggedin, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        
        // Check if user owns the booking
        if (!booking.user.equals(req.user._id)) {
            return res.status(403).json({ error: "Not authorized" });
        }
        
        booking.status = 'cancelled';
        await booking.save();
        
        res.json({ message: "Booking cancelled successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to cancel booking" });
    }
});

module.exports = router;