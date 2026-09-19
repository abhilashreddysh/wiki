# Stage 1: Build the site
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.29-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

USER 101:101

HEALTHCHECK --interval=5m \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
