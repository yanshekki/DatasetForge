# 系統架構設計

## 後端架構
- 分層設計：DTO（Zod）→ Service → Controller → Route
- JWT 認證 + Refresh Token
- Prisma ORM + PostgreSQL
- MinIO 檔案儲存
- 全域錯誤處理 + 限流

## 前端架構
- React 18 + TypeScript + Vite
- MUI v5 + TanStack Query
- Protected Routes + AuthContext
- 深色模式 + localStorage 持久化

## 主要模組
- 認證模組
- Dataset + Version 模組
- 上傳模組（MinIO）
- 權限中介軟體
- 活動日誌 + 熱力圖
- 團隊與組織
- 通知系統
- 評論 + 提及系統
- 匯出模組（ZIP/CSV/JSON）