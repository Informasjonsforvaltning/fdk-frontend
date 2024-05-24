FROM node:20-alpine3.18
WORKDIR /app
COPY yarn.lock dist/apps/forms ./
ENV NODE_ENV=production
RUN corepack enable
RUN yarn set version stable
RUN yarn install
CMD yarn next start -p 8080
