# 📰 Axum + Next.js News Portal

A full-stack News Portal application built with **Rust (Axum)**, **PostgreSQL**, and **Next.js**. This project demonstrates a clean separation between frontend and backend while implementing a RESTful API for managing news articles.

---

## ✨ Features

- 📰 Create News
- 📖 Read News
- 🗑 Delete News
- ✏️ Update News (In Progress)
- ⚡ REST API with Axum
- 🗄 PostgreSQL Database
- 🎨 Next.js Frontend
- 🌐 CORS Support
- 📦 SQLx Integration

---

## 🛠 Tech Stack

### Backend

- Rust
- Axum
- SQLx
- PostgreSQL
- Tokio
- Tower HTTP
- dotenvy

### Frontend

- Next.js (App Router)
- TypeScript
- React

---

## 📂 Project Structure

```
axum-nextjs-portal
│
├── backend
│   ├── src
│   │   ├── handlers
│   │   │   ├── create.rs
│   │   │   ├── read.rs
│   │   │   ├── update.rs
│   │   │   ├── delete.rs
│   │   │   └── mod.rs
│   │   │
│   │   ├── models
│   │   │   ├── news.rs
│   │   │   └── mod.rs
│   │   │
│   │   └── main.rs
│   │
│   ├── Cargo.toml
│   └── .env
│
└── frontend
    ├── app
    │   ├── admin
    │   ├── client
    │   └── api.ts
    │
    └── package.json
```

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/SenjuU7/axum-nextjs-portal.git
cd axum-nextjs-portal
```

---

## Backend

### Install Dependencies

```bash
cd backend
cargo build
```

### Configure Environment

Create `.env`

```env
DATABASE_URL=postgres://username:password@localhost:5432/news_db
```

### Run Backend

```bash
cargo run
```

Server

```
http://127.0.0.1:3001
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Application

```
http://localhost:3000
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/client` | Get all news |
| POST | `/admin` | Create news |
| PUT | `/admin/:id` | Update news |
| DELETE | `/admin/:id` | Delete news |

---

## 📸 Preview

### Admin Panel

- Publish News
- Delete News
- Manage Articles

### Client

- Read News
- Responsive News List

---

## 🎯 Roadmap

- [x] Create News
- [x] Read News
- [x] Delete News
- [ ] Update News
- [ ] Authentication (JWT)
- [ ] Search
- [ ] Pagination
- [ ] Categories
- [ ] Rich Text Editor
- [ ] Image Upload
- [ ] Docker Support
- [ ] Deployment

---

## 📚 What I Learned

This project was built to learn and practice:

- Rust Backend Development
- Axum Framework
- REST API Design
- SQLx
- PostgreSQL
- Next.js App Router
- TypeScript
- CRUD Architecture
- Modular Project Structure

---

## 🤝 Contributing

Pull requests are welcome.

If you'd like to improve this project, feel free to fork the repository and submit a PR.

---

## 📄 License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, consider giving it a Star!
