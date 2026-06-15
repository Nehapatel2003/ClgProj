# Wanderlust - Airbnb Clone

## 🌍 Project Overview

Wanderlust is a full-stack web application inspired by Airbnb that allows users to explore, create, edit, and review travel accommodations. The platform provides a modern and responsive user interface with secure user authentication and image uploads.

This project was developed as a BCA Final Year Major Project using the MERN-related backend stack (Node.js, Express.js, MongoDB) and EJS for server-side rendering.

---

## ✨ Features

### User Authentication

* User Registration (Signup)
* User Login & Logout
* Session-based Authentication using Passport.js
* Flash Messages for Success and Error Handling

### Listings Management

* Create New Listings
* View All Listings
* View Listing Details
* Edit Listings
* Delete Listings
* Image Upload using Cloudinary

### Reviews System

* Add Reviews
* Delete Reviews
* Rating System (1–5 Stars)
* Review Authorization

### Search Functionality

* Search Listings by Title
* Dynamic Search Results

### UI Features

* Responsive Design
* Hero Section
* Category Filters
* Interactive Cards
* Tax Toggle
* OpenStreetMap Integration
* Modern Airbnb-Inspired Design

---

## 🛠 Tech Stack

### Frontend

* HTML5
* CSS3
* Bootstrap 5
* JavaScript
* EJS Templates

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* Passport.js
* Passport Local Strategy

### Cloud Storage

* Cloudinary
* Multer
* Multer Storage Cloudinary

---

## 📁 Project Structure

```text
Wanderlust/
│
├── controller/
├── models/
├── Routes/
├── public/
│   ├── css/
│   └── js/
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
├── utils/
├── middleware.js
├── schema.js
├── cloudconfig.js
├── app.js
└── package.json
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/Nehapatel2003/ClgProj.git
```

### Move into Project

```bash
cd ClgProj
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file:

```env
ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_name

CLOUD_API_KEY=your_cloudinary_key

CLOUD_API_SECRET=your_cloudinary_secret
```

### Run Application

```bash
node app.js
```

or

```bash
nodemon app.js
```

---

## 🌐 Deployment

The project can be deployed using:

* Render
* Railway
* Cyclic
* Vercel (Frontend)
* MongoDB Atlas

---

## 📸 Key Functionalities

* Property Listing Creation
* Property Search
* Property Details Page
* Review and Rating System
* Authentication & Authorization
* Image Upload and Storage
* Interactive Location Map

---

## 🎯 Learning Outcomes

This project helped in understanding:

* MVC Architecture
* RESTful Routing
* Authentication & Authorization
* MongoDB Database Operations
* Cloudinary Image Uploads
* Full Stack Web Development
* Deployment and Hosting

---

## 👨‍💻 Developed By

### Neha Patel

### Ritika Patel

BCA Final Year Major Project

---

## 📄 License

This project is developed for educational purposes and academic submission.

