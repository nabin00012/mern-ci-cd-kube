#!/bin/bash

# 🎯 MERN Stack Demo Script
# This script helps you demonstrate your full-stack application

echo "🚀 MERN Stack Application Demo"
echo "================================"
echo ""

# Function to check if Docker is running
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        echo "❌ Docker is not running. Please start Docker Desktop first."
        exit 1
    fi
    echo "✅ Docker is running"
}

# Function to check port availability
check_ports() {
    echo "🔍 Checking port availability..."
    
    if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null; then
        echo "⚠️  Port 3000 is in use. Please stop the service or use a different port."
        echo "   You can find what's using it with: lsof -i :3000"
    else
        echo "✅ Port 3000 is available (React frontend)"
    fi
    
    if lsof -Pi :5001 -sTCP:LISTEN -t >/dev/null; then
        echo "⚠️  Port 5001 is in use. Please stop the service or use a different port."
        echo "   You can find what's using it with: lsof -i :5001"
    else
        echo "✅ Port 5001 is available (Express backend)"
    fi
    
    if lsof -Pi :27017 -sTCP:LISTEN -t >/dev/null; then
        echo "⚠️  Port 27017 is in use. This might be another MongoDB instance."
        echo "   You can find what's using it with: lsof -i :27017"
    else
        echo "✅ Port 27017 is available (MongoDB)"
    fi
    echo ""
}

# Function to start the application
start_app() {
    echo "🚀 Starting MERN Stack Application..."
    echo "   This will start:"
    echo "   • MongoDB (database)"
    echo "   • Express Server (backend API)"
    echo "   • React Client (frontend)"
    echo ""
    
    docker-compose up --build -d
    
    echo "⏳ Waiting for services to start..."
    sleep 10
    
    # Check if services are healthy
    echo "🏥 Health Check Results:"
    
    # Check MongoDB
    if docker-compose ps | grep -q "mongo.*Up"; then
        echo "✅ MongoDB is running"
    else
        echo "❌ MongoDB failed to start"
    fi
    
    # Check Express Server
    if curl -f http://localhost:5001/api/health >/dev/null 2>&1; then
        echo "✅ Express Server is running (http://localhost:5001)"
    else
        echo "❌ Express Server is not responding"
    fi
    
    # Check React Client
    if curl -f http://localhost:3000 >/dev/null 2>&1; then
        echo "✅ React Client is running (http://localhost:3000)"
    else
        echo "⏳ React Client is still starting up..."
    fi
}

# Function to show demo URLs
show_urls() {
    echo ""
    echo "🌐 Application URLs:"
    echo "================================"
    echo "Frontend (React):     http://localhost:3000"
    echo "Backend API:          http://localhost:5001"
    echo "Health Check:         http://localhost:5001/api/health"
    echo "API Messages:         http://localhost:5001/api/messages"
    echo ""
    echo "📱 Open http://localhost:3000 in your browser to see the app!"
}

# Function to show API demo commands
show_api_demo() {
    echo ""
    echo "🔧 API Demo Commands:"
    echo "================================"
    echo ""
    echo "# Test Health Check:"
    echo "curl http://localhost:5001/api/health"
    echo ""
    echo "# Get All Messages:"
    echo "curl http://localhost:5001/api/messages"
    echo ""
    echo "# Post a New Message:"
    echo 'curl -X POST http://localhost:5001/api/messages \'
    echo '  -H "Content-Type: application/json" \'
    echo '  -d '"'"'{"text":"Hello from API demo!","author":"Demo User"}'"'"
    echo ""
}

# Function to show logs
show_logs() {
    echo "📊 Live Application Logs:"
    echo "================================"
    echo "Press Ctrl+C to stop viewing logs"
    echo ""
    docker-compose logs -f
}

# Function to stop the application
stop_app() {
    echo "🛑 Stopping MERN Stack Application..."
    docker-compose down
    echo "✅ Application stopped successfully"
}

# Function to show menu
show_menu() {
    echo ""
    echo "🎯 What would you like to do?"
    echo "================================"
    echo "1) Start the application"
    echo "2) Show application URLs"
    echo "3) Show API demo commands"
    echo "4) View live logs"
    echo "5) Stop the application"
    echo "6) Exit"
    echo ""
}

# Main execution
main() {
    echo "🔍 Pre-flight checks..."
    check_docker
    check_ports
    
    while true; do
        show_menu
        read -p "Choose an option (1-6): " choice
        
        case $choice in
            1)
                start_app
                show_urls
                ;;
            2)
                show_urls
                ;;
            3)
                show_api_demo
                ;;
            4)
                show_logs
                ;;
            5)
                stop_app
                ;;
            6)
                echo "👋 Demo script ended. Thanks for using MERN Stack!"
                break
                ;;
            *)
                echo "❌ Invalid option. Please choose 1-6."
                ;;
        esac
        
        if [ "$choice" != "4" ]; then
            echo ""
            read -p "Press Enter to continue..."
        fi
    done
}

# Run the main function
main