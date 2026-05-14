# DatasetForge - 資料模型設計（Data Model）

**文件版本：** 1.0  
**最後更新：** 2026-05-15  
**語言：** 中文

---

## 1. 設計原則

- 使用 **Prisma ORM** 進行資料庫操作
- 採用 **正規化設計** 減少資料冗餘
- 每個實體都有 `createdAt` 與 `updatedAt` 時間戳
- 使用 `BigInt` 儲存大檔案大小
- 靈活使用 `Json` 欄位儲存非結構化 metadata

---

## 2. 核心實體（Entities）

### 2.1 User（用戶）

| 欄位        | 類型     | 說明                     | 約束          |
|-------------|----------|--------------------------|---------------|
| id          | Int      | 主鍵                     | Auto Increment |
| email       | String   | 登入用 Email             | Unique        |
| password    | String   | 加密後密碼               | -             |
| name        | String?  | 顯示名稱                 | 可選          |
| createdAt   | DateTime | 建立時間                 | -             |
| updatedAt   | DateTime | 更新時間                 | -             |

**關係：**
- User → Dataset（一對多）

---

### 2.2 Dataset（數據集）

| 欄位        | 類型      | 說明                          | 約束          |
|-------------|-----------|-------------------------------|---------------|
| id          | Int       | 主鍵                          | Auto Increment |
| name        | String    | 數據集名稱                    | -             |
| description | String?   | 描述                          | Text          |
| taskType    | String?   | 任務類型（如 llm-finetune）   | -             |
| tags        | Json?     | 標籤（陣列）                  | JSON          |
| isPublic    | Boolean   | 是否公開                      | Default false |
| ownerId     | Int       | 擁有者 ID                     | Foreign Key   |
| createdAt   | DateTime  | 建立時間                      | -             |
| updatedAt   | DateTime  | 更新時間                      | -             |

**關係：**
- Dataset → User（多對一）
- Dataset → DatasetVersion（一對多）

---

### 2.3 DatasetVersion（數據集版本）

| 欄位        | 類型      | 說明                          | 約束          |
|-------------|-----------|-------------------------------|---------------|
| id          | Int       | 主鍵                          | Auto Increment |
| datasetId   | Int       | 所屬 Dataset ID               | Foreign Key   |
| version     | String    | 版本號（如 v1.0）             | -             |
| description | String?   | 版本描述                      | -             |
| filePath    | String?   | 主要檔案路徑（MinIO key）     | -             |
| size        | BigInt?   | 總大小（bytes）               | -             |
| rowCount    | Int?      | 資料筆數                      | -             |
| metadata    | Json?     | 額外統計資訊                  | JSON          |
| createdAt   | DateTime  | 建立時間                      | -             |

**關係：**
- DatasetVersion → Dataset（多對一）

---

## 3. ER 關係圖（文字描述）

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

## 4. 設計決策說明

| 決策 | 原因 |
|------|------|
| 使用 `Json` 欄位儲存 tags 與 metadata | 提供靈活性，方便未來擴展 |
| `size` 使用 `BigInt` | 支援 TB 級別的大型數據集 |
| 版本與 Dataset 分開儲存 | 支援多版本管理與歷史追蹤 |
| 目前不加入 Team / Permission 表 | 第一階段先以單一 Owner 為主，後續再擴展 |

---

## 5. 後續可能擴展的實體

- `Team` / `Organization`
- `DatasetPermission`
- `DatasetFile`（如果需要更細粒度的檔案管理）
- `ActivityLog`（操作記錄）

---

## 6. Prisma Schema 對應

詳細 Schema 請參考專案根目錄：
`backend/prisma/schema.prisma`

---

## 7. 後續文件

- `05_API_Design/api_design_zh.md`：API 設計規範

---

**文件結束**