const express = require("express");
const router = express.Router();
const Favorite = require("../models/favorite");
const { isloggedin } = require("../middleware");

// Get all favorites for logged-in user
router.get("/", isloggedin, async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.user._id })
            .populate("listing");
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch favorites" });
    }
});

// Add to favorites
router.post("/:listingId", isloggedin, async (req, res) => {
    try {
        const { listingId } = req.params;
        
        // Check if already favorited
        const existing = await Favorite.findOne({ 
            user: req.user._id, 
            listing: listingId 
        });
        
        if (existing) {
            return res.status(400).json({ error: "Already in favorites" });
        }
        
        const favorite = new Favorite({
            user: req.user._id,
            listing: listingId
        });
        
        await favorite.save();
        res.status(201).json({ message: "Added to favorites", favorite });
    } catch (err) {
        res.status(500).json({ error: "Failed to add to favorites" });
    }
});

// Remove from favorites
router.delete("/:listingId", isloggedin, async (req, res) => {
    try {
        const { listingId } = req.params;
        await Favorite.findOneAndDelete({ 
            user: req.user._id, 
            listing: listingId 
        });
        res.json({ message: "Removed from favorites" });
    } catch (err) {
        res.status(500).json({ error: "Failed to remove from favorites" });
    }
});

// Check if listing is favorited
router.get("/check/:listingId", isloggedin, async (req, res) => {
    try {
        const { listingId } = req.params;
        const favorite = await Favorite.findOne({ 
            user: req.user._id, 
            listing: listingId 
        });
        res.json({ isFavorite: !!favorite });
    } catch (err) {
        res.status(500).json({ error: "Failed to check favorite status" });
    }
});

module.exports = router;