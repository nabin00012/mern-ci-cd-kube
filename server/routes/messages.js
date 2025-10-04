const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, author } = req.query;

        const query = { isActive: true };
        if (author) {
            query.author = new RegExp(author, 'i');
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const messages = await Message.find(query)
            .sort({ timestamp: -1 })
            .limit(parseInt(limit))
            .skip(skip);

        const total = await Message.countDocuments(query);

        res.json({
            success: true,
            data: messages,
            pagination: {
                current: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch messages',
            message: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message || !message.isActive) {
            return res.status(404).json({
                success: false,
                error: 'Message not found'
            });
        }

        res.json({
            success: true,
            data: message
        });
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch message',
            message: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { text, author } = req.body;

        if (!text || !author) {
            return res.status(400).json({
                success: false,
                error: 'Both text and author are required'
            });
        }

        const message = new Message({
            text: text.trim(),
            author: author.trim()
        });

        const savedMessage = await message.save();

        res.status(201).json({
            success: true,
            data: savedMessage,
            message: 'Message created successfully'
        });
    } catch (error) {
        console.error('Error creating message:', error);

        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: validationErrors
            });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to create message',
            message: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { text, author } = req.body;

        const message = await Message.findById(req.params.id);

        if (!message || !message.isActive) {
            return res.status(404).json({
                success: false,
                error: 'Message not found'
            });
        }

        if (text) message.text = text.trim();
        if (author) message.author = author.trim();

        const updatedMessage = await message.save();

        res.json({
            success: true,
            data: updatedMessage,
            message: 'Message updated successfully'
        });
    } catch (error) {
        console.error('Error updating message:', error);

        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: validationErrors
            });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to update message',
            message: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message || !message.isActive) {
            return res.status(404).json({
                success: false,
                error: 'Message not found'
            });
        }

        message.isActive = false;
        await message.save();

        res.json({
            success: true,
            message: 'Message deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete message',
            message: error.message
        });
    }
});

router.get('/recent/:count', async (req, res) => {
    try {
        const count = parseInt(req.params.count) || 5;
        const messages = await Message.getRecent(count);

        res.json({
            success: true,
            data: messages,
            count: messages.length
        });
    } catch (error) {
        console.error('Error fetching recent messages:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch recent messages',
            message: error.message
        });
    }
});

module.exports = router;