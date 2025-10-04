# 🚀 MERN Stack CI/CD Deployment Guide

## Complete Step-by-Step Setup Instructions

### 📋 Prerequisites

Before you start, make sure you have installed:

- [Docker](https://docs.docker.com/get-docker/) 
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Git](https://git-scm.com/downloads)

For Kubernetes deployment:
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/) (for local testing)

---

## 🏃‍♂️ Quick Start (5 minutes)

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd mern-ci-cd-kube
chmod +x setup.sh
./setup.sh
```

### 2. Start Development Environment
```bash
# Start all services with Docker Compose
docker-compose up --build

# Wait for all services to be healthy (2-3 minutes)
# Check logs: docker-compose logs -f
```

### 3. Access Your Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health
- **MongoDB**: mongodb://localhost:27017

---

## 🔧 Local Development (Without Docker)

### 1. Setup MongoDB
```bash
# Install MongoDB locally or use MongoDB Atlas
# Start MongoDB service:
# macOS: brew services start mongodb-community
# Ubuntu: sudo systemctl start mongod
```

### 2. Setup Backend
```bash
cd server
npm install
cp .env.example .env
# Edit .env file with your MongoDB connection string
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
cp .env.example .env
# Edit .env to set REACT_APP_API_URL=http://localhost:5000
npm start
```

---

## 🐳 Docker Production Setup

### 1. Build Production Images
```bash
# Build server image
docker build -t your-username/mern-server:latest ./server

# Build client image  
docker build -t your-username/mern-client:latest ./client
```

### 2. Run with Production Configuration
```bash
# Use production profile
docker-compose --profile production up -d

# Access via nginx proxy
# Application: http://localhost:8080
```

---

## ☸️ Kubernetes Deployment

### Step 1: Prepare Your Environment

#### For Local Testing (Minikube)
```bash
# Start Minikube
minikube start --driver=docker

# Verify cluster is running
kubectl cluster-info
```

#### For Cloud Deployment
```bash
# Configure kubectl for your cloud provider
# GKE: gcloud container clusters get-credentials CLUSTER_NAME
# EKS: aws eks update-kubeconfig --name CLUSTER_NAME
# AKS: az aks get-credentials --resource-group RG_NAME --name CLUSTER_NAME
```

### Step 2: Update Configuration Files
```bash
# Replace placeholder with your DockerHub username
find k8s/ -name "*.yaml" -exec sed -i 's/your-dockerhub-username/YOUR_DOCKERHUB_USERNAME/g' {} \;
```

### Step 3: Deploy to Kubernetes
```bash
# Apply all configurations
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -w

# Wait for all pods to be running (may take 2-5 minutes)
```

### Step 4: Access Your Application
```bash
# For Minikube
minikube service client-service --url

# For cloud providers, get external IP
kubectl get service client-loadbalancer
```

---

## 🔄 CI/CD Pipeline Setup

### 1. GitHub Repository Setup
```bash
# Push your code to GitHub
git add .
git commit -m "Initial MERN stack setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. DockerHub Setup
1. Create account at [DockerHub](https://hub.docker.com/)
2. Create access token: Settings → Security → New Access Token
3. Create repositories:
   - `your-username/mern-server`
   - `your-username/mern-client`

### 3. GitHub Secrets Configuration
Go to GitHub Repository → Settings → Secrets and Variables → Actions

Add these secrets:
- `DOCKERHUB_USERNAME`: Your DockerHub username
- `DOCKERHUB_TOKEN`: Your DockerHub access token

### 4. Test CI/CD Pipeline
```bash
# Make a change and push to trigger pipeline
echo "# Update" >> README.md
git add README.md
git commit -m "Test CI/CD pipeline"
git push origin main

# Check Actions tab in GitHub to see pipeline running
```

---

## 🧪 Testing Your Setup

### Backend API Testing
```bash
# Health check
curl http://localhost:5000/api/health

# Get messages
curl http://localhost:5000/api/messages

# Create a message
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello from API!", "author": "Test User"}'
```

### Frontend Testing
1. Open http://localhost:3000
2. Fill out the message form
3. Click "Post Message"
4. Verify message appears in the list

### Kubernetes Testing
```bash
# Check all pods are running
kubectl get pods

# Test API through Kubernetes service
kubectl port-forward service/server-service 5000:5000
curl http://localhost:5000/api/health

# Test frontend through Kubernetes service
kubectl port-forward service/client-service 8080:80
open http://localhost:8080
```

---

## 🚨 Troubleshooting Common Issues

### Docker Issues

**Problem**: Container won't start
```bash
# Check logs
docker-compose logs server
docker-compose logs client
docker-compose logs mongo

# Restart services
docker-compose restart
```

**Problem**: Port already in use
```bash
# Find process using port
lsof -i :3000  # or :5000, :27017

# Kill process or change port in docker-compose.yml
```

### Kubernetes Issues

**Problem**: Pods in CrashLoopBackOff
```bash
# Check pod logs
kubectl logs <pod-name>

# Describe pod for events
kubectl describe pod <pod-name>

# Common fixes:
# 1. Check image names and tags
# 2. Verify environment variables
# 3. Check resource limits
```

**Problem**: Service not accessible
```bash
# Check service endpoints
kubectl get endpoints

# Port forward for debugging
kubectl port-forward service/client-service 8080:80
```

### CI/CD Issues

**Problem**: Docker push fails
- Verify DockerHub credentials in GitHub secrets
- Check repository names match your DockerHub username
- Ensure repositories exist in DockerHub

**Problem**: Tests fail
```bash
# Run tests locally first
cd server && npm test
cd client && npm test

# Check test database connectivity
# Verify environment variables
```

---

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit `.env` files
- Use different secrets for different environments
- Rotate secrets regularly

### 2. Docker Security
- Use non-root users in containers
- Scan images for vulnerabilities
- Keep base images updated

### 3. Kubernetes Security
- Use namespaces for isolation
- Implement RBAC policies
- Use network policies
- Regularly update cluster

---

## 📈 Performance Optimization

### 1. Docker Optimization
```dockerfile
# Use multi-stage builds
# Minimize layer count
# Use .dockerignore files
# Leverage build cache
```

### 2. Kubernetes Optimization
```yaml
# Set resource requests and limits
# Use horizontal pod autoscaling
# Implement readiness and liveness probes
# Use persistent volumes for data
```

### 3. Application Optimization
```bash
# Enable gzip compression
# Use CDN for static assets
# Implement caching strategies
# Monitor performance metrics
```

---

## 📚 Additional Resources

### Documentation
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### Learning Resources
- [MongoDB Tutorial](https://docs.mongodb.com/manual/tutorial/)
- [Express.js Guide](https://expressjs.com/en/guide/)
- [React Tutorial](https://reactjs.org/tutorial/tutorial.html)
- [Node.js Documentation](https://nodejs.org/en/docs/)

---

## 🆘 Getting Help

If you encounter issues:

1. **Check the logs** first using the commands above
2. **Search existing issues** in the repository
3. **Create a new issue** with:
   - Error messages
   - Steps to reproduce
   - Environment details
   - Relevant logs

---

## 🎉 Congratulations!

You now have a complete MERN stack application with:
- ✅ Containerized microservices
- ✅ Local development environment
- ✅ Production-ready Kubernetes deployment
- ✅ Automated CI/CD pipeline
- ✅ Security best practices
- ✅ Monitoring and health checks

**Happy coding!** 🚀