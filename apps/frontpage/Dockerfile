FROM node:20-alpine3.18
ARG NODE_ENV
WORKDIR /app
COPY yarn.lock dist/apps/frontpage ./
ENV NODE_ENV=$NODE_ENV
RUN corepack enable
RUN yarn set version stable
RUN yarn install
CMD [ "yarn", "next", "start", "-p", "8080" ]
