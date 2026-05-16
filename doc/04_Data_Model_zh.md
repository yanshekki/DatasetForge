# 資料模型設計

## 核心模型
- **User**: id, email, name, profilePicture, preferences
- **Dataset**: id, name, description, userId, downloadCount, tags[], versions[]
- **DatasetVersion**: id, datasetId, version, fileName, fileSize, description, downloadCount
- **Team**: id, name, ownerId, members[]
- **Permission**: datasetId, userId, level (READ/WRITE/ADMIN)
- **ActivityLog**: id, userId, type, targetId, createdAt
- **ShareLink**: id, datasetId, token, permission, expiresAt
- **Comment**: id, datasetId, userId, content, createdAt
- **Notification**: id, userId, type, message, read, createdAt

所有模型透過 Prisma 定義正確嘅索引同關聯。