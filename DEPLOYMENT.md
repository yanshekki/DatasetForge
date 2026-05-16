# Deployment Guide

## Pre-deployment Checklist

- [ ] All environment variables are set in `.env`
- [ ] Database is accessible and migrated
- [ ] MinIO is running and accessible
- [ ] JWT_SECRET is strong and unique
- [ ] Docker and Docker Compose are installed
- [ ] Ports 80, 3000, 9000, 9001 are available

## Quick Deployment (Recommended)

```bash
# 1. Clone and setup
cp .env.example .env
# Edit .env with your values

# 2. Build and start
 docker-compose up --build -d

# 3. Check logs
 docker-compose logs -f
```

## Production Recommendations

- Use a reverse proxy (Nginx/Traefik) in front of the services
- Enable HTTPS with Let's Encrypt
- Use managed database (e.g. Supabase, Neon, or AWS RDS)
- Set up monitoring (e.g. Prometheus + Grafana)
- Regular database backups
- Use secrets management (Docker Secrets or external vault)

## Health Checks

- Backend: `GET /health`
- Frontend: Should load successfully
- MinIO: Console available at port 9001

## Troubleshooting

- Check container logs: `docker-compose logs`
- Restart services: `docker-compose restart`
- Rebuild: `docker-compose up --build --force-recreate`

---

<sub>Powered by [YSK Limited](https://ysk.hk/) — Hong Kong Remote Dev Team & Enterprise Solutions</sub>
