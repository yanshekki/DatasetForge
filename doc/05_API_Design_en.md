# API Design

## Main Endpoints
- **Auth**: POST /auth/login, /auth/register, /auth/refresh
- **Datasets**: GET/POST/PUT/DELETE /datasets
- **Versions**: GET/POST /datasets/:id/versions, GET /versions/compare
- **Upload**: POST /upload/presigned-url
- **Teams**: GET/POST /teams, POST /teams/:id/members
- **Permissions**: PUT /datasets/:id/permissions
- **Activity**: GET /activity-logs, GET /activity-logs/heatmap
- **Share Links**: POST /datasets/:id/share-links, GET /shared/:token
- **Comments**: POST/GET /datasets/:id/comments, DELETE /comments/:id
- **Export**: GET /datasets/:id/export, /export/csv, /export/json

All protected routes require valid JWT. Permission checks are applied via middleware.