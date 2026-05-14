# DatasetForge

A professional platform for managing, versioning, and preparing high-quality datasets for AI/ML model training.

## Tech Stack

**Backend**
- Node.js + TypeScript
- Express
- Prisma + MySQL
- Zod (DTO Validation)
- JWT Authentication

**Planned**
- MinIO / S3 for file storage
- React + MUI Frontend

## Project Structure

```
DatasetForge/
├── backend/
│   ├── src/
│   │   ├── modules/          # Feature modules (auth, dataset, version...)
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── config/
│   ├── prisma/
│   └── package.json
└── frontend/ (coming soon)
```

## Getting Started (Backend)

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MySQL credentials

npx prisma generate
npx prisma migrate dev

npm run dev
```

## Roadmap

- [x] Initial project structure
- [ ] Authentication (JWT)
- [ ] Dataset CRUD + Versioning
- [ ] File upload with MinIO
- [ ] Frontend (React + MUI)
- [ ] Advanced features (stats, search, etc.)

## License

MIT
