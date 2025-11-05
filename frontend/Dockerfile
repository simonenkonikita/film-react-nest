FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

CMD ["sh", "-c", "cp -r /app/dist/* /app/dist/ && tail -f /dev/null"]