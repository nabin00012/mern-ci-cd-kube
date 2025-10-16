require('dotenv').config();
const mongoose = require('mongoose');
const Message = require('./models/Message');

// MongoDB Atlas connection string from environment variable
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernapp';

async function clearAllMessages() {
    try {
        console.log('🔌 Connecting to MongoDB Atlas...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB Atlas');

        console.log('🗑️  Deleting all messages...');
        const result = await Message.deleteMany({});
        console.log(`✅ Deleted ${result.deletedCount} messages`);

        console.log('👋 Closing connection...');
        await mongoose.connection.close();
        console.log('✅ Done! All messages have been cleared.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

clearAllMessages();
