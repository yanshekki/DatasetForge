# 概覽

**DatasetForge** 係一個專業級嘅 AI 訓練資料集管理平台，專為大規模管理 AI 訓練資料而設計。它結合咗強大嘅版本控制、企業級團隊協作、細粒度權限管理、全面嘅活動審計，同埋靈活嘅數據匯出功能，成為一個完整嘅解決方案。

## 項目願景

喺大語言模型同生成式 AI 嘅時代，高質素、有組織嘅訓練數據已經成為組織最重要嘅資產之一。DatasetForge 嘅誕生就係為咗解決團隊喺管理數百甚至數千個資料集時遇到嘅實際挑戰。

## 目前狀態（2026年5月）

DatasetForge 已經達到 **生產就緒** 狀態，具備完整功能集，支持端到端嘅資料集生命周期管理：

### 核心能力
- 完整認證與授權系統（JWT + Refresh Token）
- 進階 Dataset 版本控制 + 豐富元數據
- 透過 MinIO Presigned URL 安全上傳檔案
- 強大標籤系統 + 全文搜尋
- 細粒度權限控制（READ / WRITE / ADMIN）
- 公開分享連結（可設定過期時間同權限）

### 協作功能
- 團隊同組織管理
- Dataset 級別評論 + @提及通知
- 活動日誌 + 視覺化熱力圖
- 版本比較（Diff）

### 分析與匯出
- Dataset 同 Version 級別下載統計
- 多格式匯出（ZIP、CSV、JSON）
- 完整審計軌跡

### 用戶體驗
- 現代響應式 UI + 深色/淺色模式
- 透過 React Query 實現即時更新
- 專業錯誤處理同用戶反饋

## 技術基礎

平台採用現代、可維護嘅技術棧：
- **後端**：Node.js + TypeScript + Express + Prisma + PostgreSQL + MinIO
- **前端**：React 18 + TypeScript + Vite + MUI v5
- **基礎設施**：Docker + GitHub Actions CI/CD

DatasetForge 適合中小型團隊、研究小組，同埋中型組織使用 AI/ML 資料集。