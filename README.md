# DatasetForge

**Professional AI Dataset Management Platform**

DatasetForge is a modern, full-featured platform designed for managing AI training datasets. It provides robust version control, team collaboration, permission management, activity tracking, and multi-format export capabilities.

---

## 🚀 Key Features

### Core Dataset Management
- **Version Control**: Full versioning system with detailed metadata
- **Upload System**: Secure file uploads via MinIO presigned URLs
- **Tags & Search**: Powerful tagging system with full-text search
- **Download Statistics**: Track downloads at both dataset and version level

### Collaboration & Sharing
- **Team Management**: Create teams, invite members, manage roles
- **Permission System**: Granular permissions (READ / WRITE / ADMIN)
- **Public Share Links**: Generate time-limited, permission-controlled shareable links
- **Comments & Mentions**: Dataset-level comments with @mention notifications

### Analytics & Insights
- **Activity Log**: Comprehensive audit trail of all actions
- **Activity Heatmap**: Visual 30-day activity visualization
- **Version Comparison**: Side-by-side diff between any two versions

### Export & Integration
- **Multi-format Export**: Export as ZIP, CSV, or JSON
- **API-First Design**: Full OpenAPI/Swagger documentation
- **Webhook Ready** (extensible)

---

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: JWT (Access + Refresh Tokens) + bcrypt
- **File Storage**: MinIO (S3-compatible)
- **Email**: Nodemailer
- **Documentation**: Swagger / OpenAPI

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **UI Library**: Material-UI (MUI) v5
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Theming**: Dark / Light mode with persistence

### DevOps
- **Containerization**: Docker + docker-compose
- **CI/CD**: GitHub Actions
- **Testing**: Jest + Supertest

---

## 📁 Project Structure

```
DatasetForge/
├── backend/                 # Node.js + Prisma backend
│   ├── src/
│   │   ├── modules/        # Feature modules (auth, dataset, team, etc.)
│   │   ├── middlewares/    # Auth, permission, error, rate-limit
│   │   └── app.ts
│   └── prisma/schema.prisma
├── frontend/                # React + Vite frontend
│   └── src/
│       ├── pages/          # All main pages
│       ├── components/     # Reusable UI components
│       └── contexts/       # AuthContext, etc.
├── docker-compose.yml
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker + Docker Compose
- PostgreSQL (or use docker-compose)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Full Stack with Docker
```bash
docker-compose up --build
```

---

## 📚 Documentation

- [Overview](doc/01_Overview_en.md)
- [Features](doc/02_Features_en.md)
- [System Architecture](doc/03_System_Architecture_en.md)
- [Data Model](doc/04_Data_Model_en.md)
- [API Design](doc/05_API_Design_en.md)

**中文版文件**：請參閱 `doc/` 目錄下的 `_zh.md` 檔案

---

## 🔐 Security
- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- Rate limiting on all API endpoints
- Secure file uploads via presigned URLs
- Comprehensive input validation (Zod)

---

## 📈 Current Status

**Production Ready** — DatasetForge is feature-complete and suitable for production use in small to medium teams.

**Completed Highlights**:
- Full authentication & authorization
- Dataset versioning + upload
- Team collaboration + permissions
- Activity logging + heatmap
- Public share links
- Comments + mentions
- Version comparison (Diff)
- Multi-format export (ZIP / CSV / JSON)
- Dark mode + responsive UI
- Docker + CI/CD pipeline

---

## 🤝 Contributing

We welcome contributions! Please open an issue or submit a pull request.

---

## 📄 License

MIT License — feel free to use for personal or commercial projects.

---

**Powered by [YSK Limited](https://ysk.hk/) — Hong Kong Remote Dev Team & Enterprise Solutions**
