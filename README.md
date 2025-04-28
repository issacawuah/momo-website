# Momo E-commerce Website

A full-stack e-commerce website built with React, Node.js, Express, and MongoDB.

## Project Structure

```
momo-website/
├── frontend/          # React frontend application
├── backend/           # Node.js/Express backend server
└── README.md          # Project documentation
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Features

- User authentication (login/register)
- Product browsing and search
- Shopping cart functionality
- Secure checkout with Stripe
- Order history
- Admin dashboard for product management

## Technologies Used

### Frontend
- React
- Redux for state management
- Material-UI for styling
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Stripe for payments

## API Endpoints

### Authentication
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user
- GET /api/users/profile - Get user profile

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get product by ID
- POST /api/products - Create new product (admin only)
- PUT /api/products/:id - Update product (admin only)
- DELETE /api/products/:id - Delete product (admin only)

### Orders
- POST /api/orders - Create new order
- GET /api/orders/:id - Get order by ID
- GET /api/orders/myorders - Get user's orders

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 