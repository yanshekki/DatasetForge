# DatasetForge - Data Model Design

**Document Version:** 1.0  
**Last Updated:** 2026-05-15  
**Language:** English

---

## 1. Design Principles

- Use **Prisma ORM** for database operations
- Follow **normalized design** to reduce data redundancy
- Every entity has `createdAt` and `updatedAt` timestamps
- Use `BigInt` for large file sizes
- Flexible use of `Json` columns for unstructured metadata

---

## 2. Core Entities

### 2.1 User

| Field       | Type     | Description               | Constraints      |
|-------------|----------|---------------------------|------------------|
| id          | Int      | Primary Key               | Auto Increment   |
| email       | String   | Login email               | Unique           |
| password    | String   | Hashed password           | -                |
| name        | String?  | Display name              | Optional         |
| createdAt   | DateTime | Creation timestamp        | -                |
| updatedAt   | DateTime | Update timestamp          | -                |

**Relationships:**
- User → Dataset (One-to-Many)

---

### 2.2 Dataset

| Field       | Type      | Description                        | Constraints      |
|-------------|-----------|------------------------------------|------------------|
| id          | Int       | Primary Key                        | Auto Increment   |
| name        | String    | Dataset name                       | -                |
| description | String?   | Description                        | Text             |
| taskType    | String?   | Task type (e.g. llm-finetune)      | -                |
| tags        | Json?     | Tags (array)                       | JSON             |
| isPublic    | Boolean   | Visibility                         | Default: false   |
| ownerId     | Int       | Owner user ID                      | Foreign Key      |
| createdAt   | DateTime  | Creation timestamp                 | -                |
| updatedAt   | DateTime  | Update timestamp                   | -                |

**Relationships:**
- Dataset → User (Many-to-One)
- Dataset → DatasetVersion (One-to-Many)

---

### 2.3 DatasetVersion

| Field       | Type      | Description                        | Constraints      |
|-------------|-----------|------------------------------------|------------------|
| id          | Int       | Primary Key                        | Auto Increment   |
| datasetId   | Int       | Parent Dataset ID                  | Foreign Key      |
| version     | String    | Version identifier (e.g. v1.0)     | -                |
| description | String?   | Version description                | -                |
| filePath    | String?   | Main file path in MinIO            | -                |
| size        | BigInt?   | Total size in bytes                | -                |
| rowCount    | Int?      | Number of records                  | -                |
| metadata    | Json?     | Additional statistics              | JSON             |
| createdAt   | DateTime  | Creation timestamp                 | -                |

**Relationships:**
- DatasetVersion → Dataset (Many-to-One)

---

## 3. Entity Relationship (Text Description)

```
User
 ├── id (PK)
 ├── email (Unique)
 └── has many → Dataset

Dataset
 ├── id (PK)
 ├── name
 ├── ownerId (FK → User)
 └── has many → DatasetVersion

DatasetVersion
 ├── id (PK)
 ├── datasetId (FK → Dataset)
 ├── version
 ├── size (BigInt)
 └── metadata (Json)
```

---

## 4. Design Decisions

| Decision                        | Reason |
|--------------------------------|--------|
| Use `Json` columns for tags & metadata | Flexibility for future extension |
| Use `BigInt` for `size`        | Support for very large datasets (TB scale) |
| Separate Version from Dataset  | Enable multi-version management and history |
| No Team/Permission tables yet  | Start simple with single owner model; expand later |

---

## 5. Potential Future Entities

- `Team` / `Organization`
- `DatasetPermission`
- `DatasetFile` (for granular file management)
- `ActivityLog`

---

## 6. Prisma Schema Reference

Full schema is located at:
`backend/prisma/schema.prisma`

---

## 7. Related Documents

- `05_API_Design/api_design_en.md`: API Design Specification

---

**End of Document**

---

<sub>Powered by [YSK Limited](https://ysk.hk/) — Hong Kong Remote Dev Team & Enterprise Solutions</sub>