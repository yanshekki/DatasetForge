# DatasetForge 概覽

**專業 AI 訓練資料集管理平台**

DatasetForge 係一個現代化、全功能嘅 AI 訓練資料集管理平台，提供強大嘅版本控制、團隊協作、權限管理、活動追蹤同多格式匯出功能。

## 主要功能

- **版本控制**：完整版本歷史 + 元數據
- **安全上傳**：MinIO Presigned URL 安全上傳檔案
- **團隊協作**：基於角色嘅存取控制（READ/WRITE/ADMIN）
- **活動追蹤**：完整審計軌跡 + 熱力圖視覺化
- **公開分享**：有時效性嘅分享連結 + 權限控制
- **多格式匯出**：支援 ZIP、CSV、JSON

## 技術棧

- **後端**：Node.js + TypeScript + Express + Prisma + MySQL
- **前端**：React 18 + TypeScript + Vite + MUI
- **儲存**：MinIO（相容 S3）
- **認證**：JWT + Refresh Token

## 快速開始

請參考 [DEPLOYMENT.md](../../DEPLOYMENT.md) 了解生產環境部署方法。

---

**Powered by [YSK Limited](https://ysk.hk/) — 香港遠端開發團隊及企業解決方案**
