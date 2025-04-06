FROM node:22-alpine

WORKDIR /backend

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 3000