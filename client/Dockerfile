# Build stage
FROM node:20-alpine AS builder

WORKDIR /client

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# Production stage (serve via Node)
FROM node:20-alpine

WORKDIR /client
RUN npm install -g serve

COPY --from=builder /client/dist ./dist

CMD ["serve", "-s", "dist", "-l", "3000"]