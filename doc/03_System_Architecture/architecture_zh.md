# DatasetForge - 系統架構設計（System Architecture）

**文件版本：** 1.0  
**最後更新：** 2026-05-15  
**語言：** 中文

---

## 1. 架構目標

DatasetForge 的系統架構設計目標如下：

- **可擴展性**：支援從小型團隊到大型企業的使用規模
- **可維護性**：採用清晰的分層與模組化設計
- **安全性**：保護用戶數據與系統資源
- **性能**：支援大型數據集的高效存取
- **開發效率**：使用成熟技術棟，降低開發與維護成本

---

## 2. 整體架構概覽

DatasetForge 採用 **分層架構 + 模組化設計**，主要分為以下層級：

```
[ Frontend ]          ← React + MUI + Vite
       ↓
[ API Gateway / Backend ] ← Node.js + Express + TypeScript
       ↓
[ Application Services ]  ← Business Logic (Modules)
       ↓
[ Data Access Layer ]     ← Prisma ORM
       ↓
[ Database + Storage ]
   ├── MySQL (Metadata)
   └── MinIO / S3 (Object Storage)
```

---

## 3. 主要技術棟

| 層級          | 技術                          | 說明 |
|---------------|-------------------------------|------|
| **Frontend**  | Vite + React 18 + TypeScript + MUI | 現代化前端框架 |
| **Backend**   | Node.js + Express + TypeScript | RESTful API |
| **ORM**       | Prisma                        | Type-safe 資料庫操作 |
| **Database**  | MySQL                         | 儲存 Metadata 與用戶資訊 |
| **Object Storage** | MinIO (或 AWS S3)        | 儲存大型數據檔案 |
| **Auth**      | JWT + bcrypt                  | 身份驗證 |
| **Validation**| Zod                           | DTO 驗證 |
| **Logging**   | Pino                          | 結構化日誌 |

---

## 4. 系統主要組件

### 4.1 Frontend（前端）

- **技術**：Vite + React + TypeScript + MUI
- **職責**：
  - 用戶介面與互動
  - 狀態管理（React Query / Zustand）
  - 與後端 API 溝通
  - 文件上傳（直接連 MinIO）

### 4.2 Backend（後端）

- **技術**：Node.js + Express + TypeScript
- **職責**：
  - 提供 RESTful API
  - 業務邏輯處理
  - 身份驗證與授權
  - 與資料庫及儲存服務互動

** 模組結構建議**：
```
src/
├── modules/
│   ├── auth/
│   ├── dataset/
│   ├── version/
│   └── upload/
├── middlewares/
├── utils/
└── config/
```

### 4.3 Data Layer（數據層）

- **Metadata**：MySQL + Prisma
  - 用戶、Dataset、Version、權限等結構化數據
- **Binary Data**：MinIO / S3
  - 實際的數據檔案（JSONL、圖片、Parquet 等）

### 4.4 安全與基礎設施

- **身份驗證**：JWT
- **檔案上傳**：Presigned URL（前端直接上傳 MinIO）
- **日誌與監控**：Pino + 未來可加入 Prometheus / Grafana
- **部署**：Docker + PM2（後端） / Nginx（前端）

---

## 5. 關鍵設計決策

| 決策 | 原因 |
|------|------|
| 使用 Node.js + TypeScript | 開發效率高，與前端技術棟一致 |
| Prisma 作為 ORM | Type-safe，開發體驗佳 |
| MinIO 作為物件儲存 | 自建成本低，與 S3 相容 |
| Presigned URL 上傳 | 減輕後端負擔，提升上傳性能 |
| 分層 + Feature-based 模組 | 提高可維護性與可測試性 |
| JWT 認證 | 無狀態、適合 REST API |

---

## 6. 數據流示例（Dataset 上傳流程）

1. 用戶在前端建立 Dataset
2. 後端建立 Dataset 記錄並回傳版本資訊
3. 前端請求 Presigned URL
4. 前端直接上傳檔案到 MinIO
5. 上傳完成後，前端通知後端更新版本 Metadata
6. 後端更新統計數據並記錄版本

---

## 7. 後續優化方向

- 加入 Redis 作為快取層
- 引入消息队列（BullMQ）處理非同步任務
- 加入 API Gateway（如 Kong 或 Nginx）
- 容器化部署（Docker Compose → Kubernetes）
- 監控與可觀測性（Logging + Metrics + Tracing）

---

## 8. 後續文件

- `04_Data_Model/data_model_zh.md`：資料模型設計
- `05_API_Design/api_design_zh.md`：API 設計規範

---

**文件結束**