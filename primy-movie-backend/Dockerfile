FROM public.ecr.aws/lambda/nodejs:12 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install typescript --save-dev


# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript
RUN npx run build

# Stage 2: Create the final image
FROM public.ecr.aws/lambda/nodejs:12

# Set the working directory
WORKDIR /app

# Copy the compiled JavaScript code from the build stage
COPY --from=build /app/build /app/build

# Copy package.json and package-lock.json
COPY --from=build /app/package*.json ./


# Install only production dependencies
RUN npx install --only=production

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
# CMD ["node", "run","deploy"]
