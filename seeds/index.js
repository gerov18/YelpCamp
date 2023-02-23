const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20 + 10);
    const camp = await new Campground({
      //YOUR USER ID
      author: "63d980d2ba632988dd4a5936",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo mollitia ipsam accusantium sint voluptates consequuntur sed ullam corporis aut laboriosam. Asperiores cumque ipsum et dicta illum! Amet quae sint facilis!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dpz8wdlwm/image/upload/v1675526822/YelpCamp/wairxx8160v8sv6jycqg.jpg",
          filename: "YelpCamp/wairxx8160v8sv6jycqg",
        },
        {
          url: "https://res.cloudinary.com/dpz8wdlwm/image/upload/v1675526823/YelpCamp/ah2mzcrimg9e0afpk8cg.jpg",
          filename: "YelpCamp/ah2mzcrimg9e0afpk8cg",
        },
        {
          url: "https://res.cloudinary.com/dpz8wdlwm/image/upload/v1675526821/YelpCamp/xf2u1ox0ygyyrpjbjhdt.jpg",
          filename: "YelpCamp/xf2u1ox0ygyyrpjbjhdt",
        },
        {
          url: "https://res.cloudinary.com/dpz8wdlwm/image/upload/v1675526823/YelpCamp/lffoc350rexhny6rsmvx.jpg",
          filename: "YelpCamp/lffoc350rexhny6rsmvx",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
