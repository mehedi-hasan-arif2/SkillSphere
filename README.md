# 🎓 SkillSphere – Online Learning Platform

SkillSphere is a modern, fully responsive online learning platform built with **Next.js App Router**. It allows users to explore skill-based courses, view detailed curriculums, and manage their personal learning profiles through a secure, database-backed authentication system.

## 🔗 Live Link
- **Live URL:** https://skillsphere23.netlify.app/

## 🎯 Project Purpose

The goal of this platform is to bridge the gap between industry experts and learners. It provides a structured environment where users can discover trending courses, search for specific skills, and securely manage their accounts to track their learning journey — with real, database-backed authentication rather than mock or demo login systems.

## 🚀 Key Features

- **Secure Authentication (BetterAuth):** Real email/password registration and login, backed by MongoDB — no localStorage or fake sessions.
- **Google Social Login:** One-click sign-in/sign-up using real Google OAuth 2.0, fully integrated with BetterAuth.
- **Protected Routes:** Course Details and My Profile pages are locked behind authentication via Next.js middleware — unauthenticated users are redirected to Login and sent back to their originally requested page after signing in.
- **Session-Based Navbar:** Navbar dynamically updates (Avatar + Logout vs Login/Register) based on live session state.
- **Profile Management:** Dedicated `/my-profile` page showing live user data, with a separate `/my-profile/update` route to update Name and Profile Image URL — powered by BetterAuth's `updateUser` API.
- **Dynamic Search:** Real-time course search by title on the All Courses page.
- **Popular, Trending & Curated Sections:** Home page includes a Hero banner, Top 3 Popular Courses, Learning Tips, New Releases/Trending Courses, and Top Instructors sections.
- **Toast Notifications:** Real-time success/error feedback across login, register, logout, and profile update actions.
- **Loader & Not Found Handling:** Custom loading state during data fetch and a custom 404 page for unmatched routes.
- **Responsive Layout:** Fully responsive design across Mobile, Tablet, and Desktop breakpoints.
- **Interactive UX:** Smooth entrance animations and hover effects on course cards using Framer Motion (Motion).

## 🔐 Authentication Architecture

- **Library:** BetterAuth (`better-auth`)
- **Database:** MongoDB Atlas (stores `user`, `account`, `session`, and `verification` collections)
- **Providers:** Email/Password + Google OAuth
- **Session Handling:** Server-verified session cookies, checked via Next.js middleware for route protection

## 🛠️ NPM Packages Used

- `next` — Next.js App Router framework
- `react` / `react-dom` — UI library
- `tailwindcss` — Utility-first styling
- `daisyui` — Prebuilt UI components on top of Tailwind
- `better-auth` — Authentication, session management, and profile updates
- `mongodb` — Database adapter for BetterAuth
- `framer-motion` — Smooth entrance/hover animations (Motion)
- `swiper` — Touch slider/carousel support
- `react-hot-toast` & `sonner` — Toast notifications for user feedback
- `lucide-react` — Lightweight, clean UI icons

## ⚙️ Environment Variables

This project uses environment variables to securely manage sensitive configuration such as database connection strings, authentication secrets, and Google OAuth credentials. Create a `.env` file in the project root with the following keys:

```
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
NEXT_PUBLIC_BETTER_AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## 🧱 Tech Stack

Next.js · Tailwind CSS · DaisyUI · BetterAuth · MongoDB Atlas · Framer Motion

## 📌 Pages Overview

| Route | Description |
|---|---|
| `/` | Home page with Hero, Popular Courses, Learning Tips, Trending Courses, and Top Instructors |
| `/courses` | All courses listing with live search by title |
| `/courses/[id]` | 🔒 Protected course details page with static curriculum |
| `/login` | Email/password login with Google social login |
| `/register` | Email/password registration with Google social sign-up |
| `/my-profile` | 🔒 Protected profile page showing live session data |
| `/my-profile/update` | 🔒 Protected page to update profile name and image URL |

## 🏃 Getting Started (Local Development)

```bash
# install dependencies
npm install

# run the development server
npm run dev
```


