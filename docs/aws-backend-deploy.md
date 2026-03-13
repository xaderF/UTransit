# Deploy Backend to AWS ECS

The backend runs on **ECS Fargate** behind an Application Load Balancer.

## Prerequisites

- AWS CLI configured (`aws configure`)
- Docker installed
- RDS PostgreSQL deployed (`./scripts/deploy-rds.sh`)

## 1. Deploy RDS (if not already done)

```bash
DB_PASSWORD='your-secure-password' ./scripts/deploy-rds.sh
```

Save the `DATABASE_URL` from the output.

## 2. Deploy Backend

```bash
DATABASE_URL='postgresql://utransit_admin:YOUR_PASSWORD@YOUR_RDS_ENDPOINT:5432/utransit?sslmode=require' \
  JWT_SECRET='your-jwt-secret' \
  ./scripts/deploy-backend-aws.sh
```

The script will:

1. Build the Docker image
2. Push to ECR
3. Deploy the ECS stack (cluster, task definition, service, ALB)

## 3. Get the API URL

After deployment, the script prints the API URL (e.g. `http://utransit-alb-xxx.us-east-1.elb.amazonaws.com`).

Set this in your frontend `.env`:

```
VITE_API_URL=http://your-alb-url
```

## 4. Seed the database (optional)

The backend creates tables on startup. To add sample data, run the seed script against the RDS instance from your machine (or a bastion):

```bash
cd backend
DATABASE_URL='postgresql://...' python3 -m app.seed
```

Or use `psql` to run SQL if you have direct DB access.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | No | Default: `change-me-in-production` |
| `CORS_ORIGINS` | No | Comma-separated origins |
| `RDS_STACK_NAME` | No | RDS stack name for DB security group (default: utransit-rds) |

## Troubleshooting

- **Tasks not starting**: Check ECS service events and CloudWatch logs
- **502 Bad Gateway**: Health check may be failing; ensure `/health` returns 200
- **Can't connect to DB**: Ensure RDS stack has `DBSecurityGroupId` output and backend stack receives it
