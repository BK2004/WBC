# STAGE 1: FRONTEND #
FROM node:22-alpine as wbc-frontend

WORKDIR /frontend

COPY ./src/frontend/package*.json .

RUN npm i

COPY ./src/frontend .

EXPOSE 5000

# STAGE 2: BACKEND #
FROM node:22-alpine AS wbc-backend

WORKDIR /backend

COPY ./src/backend/package*.json .

RUN npm i

COPY ./src/backend .

EXPOSE 3000

# STAGE 3: NGINX #
FROM nginx AS wbc-nginx
COPY ./src/nginx/default.conf /etc/nginx/conf.d/default.conf