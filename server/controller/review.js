const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createreview = async (req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
    newreview.author = req.user._id;
    listing.review.push(newreview);
    await newreview.save();
    await listing.save();
    
    // Populate the author before sending response
    await newreview.populate('author');
    
    res.status(201).json({ 
        message: "Review created successfully", 
        review: newreview 
    });
}

module.exports.destoryreview = async(req,res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.json({ message: "Review deleted successfully" });
}