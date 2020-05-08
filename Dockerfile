FROM node:alpine AS build
WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn install
ADD . /app/
RUN yarn run build

FROM node:alpine
ENV NODE_ENV dev
WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn install
COPY --from=build /app/dist/ /app/src
COPY ormconfig.js /app/
CMD node /app/src/server.js


