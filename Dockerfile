# Use Node.js 20.5.0 as the base image
FROM node:20.5.0

# Set the working directory
WORKDIR /src

# Copy package.json and package-lock.json (or yarn.lock if using Yarn)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the current directory contents into the container
COPY . .

# Expose the port your app runs on
EXPOSE 3333

# Set the command to run your app
CMD ["npm", "start"]
