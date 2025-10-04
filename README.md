# MERN Stack CI/CD with Kubernetes

A complete MERN (MongoDB, Express.js, React.js, Node.js) application with CI/CD pipeline using GitHub Actions and Kubernetes deployment.

## 🏗️ Project Structure

```
mern-ci-cd-kube/
├── client/                 # React frontend application
├── server/                 # Express.js backend API  
├── k8s/                   # Kubernetes deployment files
├── .github/workflows/     # CI/CD pipeline configuration
├── docker-compose.yml     # Local development setup
└── README.md
```

## 🛠️ Tech Stack

- **Frontend**: React.js with Create React App
- **Backend**: Express.js with Node.js
- **Database**: MongoDB
- **Containerization**: Docker & Docker Compose  
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Registry**: DockerHub

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Docker & Docker Compose
- kubectl (for Kubernetes)
- Minikube (for local Kubernetes)

### 1. Local Development with Docker Compose

```bash
# Clone the repository
git clone <your-repo-url>
cd mern-ci-cd-kube

# Start all services (MongoDB, Backend, Frontend)
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# MongoDB: mongodb://localhost:27017
```

### 2. Running without Docker

```bash
# Install dependencies
cd server && npm install
cd ../client && npm install

# Start MongoDB (make sure it's running locally)
# Start backend
cd server && npm run dev

# Start frontend (in another terminal)
cd client && npm start
```

### 3. Kubernetes Deployment

```bash
# Start Minikube
minikube start

# Apply Kubernetes configurations
kubectl apply -f k8s/

# Get service URLs
minikube service client-service --url
minikube service server-service --url
```

## 🔧 Environment Variables

### Server (.env)
```
PORT=5000
MONGODB_URI=mongodb://mongo:27017/mernapp
NODE_ENV=development
```

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## 🧪 Testing

```bash
# Test backend
cd server && npm test

# Test frontend  
cd client && npm test
```

## 📦 CI/CD Pipeline

The project includes automated CI/CD with GitHub Actions:

1. **Build & Test**: Runs tests for both client and server
2. **Docker Build**: Creates Docker images for production
3. **Push to Registry**: Pushes images to DockerHub
4. **Deploy to Kubernetes**: Updates Kubernetes deployments

### Required GitHub Secrets

Add these secrets to your GitHub repository:

- `DOCKERHUB_USERNAME`: Your DockerHub username
- `DOCKERHUB_TOKEN`: Your DockerHub access token

## 🔗 API Endpoints

- `GET /api/messages` - Get all messages
- `POST /api/messages` - Create a new message
- `GET /api/health` - Health check endpoint

## 📝 Features

- ✅ Full MERN stack setup
- ✅ Docker containerization
- ✅ Local development with hot reload
- ✅ Production-ready builds
- ✅ CI/CD pipeline with GitHub Actions
- ✅ Kubernetes deployment
- ✅ Environment-based configuration
- ✅ Basic testing setup
- ✅ Health check endpoints

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.