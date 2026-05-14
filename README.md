# DatasetForge

**A professional platform for managing, versioning, and preparing high-quality datasets for AI/ML model training.**

DatasetForge helps data scientists, ML engineers, and teams efficiently organize, version, and curate training data with a clean web interface and robust backend.

## Features

- Dataset management with rich metadata
- Version control for reproducibility
- Secure large file storage via MinIO/S3
- Role-based access control
- Modern React + MUI frontend
- RESTful API with JWT authentication

## Tech Stack

**Backend**
- Node.js + TypeScript + Express
- Prisma + MySQL
- Zod (validation)
- JWT Authentication

**Frontend**
- Vite + React 18 + TypeScript
- MUI (Material UI)
- React Router + TanStack Query

**Storage**
- MinIO (S3-compatible object storage)

## Documentation

All design documents are located in the `doc/` folder:

- [Overview](./doc/01_Overview/overview_en.md)
- [Features Specification](./doc/02_Features/features_en.md)
- [System Architecture](./doc/03_System_Architecture/architecture_en.md)
- [Data Model](./doc/04_Data_Model/data_model_en.md)
- [API Design](./doc/05_API_Design/api_design_en.md)

## Getting Started (Backend)

```bash
cd backend
npm install
cp .env.example .env

npx prisma generate
npx prisma migrate dev
npm run dev
```

## Project Structure

```
DatasetForge/
├── backend/          # Node.js + Prisma backend
├── frontend/         # React + MUI frontend (coming soon)
└── doc/              # System design documents
```

## Roadmap

- [x] Professional system design documents
- [ ] Authentication module (JWT + Zod)
- [ ] Dataset CRUD + Versioning
- [ ] MinIO integration
- [ ] Frontend development
- [ ] Advanced features (search, stats, collaboration)

## License

MIT

---

<sub>Powered by [YSK Limited](https://ysk.hk/) — Hong Kong Remote Dev Team & Enterprise Solutions</sub>