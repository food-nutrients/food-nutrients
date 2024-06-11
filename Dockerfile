# Use the official Bun image as the base image
FROM oven/bun:latest

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

# Expose the port on which the app will run
EXPOSE 5173

# Define the command to run the application
CMD ["bun", "run", "preview"]
