# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS development
COPY . .
EXPOSE 8081
CMD ["npx", "expo", "start", "--web", "--host", "lan", "--port", "8081"]

FROM base AS builder
ARG EXPO_PUBLIC_API_URL
ENV CI=1
ENV EXPO_PUBLIC_API_URL=$EXPO_PUBLIC_API_URL
COPY . .
RUN npx expo export --platform web --output-dir dist

FROM nginx:1.27-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
