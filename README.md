# 🏢 Companies Management

A modern full-stack web application for managing company data, built with **Node.js**, **Express**, **MongoDB**, **React**, **Tailwind CSS**, and **Toastify**.

## 🚀 Features

- **Add, Edit, Delete Companies**  
  Manage company records with a clean, responsive UI.

- **Instant Search & Filter**  
  Filter companies by name, industry, or location with real-time, case-insensitive search.

- **Responsive Card Layout**  
  Companies are displayed in beautiful cards, optimized for all devices.

- **Modern UI & UX**  
  Styled with Tailwind CSS for a professional look. Toastify notifications for instant feedback.

- **Confirmation Dialogs**  
  Safe delete actions with custom confirmation modals.

- **Smooth Animations & Loaders**  
  Enjoy smooth transitions and loading indicators for a polished experience.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** React, Tailwind CSS, Toastify
- **API:** RESTful endpoints for CRUD and search

## 📦 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ritiku2004/Company-Management-.git
   cd Company-Management-
   ```

2. **Backend Setup**
   - Go to the `Backend` folder.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and add your MongoDB URI:
     ```
     MONGO_URI=your_mongodb_connection_string
     ```
   - Start the backend server:
     ```bash
     node server.js
     ```

3. **Frontend Setup**
   - Go to the `Frontend` folder.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend:
     ```bash
     npm run dev
     ```

4. **Access the App**
   - Open your browser and go to `http://localhost:5173`

## 📋 API Endpoints

- `GET /api/companies` — List & filter companies
- `POST /api/companies` — Add a new company
- `PUT /api/companies/:id` — Update a company
- `DELETE /api/companies/:id` — Delete a company


## 💡 Customization

- Easily extend company fields in the backend model.
- Tweak Tailwind classes for your own branding.
- Add authentication or more advanced features as needed.

## 📝 License

MIT
