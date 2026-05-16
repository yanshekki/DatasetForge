# DatasetForge

**專業 AI 訓練資料集管理平台**

DatasetForge 係一個現代化、全功能嘅 AI 訓練資料集管理平台，提供強大嘅版本控制、團隊協作、權限管理、活動追蹤同多格式匯出功能。

---

## 🚀 主要功能

### 核心資料集管理
- **版本控制**：完整版本系統 + 詳細元數據
- **上傳系統**：透過 MinIO Presigned URL 安全上傳檔案
- **標籤與搜尋**：強大標籤系統 + 全文搜尋
- **下載統計**：同時追蹤 Dataset 同每個 Version 嘅下載次數

### 協作與分享
- **團隊管理**：建立團隊、邀請成員、管理角色
- **權限系統**：細粒度權限（READ / WRITE / ADMIN）
- **公開分享連結**：生成有時效性、可控制權限嘅分享連結
- **評論與提及**：Dataset 級別評論 + @提及自動通知

### 分析與洞察
- **活動日誌**：完整審計軌跡
- **活動熱力圖**：30 日活動視覺化
- **版本比較**：任意兩個版本之間嘅差異對比

### 匯出與整合
- **多格式匯出**：支援 ZIP、CSV、JSON
- **API-First 設計**：完整 OpenAPI / Swagger 文件
- **Webhook 就緒**（可擴展）

---

## 🏗️ 技術棧

### 後端
- **執行環境**：Node.js + TypeScript
- **框架**：Express.js
- **資料庫**：MySQL + Prisma ORM
- **認證**：JWT（Access + Refresh Token）+ bcrypt
- **檔案儲存**：MinIO（相容 S3）
- **郵件**：Nodemailer
- **文件**：Swagger / OpenAPI

### 前端
- **框架**：React 18 + TypeScript + Vite
- **UI 庫**：Material-UI (MUI) v5
- **狀態管理**：TanStack Query（React Query）
- **路由**：React Router v6
- **主題**：深色 / 淺色模式 + 持久化儲存

### DevOps
- **容器化**：Docker + docker-compose
- **CI/CD**：GitHub Actions
- **測試**：Jest + Supertest

---

## 📁 專案結構

```
DatasetForge/
├── backend/                 # Node.js + Prisma 後端
│   ├── src/
│   │   ├── modules/        # 功能模組（auth、dataset、team 等）
│   │   ├── middlewares/    # 認證、權限、錯誤、限流
│   │   └── app.ts
│   └── prisma/schema.prisma
├── frontend/                # React + Vite 前端
│   └── src/
│       ├── pages/          # 所有主要頁面
│       ├── components/     # 可重用 UI 元件
│       └── contexts/       # AuthContext 等
├── docker-compose.yml
└── README.md
```

---

## 🚀 快速開始

### 前置條件
- Node.js 18+
- Docker + Docker Compose
- MySQL（或使用 docker-compose）

### 後端設定
```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

### 前端設定
```bash
cd frontend
npm install
npm run dev
```

### 使用 Docker 完整啟動
```bash
docker-compose up --build
```

---

## 📚 文件

- [概覽](doc/01_Overview_zh.md)
- [功能規格](doc/02_Features_zh.md)
- [系統架構](doc/03_System_Architecture_zh.md)
- [資料模型](doc/04_Data_Model_zh.md)
- [API 設計](doc/05_API_Design_zh.md)

**English Documentation**: Please refer to the `_en.md` files in the `doc/` directory, or use `README.md` directly.

---

## 🔐 安全性
- 基於 JWT 嘅認證（支援 Refresh Token）
- 基於角色嘅存取控制（RBAC）
- 所有 API 端點限流
- 透過 Presigned URL 安全上傳檔案
- 完整輸入驗證（Zod）

---

## 📈 目前狀態

**已準備好投入生產** — DatasetForge 功能完整，適合中小型團隊使用。

**已完成亮點**：
- 完整認證與授權系統
- Dataset 版本控制 + 上傳
- 團隊協作 + 權限管理
- 活動記錄 + 熱力圖
- 公開分享連結
- 評論 + 提及功能
- 版本比較（Diff）
- 多格式匯出（ZIP / CSV / JSON）
- 深色模式 + 響應式 UI
- Docker + CI/CD 流程

---

## 🤝 貢獻

歡迎貢獻！請開 Issue 或提交 Pull Request。

---

## 📄 授權

MIT License — 可自由用於個人或商業項目。

---

**Powered by [YSK Limited](https://ysk.hk/) — 香港遠端開發團隊及企業解決方案**
