# DatasetForge - System Features Specification

**Version:** 1.0  
**Date:** 2026-05-14  
**Language:** 中文 / English (Bilingual)

---

## 1. 項目概述 / Project Overview

** 中文：**  
DatasetForge 是一個專為 AI/ML 模型訓練而設計的專業 Dataset 管理平台。目標是幫助數據科學家、ML 工程師和團隊更有效率地管理、版本控制、策展和準備高質素的訓練數據。

**English:**  
DatasetForge is a professional dataset management platform designed specifically for AI/ML model training. It helps data scientists, ML engineers, and teams efficiently manage, version control, curate, and prepare high-quality training data.

---

## 2. 核心功能模組 / Core Feature Modules

### 2.1 用戶認證與權限管理 / User Authentication & Access Control

** 中文：**
- 使用 JWT 進行註冊與登入
- 支援角色權限（Owner / Collaborator / Viewer）
- 每個 Dataset 可設定公開或私人
- 未來支援 Team / Organization 管理

**English:**
- Register and login using JWT
- Role-based access control (Owner / Collaborator / Viewer)
- Public or private visibility setting per dataset
- Future support for Team / Organization management

---

### 2.2 Dataset 管理 / Dataset Management

** 中文：**
- 建立、編輯、刪除 Dataset
- 豐富的 Metadata 管理（名稱、描述、任務類型、標籤、授權條款等）
- Dataset Card（類似 Hugging Face 風格）
- 支援不同數據類型（Text / Image / Tabular / Multimodal）

**English:**
- Create, edit, and delete datasets
- Rich metadata management (name, description, task type, tags, license, etc.)
- Dataset Card (similar to Hugging Face style)
- Support for multiple data types (Text, Image, Tabular, Multimodal)

---

### 2.3 版本控制 / Versioning

** 中文：**
- 為每個 Dataset 建立多個版本（v1.0, v1.1, 2025-05-14 等）
- 記錄版本之間的差異（大小、行數、Metadata 變化）
- 版本歷史與還原功能
- 與 DVC 概念相容，未來可整合

**English:**
- Create multiple versions for each dataset (e.g., v1.0, v1.1, date-based)
- Track differences between versions (size, row count, metadata changes)
- Version history and restore functionality
- Compatible with DVC concepts; future integration possible

---

### 2.4 數據儲存與上傳 / Data Storage & Upload

** 中文：**
- 使用 MinIO / S3 儲存大型數據檔案（不走後端直接上傳）
- 支援 Presigned URL 安全上傳
- 支援常見格式：JSONL、Parquet、CSV、圖片資料夾、COCO/YOLO 標註等
- 檔案大小與格式驗證

**English:**
- Use MinIO / S3 for storing large data files (direct upload via presigned URL)
- Support for common formats: JSONL, Parquet, CSV, image folders, COCO/YOLO annotations
- File size and format validation

---

### 2.5 數據探索與統計 / Data Exploration & Statistics

** 中文：**
- 自動計算基本統計數據（行數、大小、分佈等）
- 預覽樣本數據（文字前幾行、圖片縮圖）
- 未來支援 Embedding 搜尋與異常偵測

**English:**
- Auto-calculate basic statistics (row count, size, distributions)
- Preview samples (first few rows of text, image thumbnails)
- Future support for embedding search and anomaly detection

---

### 2.6 協作與分享 / Collaboration & Sharing

** 中文：**
- 將 Dataset 分享給其他用戶或團隊
- 支援評論與筆記功能
- 版本層級的權限控制

**English:**
- Share datasets with other users or teams
- Support for comments and notes
- Fine-grained permission control at version level

---

### 2.7 匯出與整合 / Export & Integration

** 中文：**
- 匯出為 Hugging Face `datasets` 格式
- 提供 API 給訓練腳本直接使用
- 未來支援直接連接到訓練平台（PyTorch, TensorFlow, etc.）

**English:**
- Export to Hugging Face `datasets` format
- Provide API for training scripts to consume directly
- Future integration with training frameworks (PyTorch, TensorFlow, etc.)

---

## 3. 非功能性需求 / Non-Functional Requirements

| 項目                  | 中文說明                     | English Description                  |
|-----------------------|------------------------------|--------------------------------------|
| **安全性**            | JWT + HTTPS + MinIO 權限控制 | JWT + HTTPS + MinIO access control   |
| **可擴展性**          | 支援大型數據集（TB 級）      | Support large-scale datasets (TB)    |
| **性能**              | 快速列表與搜尋               | Fast listing and search              |
| **可維護性**          | 清晰的 Module 結構           | Clean modular architecture           |
| **易用性**            | 簡單直觀的 Web UI            | Simple and intuitive Web UI          |

---

## 4. 技術架構建議 / Recommended Tech Stack

**Backend:**
- Node.js + TypeScript + Express
- Prisma + MySQL
- Zod（DTO Validation）
- MinIO（Object Storage）

**Frontend:**
- Vite + React + TypeScript
- MUI (Material UI)
- React Router + TanStack Query

---

## 5. 未來發展路線圖 / Future Roadmap

- [ ] 完整 Auth 系統（註冊、登入、權限）
- [ ] Dataset CRUD + Versioning 完整功能
- [ ] MinIO 整合與大檔案上傳
- [ ] 前端 Dataset 列表與詳情頁
- [ ] 数据統計與預覽功能
- [ ] 與 Hugging Face Datasets 整合
- [ ] Team 協作功能
- [ ] Advanced Search + Embedding

---

## 6. 結論 / Conclusion

** 中文：**  
DatasetForge 的目標是成為一個專業、可靠、易用的 AI 訓練數據管理平台，解決目前團隊在數據版本控制、協作和準備過程中的痛點。

**English:**  
DatasetForge aims to become a professional, reliable, and user-friendly platform for managing AI training data, solving common pain points in data versioning, collaboration, and preparation workflows.

---

**End of Document**