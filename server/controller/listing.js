const Listing = require("../models/listing");

module.exports.index = async (req,res,next)=>{
    const allListings = await Listing.find({});
    res.json(allListings);
}

module.exports.rendernewform = (req,res)=>{
    res.json({ message: "Use POST /api/listings to create" });
}

module.exports.showlisting = async (req,res, next)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path:"review",
        populate: {
            path:"author",
        },
    })
    .populate("owner");
    
    if(!listing){
        return res.status(404).json({ error: "Listing not found" });
    }
    
    res.json(listing);
}

module.exports.createlisting = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    res.status(201).json({ message: "Listing created successfully", listing: newListing });
}

module.exports.rendereditform = async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        return res.status(404).json({ error: "Listing not found" });
    }
    res.json(listing);
}

module.exports.updatelisting = async (req,res)=>{
    const {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing}, {new: true});
    
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    
    res.json({ message: "Listing updated successfully", listing });
}

module.exports.destroylisting = async (req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.json({ message: "Listing deleted successfully" });
}