const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postId: {
        type: Number,
        required: true,
        unique: true,
        default: 1000
    },
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: false
    }
},
{timestamps: true});

module.exports = mongoose.model('Posts',postSchema);