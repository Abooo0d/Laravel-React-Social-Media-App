# 📌 Student & Developer Social Platform

A **social networking platform** built for students and developers, combining **social interaction, technical knowledge sharing, academic support, and real-time communication**.  
The platform is available as both a **Web App** and a **Mobile App**, sharing the same backend and database.

---

## 🚀 Features

- 👤 **User Profiles**: Create and edit personal profiles with pictures and bios.
- 📝 **Posts & Markdown Support**: Share formatted posts with text, code blocks, and attachments.
- 👥 **Groups**: Create or join public/private groups to collaborate and share knowledge.
- 💬 **Chat System**:
  - One-to-one and group chats.
  - Real-time text messaging with **Laravel Reverb + WebSockets**.
  - File sharing, voice messages, video calls, and audio calls.
- 🤖 **AI Assistant (Gemini-powered)**: Get coding and academic support inside the chat.
- 🔔 **Notifications**: Instant updates for messages, likes, comments, and group activity.
- 📱 **Cross-Platform**:
  - Web: React + Inertia.js + Tailwind CSS.
  - Mobile: React Native, sharing the same **Laravel API + MySQL database**.
- ⚡ **Performance Optimized**: Uses **TanStack Query + Axios** for caching and async requests.

---

## 🛠️ Tech Stack

### **Backend**

- [Laravel 11](https://laravel.com/) – Backend framework
- [MySQL](https://www.mysql.com/) – Database
- [Laravel Breeze](https://laravel.com/docs/11.x/starter-kits#breeze) – Authentication scaffolding
- [Laravel Reverb](https://laravel.com/docs/reverb) – Real-time WebSockets
- RESTful API (shared with mobile app)

### **Frontend (Web)**

- [Inertia.js](https://inertiajs.com/) – Server-driven SPA
- [React](https://react.dev/) – UI library
- [Tailwind CSS](https://tailwindcss.com/) – Styling framework
- [TanStack Query](https://tanstack.com/query) – Data fetching & caching
- [Axios](https://axios-http.com/) – HTTP client

### **Mobile App**

- [React Native](https://reactnative.dev/) – Cross-platform mobile development
- Shared backend & API with the web app

### **AI Assistant**

- Powered by **Google Gemini API** for natural language processing & code support.

---

## 📂 Project Structure

```
/backend
  ├── app/
  │    ├── Models/        # Eloquent Models (User, Chat, Message, etc.)
  │    ├── Http/Controllers/  # Controllers (Profile, Chat, Post...)
  │    ├── Events/        # Broadcasting events
  │    ├── Resources/     # API resources
  ├── database/migrations/ # Migrations for tables
  ├── routes/             # Web & API routes

/frontend (Web)
  ├── src/
  │    ├── pages/         # Inertia + React pages
  │    ├── components/    # Shared components
  │    ├── hooks/         # React Query hooks
  │    ├── utils/         # Helpers

/mobile
  ├── src/
  │    ├── screens/       # React Native screens
  │    ├── components/    # Shared UI components
  │    ├── services/      # API services
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

### 2️⃣ Backend Setup (Laravel)

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve --host [your-ip]
```

### 3️⃣ Frontend Setup (Web)

```bash
npm install
npm run dev
```

### 4️⃣ Mobile Setup (React Native)

```bash
cd mobile
npm install
npx expo run-android   # or run-ios
```

---

## 📸 Screenshots

- 🔑 Login & Register
- 🏠 Home Feed
- 👤 User Profile
- 👥 Group Profile
- 📝 Post Creation with Markdown
- 💬 Chat & AI Assistant

_(Add images here for better presentation in GitHub)_

---

## ✅ Results & Testing

- ⚡ System successfully handles up to **50 concurrent users**.
- 🔔 Real-time chat & notifications tested without delay.
- 📱 Web and Mobile apps run seamlessly with a shared API.
- 🤖 AI Assistant provides academic and coding support effectively.
- 🔒 Stable and secure environment for users.

---

## 🌟 Future Work

- Expand AI Assistant for **educational tutoring**.
- Enhance group collaboration (shared files, real-time code editor).
- Add **admin dashboard** for managing users & groups.
- Deploy production-ready version with **Docker + CI/CD pipelines**.

---

## 👨‍💻 Author

- **[Abooo0d]**
- **[abdsadalden2001@gmail.com]**
