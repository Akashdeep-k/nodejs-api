# Use a base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy backend package files and install dependencies
COPY package*.json .
RUN npm install

# Copy the rest of the application
COPY . .

# Expose necessary ports
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]