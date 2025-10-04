const mongoose = require('mongoose');

// Message schema definition
const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Message text is required'],
        trim: true,
        maxlength: [500, 'Message cannot exceed 500 characters']
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true,
        maxlength: [100, 'Author name cannot exceed 100 characters']
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

// Add index for better query performance
messageSchema.index({ timestamp: -1 });
messageSchema.index({ author: 1 });

// Virtual for formatted timestamp
messageSchema.virtual('formattedDate').get(function () {
    return this.timestamp.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
});

// Ensure virtual fields are serialized
messageSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

// Static method to get recent messages
messageSchema.statics.getRecent = function (limit = 10) {
    return this.find({ isActive: true })
        .sort({ timestamp: -1 })
        .limit(limit)
        .exec();
};

// Instance method to format message
messageSchema.methods.toSummary = function () {
    return {
        id: this._id,
        preview: this.text.substring(0, 50) + (this.text.length > 50 ? '...' : ''),
        author: this.author,
        date: this.formattedDate
    };
};

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;