# DatasetForge Production Deployment Guide

## Prerequisites

- Docker + Docker Compose v2+
- Domain name (optional but recommended)
- SSL certificate (Let's Encrypt recommended)

## Quick Start (Production)

```bash
# 1. Clone the repository

# 2. Copy environment file
cp .env.example .env

# 3. Edit .env with your production values
# IMPORTANT: Change all default passwords and secrets!

# 4. Start production stack
make docker-compose -f docker-compose.prod.yml up -d

# 5. Run database migrations
make docker exec -it datasetforge-backend-1 npx prisma migrate deploy

# 6. Access the application
# Frontend: http://your-domain.com
# Backend API: http://your-domain.com/api
# MinIO Console: http://your-domain.com:9001
```

## Environment Variables Checklist

### Backend
- [ ] `DATABASE_URL` - MySQL connection string
- [ ] `JWT_SECRET` - Strong random secret (min 32 chars)
- [ ] `MINIO_ENDPOINT` - MinIO server address
- [ ] `MINIO_ACCESS_KEY` - MinIO access key
- [ ] `MINIO_SECRET_KEY` - MinIO secret key

### Database
- [ ] `MYSQL_ROOT_PASSWORD` - Strong root password
- [ ] `MYSQL_USER` - Application user
- [ ] `MYSQL_PASSWORD` - Application user password

### Security
- [ ] Change all default passwords
- [ ] Enable HTTPS (reverse proxy + Let's Encrypt)
- [ ] Set up firewall rules
- [ ] Regular backups

## Recommended Architecture

- Use Nginx or Traefik as reverse proxy
- Enable SSL/TLS
- Set up automated backups for MySQL and MinIO
- Monitor with Prometheus + Grafana (optional)

---

**Powered by [YSK Limited](https://ysk.hk/) — Hong Kong Remote Dev Team & Enterprise Solutions**
