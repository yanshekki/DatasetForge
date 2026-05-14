# DatasetForge - System Architecture Design

**Document Version:** 1.0  
**Last Updated:** 2026-05-15  
**Language:** English

---

## 1. Architecture Goals

The system architecture of DatasetForge is designed with the following goals:

- **Scalability**: Support usage from small teams to large enterprises
- **Maintainability**: Clear layered and modular design
- **Security**: Protect user data and system resources
- **Performance**: Efficient access for large-scale datasets
- **Developer Experience**: Use mature technology stack to reduce development and maintenance cost

---

## 2. High-Level Architecture

DatasetForge follows a **layered + modular architecture**:

```
[ Frontend ]               ← React + MUI + Vite
       ↓
[ Backend API Layer ]      ← Node.js + Express + TypeScript
       ↓
[ Business Logic Modules ] ← Feature-based modules
       ↓
[ Data Access Layer ]      ← Prisma ORM
       ↓
[ Persistence Layer ]
   ├── MySQL (Metadata & User data)
   └── MinIO / S3 (Object Storage)
```

---

## 3. Technology Stack

| Layer            | Technology                          | Purpose |
|------------------|-------------------------------------|---------|
| **Frontend**     | Vite + React 18 + TypeScript + MUI  | Modern web UI |
| **Backend**      | Node.js + Express + TypeScript      | RESTful API server |
| **ORM**          | Prisma                              | Type-safe database access |
| **Database**     | MySQL                               | Structured metadata storage |
| **Object Storage** | MinIO (or AWS S3)                | Large binary file storage |
| **Authentication** | JWT + bcrypt                     | Secure user authentication |
| **Validation**   | Zod                                 | DTO validation |
| **Logging**      | Pino                                | Structured logging |

---

## 4. Core System Components

### 4.1 Frontend

- **Tech Stack**: Vite + React + TypeScript + MUI
- **Responsibilities**:
  - User interface and interaction
  - State management (React Query)
  - Communication with backend APIs
  - Direct file upload to MinIO using presigned URLs

### 4.2 Backend

- **Tech Stack**: Node.js + Express + TypeScript
- **Responsibilities**:
  - Expose RESTful APIs
  - Handle business logic
  - Authentication and authorization
  - Interact with database and storage services

**Recommended Module Structure**:
src/
├── modules/
│   ├── auth/
│   ├── dataset/
│   ├── version/
│   └── upload/
├── middlewares/
├── utils/
└── config/

### 4.3 Data Layer

- **Metadata Storage**: MySQL + Prisma
  - Users, Datasets, Versions, Permissions, etc.
- **Binary File Storage**: MinIO / S3
  - Actual data files (JSONL, images, Parquet, etc.)

### 4.4 Security & Infrastructure

- **Authentication**: JWT
- **File Upload**: Presigned URLs (Frontend uploads directly to MinIO)
- **Logging**: Pino
- **Deployment**: Docker + PM2 (Backend) / Nginx (Frontend)

---

## 5. Key Design Decisions

| Decision                        | Rationale |
|--------------------------------|-----------|
| Node.js + TypeScript           | High development speed, consistent with frontend |
| Prisma as ORM                  | Excellent type safety and developer experience |
| MinIO as Object Storage        | Cost-effective, S3 compatible |
| Presigned URL Upload           | Reduces backend load, improves upload performance |
| Layered + Feature-based Modules| Improves maintainability and testability |
| JWT Authentication             | Stateless, suitable for REST APIs |

---

## 6. Example Data Flow (Dataset Upload)

1. User creates a new Dataset via frontend
2. Backend creates Dataset record and returns version info
3. Frontend requests a Presigned URL from backend
4. Frontend uploads file directly to MinIO
5. After upload, frontend notifies backend to update version metadata
6. Backend updates statistics and records the new version

---

## 7. Future Improvements

- Add Redis as caching layer
- Introduce message queue (BullMQ) for async tasks
- Add API Gateway (e.g. Kong or Nginx)
- Container orchestration (Docker Compose → Kubernetes)
- Observability (Logging + Metrics + Tracing)

---

## 8. Related Documents

- `04_Data_Model/data_model_en.md`: Data Model Design
- `05_API_Design/api_design_en.md`: API Design Specification

---

**End of Document**