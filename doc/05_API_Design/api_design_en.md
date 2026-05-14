# DatasetForge - API Design Specification

**Document Version:** 1.0  
**Last Updated:** 2026-05-15  
**Language:** English

---

## 1. Design Principles

- Follow **RESTful** conventions
- Use **JWT** for authentication
- Versioned API paths (`/api/v1/...`)
- Request validation using **Zod**
- Consistent error response format
- Pagination and filtering support (planned)

---

## 2. Base Configuration

- **Base URL**: `http://localhost:3000/api/v1`
- **Authentication**: `Authorization: Bearer <JWT_TOKEN>`
- **Content-Type**: `application/json`
- **Date Format**: ISO 8601

---

## 3. Standard Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [...]
  }
}
```

---

## 4. Main API Endpoints

### 4.1 Auth

| Method | Endpoint                  | Description          | Auth |
|--------|---------------------------|----------------------|------|
| POST   | `/auth/register`          | User registration    | No   |
| POST   | `/auth/login`             | User login           | No   |
| POST   | `/auth/refresh`           | Refresh token        | Yes  |
| GET    | `/auth/me`                | Get current user     | Yes  |

---

### 4.2 Dataset

| Method | Endpoint                     | Description             | Auth |
|--------|------------------------------|-------------------------|------|
| GET    | `/datasets`                  | List datasets           | Yes  |
| POST   | `/datasets`                  | Create new dataset      | Yes  |
| GET    | `/datasets/:id`              | Get single dataset      | Yes  |
| PATCH  | `/datasets/:id`              | Update dataset          | Yes  |
| DELETE | `/datasets/:id`              | Delete dataset          | Yes  |

---

### 4.3 Version

| Method | Endpoint                              | Description             | Auth |
|--------|---------------------------------------|-------------------------|------|
| GET    | `/datasets/:datasetId/versions`       | List versions           | Yes  |
| POST   | `/datasets/:datasetId/versions`       | Create new version      | Yes  |
| GET    | `/datasets/:datasetId/versions/:id`   | Get version details     | Yes  |
| PATCH  | `/datasets/:datasetId/versions/:id`   | Update version          | Yes  |

---

### 4.4 Upload

| Method | Endpoint                        | Description                    | Auth |
|--------|---------------------------------|--------------------------------|------|
| POST   | `/upload/presigned-url`         | Get presigned upload URL       | Yes  |
| POST   | `/upload/complete`              | Notify backend after upload    | Yes  |

---

## 5. Example Requests & Responses

### 5.1 Create Dataset

**Request:**
```json
POST /api/v1/datasets
{
  "name": "Chinese LLM Fine-tuning Data",
  "description": "Instruction data for Chinese LLM fine-tuning",
  "taskType": "llm-finetune",
  "tags": ["chinese", "instruction"],
  "isPublic": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Chinese LLM Fine-tuning Data",
    ...
  }
}
```

---

### 5.2 Get Presigned URL

**Request:**
```json
POST /api/v1/upload/presigned-url
{
  "datasetId": 1,
  "version": "v1.0",
  "fileName": "train.jsonl",
  "contentType": "application/jsonl"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://minio.../presigned-url",
    "fields": { ... }
  }
}
```

---

## 6. Error Codes

| Code                    | Description             |
|-------------------------|-------------------------|
| `UNAUTHORIZED`          | Authentication required |
| `FORBIDDEN`             | Insufficient permission |
| `VALIDATION_ERROR`      | Request validation failed |
| `NOT_FOUND`             | Resource not found      |
| `CONFLICT`              | Resource conflict       |

---

## 7. Future Improvements

- Add pagination (`page`, `limit`)
- Support filtering and sorting
- Rate limiting
- Auto-generated OpenAPI / Swagger documentation

---

## 8. Related Documents

All major design documents are now complete. Additional documents (testing strategy, deployment, etc.) can be added as needed.

---

**End of Document**