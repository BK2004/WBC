# STAGE 1: FRONTEND #
FROM node:22-alpine AS wbc-frontend-dev

WORKDIR /frontend

COPY ./src/frontend/package*.json .

RUN npm i

COPY ./src/frontend .

EXPOSE 5000

CMD [ "npm", "run", "dev" ];

# STAGE 2: BACKEND #
FROM node:22-alpine AS wbc-backend-dev

WORKDIR /backend

COPY ./src/backend/package*.json .

RUN npm i

COPY ./src/backend .

EXPOSE 3000

CMD [ "npm", "run", "dev" ];

# STAGE 3: NGINX #
FROM nginx AS wbc-nginx
COPY ./src/nginx/default.conf /etc/nginx/conf.d/default.conf

FROM node:22-alpine AS final
COPY --from=wbc-frontend / /
COPY --from=wbc-backend / /
COPY --from=wbc-nginx / /