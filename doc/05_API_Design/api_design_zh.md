# DatasetForge - API 設計規範（API Design）

**文件版本：** 1.0  
**最後更新：** 2026-05-15  
**語言：** 中文

---

## 1. 設計原則

- 採用 **RESTful** 風格
- 使用 **JWT** 進行身份驗證
- API 路徑使用版本控制（`/api/v1/...`）
- 使用 **Zod** 進行請求驗證
- 統一的錯誤回應格式
- 支援分頁與過濾（未來）

---

## 2. 基礎設定

- **Base URL**: `http://localhost:3000/api/v1`
- **認證方式**: `Authorization: Bearer <JWT_TOKEN>`
- **Content-Type**: `application/json`
- **日期格式**: ISO 8601

---

## 3. 統一回應格式

### 成功回應

```json
{
  "success": true,
  "data": { ... },
  "message": "操作成功"
}
```

### 錯誤回應

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "請求參數錯誤",
    "details": [...]
  }
}
```

---

## 4. 主要 API Endpoints

### 4.1 Auth（認證）

| 方法 | Endpoint                  | 說明             | 認證 |
|------|---------------------------|------------------|------|
| POST | `/auth/register`          | 用戶註冊         | 否   |
| POST | `/auth/login`             | 用戶登入         | 否   |
| POST | `/auth/refresh`           | 刷新 Token       | 是   |
| GET  | `/auth/me`                | 取得當前用戶資訊 | 是   |

---

### 4.2 Dataset（數據集）

| 方法   | Endpoint                     | 說明               | 認證 |
|--------|------------------------------|--------------------|------|
| GET    | `/datasets`                  | 取得 Dataset 列表  | 是   |
| POST   | `/datasets`                  | 建立新 Dataset     | 是   |
| GET    | `/datasets/:id`              | 取得單一 Dataset   | 是   |
| PATCH  | `/datasets/:id`              | 更新 Dataset       | 是   |
| DELETE | `/datasets/:id`              | 刪除 Dataset       | 是   |

---

### 4.3 Version（版本）

| 方法   | Endpoint                              | 說明                 | 認證 |
|--------|---------------------------------------|----------------------|------|
| GET    | `/datasets/:datasetId/versions`       | 取得版本列表         | 是   |
| POST   | `/datasets/:datasetId/versions`       | 建立新版本           | 是   |
| GET    | `/datasets/:datasetId/versions/:id`   | 取得單一版本詳情     | 是   |
| PATCH  | `/datasets/:datasetId/versions/:id`   | 更新版本資訊         | 是   |

---

### 4.4 Upload（上傳）

| 方法 | Endpoint                        | 說明                     | 認證 |
|------|---------------------------------|------------------------------------------------|------|
| POST | `/upload/presigned-url`         | 取得上傳用的 Presigned URL | 是   |
| POST | `/upload/complete`              | 上傳完成後通知後端       | 是   |

---

## 5. 範例請求與回應

### 5.1 建立 Dataset

**Request:**
```json
POST /api/v1/datasets
{
  "name": "Chinese LLM Fine-tuning Data",
  "description": "用於中文大模型微調的指令數據",
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

### 5.2 取得 Presigned URL

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

## 6. 錯誤碼範例

| Code                    | 說明               |
|-------------------------|--------------------|
| `UNAUTHORIZED`          | 未認證             |
| `FORBIDDEN`             | 權限不足           |
| `VALIDATION_ERROR`      | 參數驗證失敗       |
| `NOT_FOUND`             | 資源不存在         |
| `CONFLICT`              | 資源衝突           |

---

## 7. 後續規劃

- 加入分頁參數（`page`, `limit`）
- 支援篩選與排序
- 加入 Rate Limiting
- OpenAPI / Swagger 文件自動生成

---

## 8. 後續文件

目前設計文件已完成主要部分。後續可視需要補充測試策略、部署文件等。

---

**文件結束**

---

<sub>Powered by [YSK Limited](https://ysk.hk/) — Hong Kong Remote Dev Team & Enterprise Solutions</sub>