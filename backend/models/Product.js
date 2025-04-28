const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    originalPrice: {
        type: Number,
        min: 0
    },
    discount: {
        type: Number,
        min: 0,
        max: 100
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Books', 'Gaming', 'Smart Home', 'Computers']
    },
    images: [{
        type: String,
        required: true
    }],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    brand: {
        type: String,
        required: true
    },
    features: [{
        type: String
    }],
    specifications: {
        type: Map,
        of: String
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isDeal: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Product', productSchema); 