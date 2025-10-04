// MongoDB initialization script for Docker container
// This script runs when MongoDB container starts for the first time

// Switch to the application database
db = db.getSiblingDB('mernapp');

// Create a user for the application
db.createUser({
    user: 'app_user',
    pwd: 'app_password',
    roles: [
        {
            role: 'readWrite',
            db: 'mernapp'
        }
    ]
});

// Create messages collection with initial data
db.messages.insertMany([
    {
        text: "🎉 Welcome to your MERN Stack application! This message was automatically created during database initialization.",
        author: "System",
        timestamp: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        text: "This is a sample message to demonstrate the message board functionality. You can create, read, update, and delete messages through the API.",
        author: "Demo User",
        timestamp: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        text: "The frontend React application automatically fetches messages from the Express.js backend API, which connects to this MongoDB database. Try adding your own message!",
        author: "Developer",
        timestamp: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]);

// Create indexes for better performance
db.messages.createIndex({ "timestamp": -1 });
db.messages.createIndex({ "author": 1 });
db.messages.createIndex({ "isActive": 1 });

print("✅ Database 'mernapp' initialized successfully!");
print("📊 Created", db.messages.countDocuments(), "sample messages");
print("🔍 Created indexes on timestamp, author, and isActive fields");

// Print collection info
printjson(db.messages.getIndexes());