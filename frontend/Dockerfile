
FROM node:20-alpine AS builder
WORKDIR /var/www/film-react-nest
COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine as production
WORKDIR /var/www/film-react-nest

COPY --from=builder /var/www/film-react-nest/package*.json ./

RUN npm install --only=production

COPY --from=builder /var/www/film-react-nest/dist ./dist/

CMD ["node", "./dist/main.js"]
