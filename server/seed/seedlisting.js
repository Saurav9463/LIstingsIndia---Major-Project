require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const mongoose = require("mongoose");
const Listing = require("../models/listing");

const ATLASDB_URL = process.env.ATLASDB_URL;

const sampleListings = [
  // TRENDING
  {
    title: "Luxury Beach Villa in Goa",
    description: "Experience the ultimate beach getaway in this stunning villa with private pool and beach access. Perfect for families and groups.",
    image: {
      url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
      filename: "beach_villa"
    },
    price: 8500,
    location: "Goa",
    country: "India"
  },
  {
    title: "Cozy Mountain Cottage in Manali",
    description: "Wake up to breathtaking mountain views in this charming cottage. Ideal for couples seeking a romantic mountain retreat.",
    image: {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      filename: "mountain_cottage"
    },
    price: 3500,
    location: "Manali",
    country: "India"
  },
  
  // ROOMS/HOTELS
  {
    title: "Boutique Hotel Room in Delhi",
    description: "Stylish hotel room in the heart of Delhi with modern amenities and rooftop restaurant. Perfect for business travelers.",
    image: {
      url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
      filename: "hotel_room"
    },
    price: 4500,
    location: "New Delhi",
    country: "India"
  },
  {
    title: "Heritage Hotel Suite in Jaipur",
    description: "Stay in royal luxury at this converted palace hotel room. Experience the grandeur of Rajasthan's rich heritage.",
    image: {
      url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
      filename: "heritage_suite"
    },
    price: 6500,
    location: "Jaipur",
    country: "India"
  },
  
  // ICONIC CITIES
  {
    title: "Modern Apartment in Mumbai Downtown",
    description: "Contemporary apartment in Mumbai's business district with stunning city views. Close to all major attractions.",
    image: {
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      filename: "mumbai_apartment"
    },
    price: 7500,
    location: "Mumbai",
    country: "India"
  },
  {
    title: "Colonial Bungalow in Kolkata",
    description: "Historic colonial-era bungalow in the cultural heart of Kolkata. Experience old-world charm with modern comforts.",
    image: {
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      filename: "kolkata_bungalow"
    },
    price: 5500,
    location: "Kolkata",
    country: "India"
  },
  
  // MOUNTAINS
  {
    title: "Alpine Retreat in Shimla",
    description: "Secluded mountain retreat surrounded by pine forests. Perfect for nature lovers and adventure enthusiasts.",
    image: {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      filename: "shimla_retreat"
    },
    price: 4200,
    location: "Shimla",
    country: "India"
  },
  {
    title: "Himalayan Lodge in Leh",
    description: "Experience the majestic Himalayas in this traditional Ladakhi lodge. Breathtaking views and authentic local culture.",
    image: {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      filename: "leh_lodge"
    },
    price: 3800,
    location: "Leh",
    country: "India"
  },
  
  // CASTLES/HERITAGE
  {
    title: "Royal Palace Suite in Udaipur",
    description: "Live like royalty in this magnificent palace suite overlooking Lake Pichola. Luxury redefined.",
    image: {
      url: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&q=80",
      filename: "udaipur_palace"
    },
    price: 12000,
    location: "Udaipur",
    country: "India"
  },
  {
    title: "Historic Fort Stay in Jodhpur",
    description: "Unique experience staying in a converted 16th-century fort. Panoramic views of the Blue City.",
    image: {
      url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
      filename: "jodhpur_fort"
    },
    price: 8500,
    location: "Jodhpur",
    country: "India"
  },
  
  // POOLS
  {
    title: "Villa with Infinity Pool in Lonavala",
    description: "Stunning villa featuring an infinity pool with valley views. Perfect weekend getaway from Mumbai.",
    image: {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      filename: "lonavala_pool"
    },
    price: 9500,
    location: "Lonavala",
    country: "India"
  },
  {
    title: "Pool Villa in Alibaug",
    description: "Private beach-side villa with swimming pool and garden. Ideal for family gatherings and celebrations.",
    image: {
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&q=80",
      filename: "alibaug_villa"
    },
    price: 11000,
    location: "Alibaug",
    country: "India"
  },
  
  // CAMPING
  {
    title: "Luxury Camping in Rishikesh",
    description: "Glamping experience by the Ganges with adventure activities. Combine comfort with outdoor adventure.",
    image: {
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
      filename: "rishikesh_camp"
    },
    price: 3200,
    location: "Rishikesh",
    country: "India"
  },
  {
    title: "Desert Camping in Jaisalmer",
    description: "Authentic desert camping under the stars with cultural performances and camel rides.",
    image: {
      url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80",
      filename: "jaisalmer_camp"
    },
    price: 2800,
    location: "Jaisalmer",
    country: "India"
  },
  
  // FARMS
  {
    title: "Organic Farm Stay in Coorg",
    description: "Experience rural life on a working coffee plantation. Learn about organic farming and enjoy fresh produce.",
    image: {
      url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      filename: "coorg_farm"
    },
    price: 2500,
    location: "Coorg",
    country: "India"
  },
  {
    title: "Village Farm Cottage in Kerala",
    description: "Traditional Kerala farmhouse surrounded by paddy fields. Authentic village life experience.",
    image: {
      url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80",
      filename: "kerala_farm"
    },
    price: 2200,
    location: "Kerala",
    country: "India"
  },
  
  // BOATS
  {
    title: "Houseboat in Kerala Backwaters",
    description: "Cruise through scenic backwaters in a traditional Kerala houseboat. All meals and crew included.",
    image: {
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      filename: "kerala_houseboat"
    },
    price: 6500,
    location: "Alleppey",
    country: "India"
  },
  {
    title: "Luxury Yacht Stay in Goa",
    description: "Exclusive yacht experience off the Goa coast. Perfect for special occasions and celebrations.",
    image: {
      url: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
      filename: "goa_yacht"
    },
    price: 15000,
    location: "Goa",
    country: "India"
  },
  
  // UNIQUE/DOMES
  {
    title: "Geodesic Dome in Bir Billing",
    description: "Futuristic dome accommodation in paragliding capital. 360-degree valley views.",
    image: {
      url: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=800&q=80",
      filename: "bir_dome"
    },
    price: 4500,
    location: "Bir Billing",
    country: "India"
  },
  {
    title: "Eco Dome in Auroville",
    description: "Sustainable living experience in experimental township. Unique architectural design.",
    image: {
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      filename: "auroville_dome"
    },
    price: 3500,
    location: "Auroville",
    country: "India"
  },
  
  // ADDITIONAL POPULAR LISTINGS
  {
    title: "Beach Resort in Andaman",
    description: "Tropical paradise resort on pristine white sand beach. Snorkeling and diving available.",
    image: {
      url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      filename: "andaman_beach"
    },
    price: 9800,
    location: "Port Blair",
    country: "India"
  },
  {
    title: "Tea Estate Bungalow in Darjeeling",
    description: "Colonial-era bungalow in working tea estate. Wake up to misty mountain views.",
    image: {
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
      filename: "darjeeling_estate"
    },
    price: 4800,
    location: "Darjeeling",
    country: "India"
  }
];

async function seedDB() {
  try {
    await mongoose.connect(ATLASDB_URL);
    console.log("Connected to MongoDB");

    // Get first user to assign as owner
    const User = require("../models/user");
    const firstUser = await User.findOne();
    
    if (!firstUser) {
      console.log("❌ No users found! Please create a user first.");
      mongoose.connection.close();
      return;
    }

    console.log(`Using user: ${firstUser.username} as owner`);

    // Add owner to all listings
    const listingsWithOwner = sampleListings.map(listing => ({
      ...listing,
      owner: firstUser._id
    }));

    // Clear existing listings (optional - comment out to keep existing)
    // await Listing.deleteMany({});
    // console.log("Cleared existing listings");

    // Insert sample listings
    const result = await Listing.insertMany(listingsWithOwner);
    console.log(`✅ Successfully added ${result.length} listings!`);
    
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    mongoose.connection.close();
  }
}

seedDB();