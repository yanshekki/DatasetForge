# API 設計規範

## 主要端點
- **認證**: POST /auth/login, /auth/register, /auth/refresh
- **Dataset**: GET/POST/PUT/DELETE /datasets
- **版本**: GET/POST /datasets/:id/versions, GET /versions/compare
- **上傳**: POST /upload/presigned-url
- **團隊**: GET/POST /teams, POST /teams/:id/members
- **權限**: PUT /datasets/:id/permissions
- **活動**: GET /activity-logs, GET /activity-logs/heatmap
- **分享連結**: POST /datasets/:id/share-links, GET /shared/:token
- **評論**: POST/GET /datasets/:id/comments, DELETE /comments/:id
- **匯出**: GET /datasets/:id/export, /export/csv, /export/json

所有受保護路由需要有效 JWT。權限檢查透過中介軟體執行。