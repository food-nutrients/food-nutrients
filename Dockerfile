# Use the official Bun image as the base image for building the app
FROM oven/bun:debian AS builder

RUN apt-get -y update && apt-get -y install curl wget

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json, package-lock.json, and bun.lockb files to the container
COPY package.json bun.lockb ./

# Install the dependencies using Bun
RUN bun install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN bun run build

# Use the official Nginx image as the base image for serving static files
FROM nginx:alpine

# Copy the built files from the builder stage to the Nginx HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a default Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port on which the app will run
EXPOSE 80

# Define the command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
