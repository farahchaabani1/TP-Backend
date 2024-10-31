const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    
    images: {
        type: [String],
        default: []
    }
    
});

module.exports = mongoose.model("Product", ProductSchema);