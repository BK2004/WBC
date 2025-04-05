FROM node:22-alpine

WORKDIR /frontend

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "dev" ];