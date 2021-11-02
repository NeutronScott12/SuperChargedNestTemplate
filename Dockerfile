FROM mhart/alpine-node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./dist .
COPY .env.production .
COPY ./environment/.env .
COPY ./prisma .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN yarn install --only=production
RUN yarn prisma generate
RUN yarn prisma migrate dev

CMD node main.js
