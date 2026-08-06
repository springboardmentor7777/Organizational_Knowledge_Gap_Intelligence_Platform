# Stage 1: Build React Application
FROM node:22-alpine AS build
WORKDIR /app

# Copy dependency configs
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build bundle
COPY . .
RUN npm run build

# Stage 2: Production Nginx Server
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx routing configs
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
