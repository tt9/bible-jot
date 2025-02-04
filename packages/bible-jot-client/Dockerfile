# Build command runs relative to monorepo root
# so relative paths are relative to the root
# e.g. ./packages/bible-jot-client/....

# Use Node.js to build the static files
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY ./package.json ./package-lock.json ./

RUN npm install

# Copy the entire app source code
COPY . .

# Build the app
RUN npm run build

# Use Nginx to serve the built static files
FROM nginx:alpine

# Copy built files to Nginx's default web directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration (optional)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
