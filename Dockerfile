FROM node:slim

WORKDIR /doctor-service

COPY . .

RUN npm install

ENTRYPOINT "npm run dev"

EXPOSE 4002
