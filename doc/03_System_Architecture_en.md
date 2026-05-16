# System Architecture

## Backend Architecture
- Layered design: DTO (Zod) → Service → Controller → Route
- JWT Authentication + Refresh Tokens
- Prisma ORM + PostgreSQL
- MinIO for file storage
- Global error handling + Rate limiting

## Frontend Architecture
- React 18 + TypeScript + Vite
- MUI v5 + TanStack Query
- Protected Routes + AuthContext
- Dark mode with localStorage persistence

## Key Modules
- Auth Module
- Dataset + Version Module
- Upload Module (MinIO)
- Permission Middleware
- Activity Log + Heatmap
- Team & Organization
- Notification System
- Comment + Mention System
- Export Module (ZIP/CSV/JSON)