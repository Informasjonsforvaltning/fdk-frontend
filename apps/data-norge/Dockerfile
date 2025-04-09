FROM node:22-alpine
ARG NODE_ENV
WORKDIR /app
COPY .yarnrc.yml yarn.lock dist/apps/data-norge ./
ENV NODE_ENV=$NODE_ENV
RUN corepack enable
RUN yarn set version stable
RUN yarn install
CMD [ "yarn", "next", "start", "-p", "8080" ]
