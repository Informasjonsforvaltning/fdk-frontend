FROM node:20-alpine3.18
WORKDIR /app
COPY yarn.lock dist/apps/forms ./
ENV NODE_ENV=$NODE_ENV
RUN yarn
CMD yarn next start -p 8080
