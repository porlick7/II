const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({ 
    name: {
        type: String,
        unique: true
    },
    activeSubstance: {
        type: Array,
        of: String
    }
});

module.exports = {
    ProductSchema,
    Product: mongoose.model('product', ProductSchema)
}