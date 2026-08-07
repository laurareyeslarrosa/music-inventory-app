<p align="center">
  <img src="./docs/hero.png" alt="Music Inventory"/>
</p>

# 🎵 Music Inventory

A modern **Music Inventory Management** application built with **React**, **TypeScript**, **.NET 8**, and **SQLite**.

Designed with a futuristic synthwave/cyberpunk interface, this project showcases a clean architecture, reusable components, and modern frontend development practices.

---

## ✨ Features

- 🎵 Create new songs
- 📝 Edit existing songs
- 🗑️ Delete songs
- ❤️ Mark songs as favorites
- 🔍 View detailed song information
- 🎧 Audio player integration
- 📱 Fully responsive interface
- ⚡ Fast API powered by .NET 8
- 💾 SQLite database

---

## 🖼️ Preview

> _(Screenshots will be added soon)_

---

## 🛠️ Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- React Hook Form
- Axios
- Sass (7-1 Architecture)

### Backend

- .NET 8 Web API
- Entity Framework Core
- SQLite
- Swagger

---

# 🏗️ Frontend Architecture

Instead of keeping everything inside a single component, the application follows a **Feature-Based Clean Architecture**, making the codebase scalable and easy to maintain.

```
src
│
├── app
├── assets
├── components
├── features
│     └── songs
│           ├── api
│           ├── components
│           ├── hooks
│           ├── pages
│           ├── services
│           ├── types
│           └── mappers
│
├── layouts
├── routes
├── services
├── shared
└── styles
```

The application is organized into independent features, where each module owns its:

- Components
- Services
- API layer
- Hooks
- Types
- Business logic

This approach keeps the project modular and allows new features to be added without affecting existing code.

---

# 🎨 Design

The interface is inspired by retro-futuristic **Synthwave** and **Cyberpunk** aesthetics.

Main characteristics include:

- Neon cyan and magenta accents
- Dark futuristic background
- Animated glowing elements
- Glassmorphism cards
- Responsive layouts
- Custom Hero section
- Reusable UI components

---

# 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/yourusername/music-inventory-app.git
```

Install dependencies

```bash
npm install
```

Run the application

```bash
npm run dev
```

The frontend will start on

```
http://localhost:5173
```

---

## 🔗 Backend

The frontend communicates with a .NET Web API.

By default the API URL is configured using:

```
VITE_API_BASE_URL
```

Create a `.env` file:

```env
VITE_API_BASE_URL=https://localhost:5001
```

---

## 📂 Project Goals

This project was created as a portfolio application to demonstrate:

- Clean React architecture
- Modern TypeScript patterns
- Component reusability
- Feature-driven organization
- API integration
- Responsive UI design
- Professional code structure
- Full CRUD operations

---

## 📈 Future Improvements

- User authentication
- Playlist management
- Album support
- Artist profiles
- Search & filtering
- Pagination
- Dark/Light themes
- Unit testing
- Docker support
- CI/CD pipeline
- Cloud deployment

---

## 👩‍💻 Author

**Laura Reyes**

Senior Full Stack Developer

GitHub:
https://github.com/laurareyeslarrosa

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)

![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

![.NET](https://img.shields.io/badge/.NET-8-512BD4?style=for-the-badge&logo=dotnet)

![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite)

![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>
