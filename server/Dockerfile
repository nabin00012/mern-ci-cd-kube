# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
# This is done before copying the entire codebase for better Docker layer caching
COPY package*.json ./

# Install dependencies
# Using npm ci for faster, reliable, reproducible builds
RUN npm ci --only=production && npm cache clean --force

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001

# Copy the rest of the application code
COPY --chown=nodeuser:nodejs . .

# Expose the port the app runs on
EXPOSE 5000

# Switch to non-root user
USER nodeuser

# Add health check to ensure container is running properly
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js || exit 1

# Define the command to run the application
CMD ["npm", "start"]