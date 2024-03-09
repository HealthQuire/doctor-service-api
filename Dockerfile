FROM node:slim

WORKDIR /doctor-service

COPY . .

RUN npm install

ENTRYPOINT ["npm run build", "npm run start"]

EXPOSE 4003
