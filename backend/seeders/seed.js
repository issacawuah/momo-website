const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const bcrypt = require('bcryptjs');

const products = [
    {
        title: 'Smartphone X Pro',
        description: 'Latest smartphone with advanced features',
        price: 499.99,
        originalPrice: 599.99,
        discount: 20,
        category: 'Electronics',
        images: ['images/products/smartphone.jpg'],
        rating: 4.5,
        stock: 50,
        brand: 'TechBrand',
        features: ['5G Connectivity', '120Hz Display', 'Triple Camera'],
        specifications: {
            'Screen Size': '6.7 inches',
            'RAM': '8GB',
            'Storage': '256GB',
            'Battery': '4500mAh'
        },
        isFeatured: true,
        isDeal: true
    },
    {
        title: 'Wireless Headphones Pro',
        description: 'Premium wireless headphones with noise cancellation',
        price: 99.99,
        originalPrice: 119.99,
        discount: 15,
        category: 'Electronics',
        images: ['images/products/headphones.jpg'],
        rating: 4.2,
        stock: 100,
        brand: 'AudioPro',
        features: ['Noise Cancellation', '30hr Battery', 'Bluetooth 5.0'],
        specifications: {
            'Driver Size': '40mm',
            'Battery Life': '30 hours',
            'Connectivity': 'Bluetooth 5.0',
            'Weight': '250g'
        },
        isFeatured: true,
        isDeal: true
    },
    {
        title: 'Smart Watch Series 5',
        description: 'Advanced smartwatch with health monitoring',
        price: 199.99,
        originalPrice: 249.99,
        discount: 25,
        category: 'Electronics',
        images: ['images/products/smartwatch.jpg'],
        rating: 4.7,
        stock: 75,
        brand: 'TechBrand',
        features: ['Heart Rate Monitor', 'GPS', 'Water Resistant'],
        specifications: {
            'Display': '1.4 inch AMOLED',
            'Battery Life': '7 days',
            'Water Resistance': '50m',
            'Compatibility': 'iOS & Android'
        },
        isFeatured: true,
        isDeal: true
    }
];

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: '123456',
        role: 'admin'
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        role: 'user'
    }
];

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/momo_shop', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();

        // Create users
        const createdUsers = await User.insertMany(
            users.map(user => ({
                ...user,
                password: bcrypt.hashSync(user.password, 10)
            }))
        );

        // Create products
        const createdProducts = await Product.insertMany(products);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

importData(); 