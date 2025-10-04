const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Message = require('../models/Message');

// Test database
const MONGODB_URI = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/mernapp_test';

describe('Message API Tests', () => {
    beforeAll(async () => {
        // Connect to test database
        await mongoose.connect(MONGODB_URI);
    });

    beforeEach(async () => {
        // Clean database before each test
        await Message.deleteMany({});
    });

    afterAll(async () => {
        // Close database connection
        await mongoose.connection.close();
    });

    describe('GET /api/health', () => {
        test('Should return health status', async () => {
            const response = await request(app)
                .get('/api/health')
                .expect(200);

            expect(response.body).toHaveProperty('status', 'OK');
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('timestamp');
        });
    });

    describe('POST /api/messages', () => {
        test('Should create a new message', async () => {
            const messageData = {
                text: 'This is a test message',
                author: 'Test User'
            };

            const response = await request(app)
                .post('/api/messages')
                .send(messageData)
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.data.text).toBe(messageData.text);
            expect(response.body.data.author).toBe(messageData.author);
        });

        test('Should not create message without required fields', async () => {
            const response = await request(app)
                .post('/api/messages')
                .send({})
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.error).toContain('required');
        });
    });

    describe('GET /api/messages', () => {
        test('Should get all messages', async () => {
            // Create test messages
            await Message.create([
                { text: 'Message 1', author: 'User 1' },
                { text: 'Message 2', author: 'User 2' }
            ]);

            const response = await request(app)
                .get('/api/messages')
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveLength(2);
            expect(response.body.pagination.total).toBe(2);
        });

        test('Should handle empty messages list', async () => {
            const response = await request(app)
                .get('/api/messages')
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveLength(0);
            expect(response.body.pagination.total).toBe(0);
        });
    });

    describe('GET /api/messages/:id', () => {
        test('Should get message by ID', async () => {
            const message = await Message.create({
                text: 'Test message',
                author: 'Test User'
            });

            const response = await request(app)
                .get(`/api/messages/${message._id}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.text).toBe('Test message');
        });

        test('Should return 404 for non-existent message', async () => {
            const nonExistentId = new mongoose.Types.ObjectId();

            const response = await request(app)
                .get(`/api/messages/${nonExistentId}`)
                .expect(404);

            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Message not found');
        });
    });

    describe('PUT /api/messages/:id', () => {
        test('Should update message', async () => {
            const message = await Message.create({
                text: 'Original message',
                author: 'Original Author'
            });

            const updateData = {
                text: 'Updated message',
                author: 'Updated Author'
            };

            const response = await request(app)
                .put(`/api/messages/${message._id}`)
                .send(updateData)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.text).toBe('Updated message');
            expect(response.body.data.author).toBe('Updated Author');
        });
    });

    describe('DELETE /api/messages/:id', () => {
        test('Should soft delete message', async () => {
            const message = await Message.create({
                text: 'Message to delete',
                author: 'Test User'
            });

            const response = await request(app)
                .delete(`/api/messages/${message._id}`)
                .expect(200);

            expect(response.body.success).toBe(true);

            // Verify message is soft deleted
            const deletedMessage = await Message.findById(message._id);
            expect(deletedMessage.isActive).toBe(false);
        });
    });
});