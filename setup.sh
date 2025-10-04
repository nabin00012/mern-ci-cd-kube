# Development Environment Setup Script

#!/bin/bash

echo "🚀 Setting up MERN Stack Development Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_warning "Node.js is not installed. You can still use Docker, but local development requires Node.js."
else
    NODE_VERSION=$(node --version)
    print_status "Node.js version: $NODE_VERSION"
fi

# Create environment files from examples
print_status "Creating environment files..."

if [ ! -f "server/.env" ]; then
    cp server/.env.example server/.env
    print_status "Created server/.env from example"
else
    print_warning "server/.env already exists"
fi

if [ ! -f "client/.env" ]; then
    cp client/.env.example client/.env
    print_status "Created client/.env from example"
else
    print_warning "client/.env already exists"
fi

# Create MongoDB initialization directory
mkdir -p mongo-init
if [ ! -f "mongo-init/init-mongo.js" ]; then
    cat > mongo-init/init-mongo.js << 'EOF'
// MongoDB initialization script
db = db.getSiblingDB('mernapp');

// Create a sample collection
db.messages.insertMany([
    {
        text: "Welcome to the MERN Stack application! 🎉",
        author: "System",
        timestamp: new Date(),
        isActive: true
    },
    {
        text: "This is a sample message to get you started. Feel free to add your own!",
        author: "Demo User",
        timestamp: new Date(),
        isActive: true
    }
]);

print("✅ Database initialized with sample data");
EOF
    print_status "Created MongoDB initialization script"
fi

# Create nginx configuration directory for production
mkdir -p nginx
if [ ! -f "nginx/nginx.conf" ]; then
    cat > nginx/nginx.conf << 'EOF'
upstream client {
    server client:3000;
}

upstream api {
    server server:5000;
}

server {
    listen 80;
    
    location / {
        proxy_pass http://client;
    }
    
    location /sockjs-node {
        proxy_pass http://client;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
    
    location /api {
        rewrite /api/(.*) /$1 break;
        proxy_pass http://api;
    }
}
EOF
    print_status "Created nginx configuration"
fi

print_status "Environment setup complete!"

echo ""
echo "📋 Next steps:"
echo "1. Update DockerHub credentials in GitHub secrets:"
echo "   - DOCKERHUB_USERNAME: your DockerHub username"
echo "   - DOCKERHUB_TOKEN: your DockerHub access token"
echo ""
echo "2. Start the development environment:"
echo "   docker-compose up --build"
echo ""
echo "3. Access the application:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:5000"
echo "   - MongoDB: mongodb://localhost:27017"
echo ""
echo "4. For Kubernetes deployment:"
echo "   - Update image names in k8s/ files with your DockerHub username"
echo "   - Apply configurations: kubectl apply -f k8s/"
echo ""

print_status "Happy coding! 🚀"