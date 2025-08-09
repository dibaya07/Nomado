# 🧭 Nomado – Travel Booking Site

Nomado is a full-stack travel booking web application inspired by Airbnb. Built with the MERN stack and modern tools, it allows users to explore travel listings, post accommodations, and manage bookings with secure authentication and image uploads.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- **React** (with [Vite]) — blazing fast development
- **Tailwind CSS** — utility-first styling
- **Axios** — for API communication

### 🌐 Backend
- **Node.js** & **Express.js**
- **MongoDB** (via [Mongoose])
- **Joi** (via `joi-dev`) — schema validation
- **Cloudinary** — image upload & storage
- **JWT (JSON Web Tokens)** — for authentication
- **HTTP-only Cookies** — secure token storage

---

## 🔐 Features

- ✅ User Authentication & Authorization
  - Signup / Login functionality
  - Secure JWT tokens stored in HTTP-only cookies
  - Protected routes (user-specific and admin-level access)

- 🏡 Listing Management
  - Create, Read, Update, and Delete (CRUD) travel listings
  - Image upload for each listing via Cloudinary
  - Server-side validation for all form inputs using Joi

- 🌍 Explore and Book
  - Browse listings by location or country
  - Detailed listing pages with images and descriptions

- 📦 RESTful API Structure
  - Clean and scalable routes for all resources

---

