FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install --legacy-peer-deps


COPY . .

RUN npm run build

FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]