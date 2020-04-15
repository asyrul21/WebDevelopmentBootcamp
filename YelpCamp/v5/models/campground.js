var mongoose = require("mongoose");

//SCHEMA setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
});

const Campground = mongoose.model("Campground", campgroundSchema);
module.exports = Campground;