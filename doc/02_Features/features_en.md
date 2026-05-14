# DatasetForge - Features Specification

**Document Version:** 1.0  
**Last Updated:** 2026-05-15  
**Language:** English

---

## 1. Purpose of This Document

This document provides a detailed specification of the core feature modules for the DatasetForge platform, including priority levels and descriptions. It serves as a reference for development and product planning.

---

## 2. Feature Module Overview

| Module                        | Priority | Status     | Description                        |
|-------------------------------|----------|------------|------------------------------------|
| User Authentication & RBAC    | P0       | To Do      | JWT login, role-based permissions  |
| Dataset Management            | P0       | To Do      | CRUD + Rich Metadata               |
| Versioning System             | P0       | To Do      | Multi-version management           |
| Data Upload & Storage         | P0       | To Do      | MinIO / S3 Integration             |
| Data Preview & Statistics     | P1       | To Do      | Basic stats and sample preview     |
| Collaboration & Sharing       | P1       | To Do      | Sharing and commenting             |
| Export & Integration          | P1       | To Do      | HF format export + API             |
| Advanced Search & Analytics   | P2       | Planned    | Embedding search, quality analysis |

---

## 3. Detailed Feature Descriptions

### 3.1 User Authentication & Access Control (P0)

**Description:**
Users can register and log in securely. Role-based access control is implemented to manage permissions at the dataset level.

**Key Features:**
- Register / Login / Logout
- JWT-based authentication
- Role-Based Access Control (Owner, Collaborator, Viewer)
- Public / Private dataset visibility

---

### 3.2 Dataset Management (P0)

**Description:**
Users can create and manage training datasets with rich metadata.

**Key Features:**
- Create new Dataset
- Edit dataset information (name, description, task type, tags)
- Set visibility (Public / Private)
- Dataset Card (Hugging Face style)
- Delete Dataset

---

### 3.3 Versioning System (P0)

**Description:**
Every dataset supports multiple versions to ensure reproducibility and traceability.

**Key Features:**
- Create new versions (manual or automatic)
- Version naming (semantic or date-based)
- Version history viewing
- Diff between versions (size, row count, metadata)
- Version switching and restore

---

### 3.4 Data Upload & Storage (P0)

**Description:**
Support secure and efficient uploading of large datasets using object storage.

**Key Features:**
- Direct upload via Presigned URLs to MinIO/S3
- Support common formats: JSONL, Parquet, CSV, image folders
- File size limits and format validation
- Upload progress tracking
- Binding of storage path with metadata

---

### 3.5 Data Preview & Statistics (P1)

**Description:**
Allow users to quickly understand the content and quality of their datasets.

**Key Features:**
- Automatic calculation of basic statistics
- Preview of first N records
- Thumbnail preview for image datasets
- Basic data quality indicators

---

### 3.6 Collaboration & Sharing (P1)

**Description:**
Enable teams to collaborate on datasets effectively.

**Key Features:**
- Share datasets with specific users
- Assign collaborator roles
- Comments and notes at version level
- Activity logs

---

### 3.7 Export & Integration (P1)

**Description:**
Facilitate exporting datasets for use in training workflows.

**Key Features:**
- Export to Hugging Face `datasets` format
- REST API for training scripts
- Version-specific export
- Future direct integration with training platforms

---

## 4. Post-MVP Features (Future Planning)

- Automated data quality detection
- Embedding-based semantic search
- Deep integration with Label Studio
- Data lineage tracking
- Multi-tenant enterprise features
- Data pipeline integration

---

## 5. Related Documents

- `03_System_Architecture/architecture_en.md`: System Architecture Design
- `04_Data_Model/data_model_en.md`: Data Model Design

---

**End of Document**

---

<sub>Powered by [YSK Limited](https://ysk.hk/) — Hong Kong Remote Dev Team & Enterprise Solutions</sub>