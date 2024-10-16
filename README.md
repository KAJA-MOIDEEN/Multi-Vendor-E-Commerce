# Multi Vendor E-Commerce Platform

## Overview
The Multi Vendor E-Commerce platform is a comprehensive web application designed to allow multiple sellers to manage and sell their products on a single platform. It includes features for administrators, staff, sellers, and customers, with each role having specific permissions and capabilities. Customers can also become sellers, adding flexibility and scalability to the platform.

## Features
- **Admin Dashboard**: Manage users, sellers, products, and orders.
- **Seller Dashboard**: Manage personal products, view sales reports, and track orders.
- **Customer Features**: Browse products, add to cart, make purchases, and track orders.
- **Staff Dashboard**: Support role for managing user queries and assisting the admin.
- **Responsive Design**: Fully functional on both desktop and mobile devices.
- **Role-Based Access Control**: Different dashboards for admins, staff, sellers, and customers.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **CloudStroage**: Cloudinary
- **State Management**: Redux, useContext
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful APIs for communication between frontend and backend

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/multi-vendor-ecommerce.git
    ```
2. Navigate to the project directory:
    ```bash
    cd multi-vendor-ecommerce
    ```
3. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```
4. Install frontend dependencies:
    ```bash
    cd frontend
    npm install
    ```
5. Install frontend dependencies:
    ```bash
    cd Admin
    npm install
    ```

### Configuration
1. Create a `.env` file in the `backend` directory with the following variables:
    ```env
    PORT=8000
    MONGODB_URI=<your-mongodb-connection-string>
    JWT_SECRET=<your-jwt-secret>
    ```

### Running the Application

#### Backend
To start the backend server, run:
```bash
cd backend
npm run server
```

#### Frontend
To start the frontend development server, run:
```bash
cd frontend
npm run dev
```

### Project Structure
```plaintext
multi-vendor-ecommerce/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── App.js
│
├── Admin/
│   ├── public/
│   ├── src/
│   └── App.js
│ 
├── .gitignore
├── README.md
└── package.json
```

## Team Members
- **Kajamoideen (Team Leader)**: 
- **Vimal**:
- **Jerwin**: 
- **Nazeer**:
- **Moumi**: 

## Contributing
Feel free to submit issues and pull requests to improve this project.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

---