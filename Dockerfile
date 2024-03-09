FROM node:18.16.0-alpine
WORKDIR /srv/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4003
CMD ["node", "dist/index.js"]
