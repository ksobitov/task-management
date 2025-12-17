# Task Management

A full-stack task management application built with Go (Gin) and React (Vite).

## Tech Stack

- **Backend**: Go with Gin framework
- **Frontend**: React with Vite
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Go 1.21+ (for local development)
- Node.js 20+ (for local development)

### Running with Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services will be available at:
- Frontend: http://localhost:5173
- API: http://localhost:8080
- PostgreSQL: localhost:5432

### Local Development

#### API

```bash
cd api
cp .env.example .env
go mod tidy
go run main.go
```

#### Client

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get task by ID |
| POST | /api/tasks | Create new task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

## Environment Variables

### API
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 8080)
- `GIN_MODE` - Gin mode (debug/release)

### Client
- `VITE_API_URL` - Backend API URL
