FROM public.ecr.aws/lambda/nodejs:12

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install typescript --save-dev

RUN 

# Copy the rest of the application code
COPY . .

