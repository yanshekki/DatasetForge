# DatasetForge

A modern platform for managing AI training datasets with version control, team collaboration, and secure file storage.

## Features

- Dataset management with versioning
- Secure file upload/download via MinIO
- Team collaboration and permission management
- Activity logging
- JWT authentication

## Tech Stack

**Backend**: Node.js + Express + Prisma + PostgreSQL + MinIO
**Frontend**: React + TypeScript + MUI + Vite

## Quick Start (Docker - Recommended)

### 1. Clone the repository
```bash
git clone https://github.com/yanshekki/DatasetForge.git
cd DatasetForge
```

### 2. Setup environment variables
```bash
cp .env.example .env
# Edit .env with your actual values
```

### 3. Start all services with Docker Compose
```bash
docker-compose up --build
```

This will start:
- Backend (port 3000)
- Frontend (port 80)
- MinIO (port 9000 + console on 9001)

### 4. Access the application
- Frontend: http://localhost
- Backend API: http://localhost:3000
- MinIO Console: http://localhost:9001

## Manual Development Setup

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

See `.env.example` for all required variables.

## License

MIT

---

<sub>Powered by [YSK Limited](https://ysk.hk/) — Hong Kong Remote Dev Team & Enterprise Solutions</sub>
