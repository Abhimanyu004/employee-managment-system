FROM node:18-alpine AS build 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM nginx:latest

COPY --from=build /app/public /usr/share/nginx/html