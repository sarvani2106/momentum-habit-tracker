<div align="center">

# 🌱 Momentum Habit Tracker

### Small Habits. Lasting Momentum.

*A modern habit tracking application that helps users build consistency through visual progress, streaks, and AI-powered motivation.*

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1-6DB33F?style=for-the-badge&logo=springboot)
![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

</div>

---

# 📚 Table of Contents

- Project Overview
- Features
- Technology Stack
- Architecture
- Folder Structure
- Installation
- Environment Variables
- API Documentation
- Security
- Deployment
- Future Roadmap
- Lessons Learned
- Contributing
- License

---

# 📖 Project Overview

Most habit trackers eventually become digital to-do lists, offering little motivation beyond checking off completed tasks.

**Momentum** was built to make habit building engaging, motivating, and rewarding by combining visual progress tracking, streaks, consistency heatmaps, and AI-powered encouragement.

Inspired by **Duolingo's streak system**, **GitHub's contribution graph**, and the clean simplicity of **Headspace**, Momentum helps users stay consistent while enjoying a distraction-free experience.

Whether you're a student developing productive routines or a professional managing daily goals, Momentum provides the tools needed to build lasting habits.

---

# 🎯 Main Objectives

- Build long-term habits through daily consistency.
- Encourage users with visual progress indicators.
- Provide AI-powered motivational insights.
- Deliver a clean, responsive, and intuitive user experience.
- Make habit tracking enjoyable rather than repetitive.

---

# 🎨 Design Philosophy

Momentum follows one simple belief:

> **Consistency grows when progress is visible.**

Instead of overwhelming users with unnecessary features, Momentum focuses on a minimal interface supported by meaningful motivation.

Design inspirations include:

- 🔥 Duolingo Streaks
- 📊 GitHub Contribution Heatmaps
- 🎨 Headspace Minimal UI

---

# ✨ Features

## Core Features

- Secure JWT Authentication
- User Registration & Login
- Create, Edit and Delete Habits
- Daily Habit Completion Tracking
- Habit Streak Counter
- Consistency Heatmap
- Responsive Dashboard
- Profile Management

## Advanced Features

- AI Coach (Mo)
- Weekly Habit Analysis
- Personalized Motivational Insights
- Smooth Framer Motion Animations
- Mobile-First Responsive Design
- RESTful API Architecture

---

# 🛠 Technology Stack

## Frontend

- React 19
- Vite
- Tailwind CSS v4
- Framer Motion
- Recharts
- Lucide React

## Backend

- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA

## Database

- PostgreSQL

## Deployment

- Vercel
- Render

---

# 🏗 Architecture

```text
React Frontend
        │
        ▼
 REST API Requests
        │
        ▼
Spring Boot Backend
        │
        ▼
Spring Security + JWT
        │
        ▼
Controller Layer
        │
        ▼
Service Layer
        │
        ▼
Repository Layer
        │
        ▼
PostgreSQL Database
```

---

# 📁 Folder Structure

```text
momentum-workspace/

├── momentum-frontend/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   └── assets/
│
└── momentum-backend/
    ├── config/
    ├── controller/
    ├── dto/
    ├── model/
    ├── repository/
    ├── security/
    └── service/
```

---

# 💻 Installation

## Prerequisites

- Node.js 18+
- Java 21
- Maven
- PostgreSQL

### Clone Repository

```bash
git clone https://github.com/Sarvani2106/momentum.git
```

### Backend

```bash
cd momentum-backend
mvn spring-boot:run
```

### Frontend

```bash
cd momentum-frontend
npm install
npm run dev
```

---


# 📡 API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login user |
| GET | /api/habits | Retrieve habits |
| POST | /api/habits | Create habit |
| PUT | /api/habits/{id}/toggle | Toggle habit completion |
| DELETE | /api/habits/{id} | Delete habit |

---

# 🛡 Security

- BCrypt Password Encryption
- JWT Authentication
- Spring Security Authorization
- Protected REST APIs
- CORS Configuration
- Environment-based Secrets

---

# 🌍 Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | PostgreSQL |

---

# 🚀 Future Roadmap

- Email Reminders
- Push Notifications
- Calendar Integration
- Google Authentication
- Dark Mode
- Mobile Application
- Offline Support

---

# 📚 Lessons Learned

Building Momentum strengthened my understanding of:

- React Component Architecture
- Spring Boot REST APIs
- PostgreSQL Database Design
- Responsive UI Development
- Full Stack Deployment
- State Management
- REST API Integration

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

Made with ❤️ by **Sarvani**

</div>
