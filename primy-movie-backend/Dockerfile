# Use an official Node.js runtime as the base image
FROM node:alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build




FROM node:alpine as run

# Set the working directory
WORKDIR /app

# Copy the compiled JavaScript code from the build stage
COPY --from=build /app/build /app/build

# Copy package.json and package-lock.json
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port Next.js runs on
EXPOSE 7070

# Command to run the application
CMD ["npm", "run", "start"]
