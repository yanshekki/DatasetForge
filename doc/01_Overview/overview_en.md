# Overview

**DatasetForge** is a professional-grade platform designed specifically for managing AI training datasets at scale. It combines robust version control, enterprise-grade team collaboration, fine-grained permission management, comprehensive activity auditing, and flexible data export capabilities into a single, cohesive solution.

## Project Vision

In the era of large language models and generative AI, high-quality, well-organized training data has become one of the most critical assets for organizations. DatasetForge was built to solve the real-world challenges teams face when managing hundreds or thousands of datasets across multiple projects and collaborators.

## Current Status (May 2026)

DatasetForge has reached **production-ready** status with a complete feature set that supports end-to-end dataset lifecycle management:

### Core Capabilities
- Full authentication & authorization with JWT + refresh tokens
- Advanced dataset versioning with rich metadata
- Secure file uploads via MinIO presigned URLs
- Powerful tagging system with full-text search
- Granular permission control (READ / WRITE / ADMIN)
- Public shareable links with expiration and permission scoping

### Collaboration Features
- Team and organization management
- Dataset-level comments with @mention notifications
- Activity logging with visual heatmap
- Version comparison (Diff) between any two versions

### Analytics & Export
- Download statistics at both dataset and version level
- Multi-format export (ZIP, CSV, JSON)
- Comprehensive audit trail

### User Experience
- Modern responsive UI with dark/light mode
- Real-time updates via React Query
- Professional error handling and user feedback

## Technology Foundation

The platform is built on a modern, maintainable stack:
- **Backend**: Node.js + TypeScript + Express + Prisma + PostgreSQL + MinIO
- **Frontend**: React 18 + TypeScript + Vite + MUI v5
- **Infrastructure**: Docker + GitHub Actions CI/CD

DatasetForge is suitable for small teams, research groups, and mid-sized organizations working with AI/ML datasets.