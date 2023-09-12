# Use an official Node.js runtime as a parent image
FROM node:18.9.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY /package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Expose the port on which your Express app will run
EXPOSE 9000

# Define the command to start your Express application
CMD ["npm", "run", "start"]
