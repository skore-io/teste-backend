# Start from node base image
FROM node:12-alpine as builder

# Set the current working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files and download deps
COPY package.json package-lock.json ./
RUN npm install

# Copy sources to the working directory
COPY . .

# Set the Node environment
ARG node_env=production
ENV NODE_ENV $node_env

# Build the app
RUN npm run build

# Start a new stage from node
FROM node:12-alpine

# Set the current working directory inside the container
WORKDIR /dist

# Set the Node environment (nginx stage)
ARG node_env=production
ENV NODE_ENV $node_env

# Copy build artifacts from the previous stage
COPY --from=builder /usr/src/app/dist .
COPY package.json package-lock.json ./
RUN npm install --only=production

#  Adds curl command for health checks.
RUN apk --no-cache add curl

# Run nginx
CMD ["node", "main"]
