# syntax=docker/dockerfile:1

ARG NODE_VERSION=21.7.1

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/api
EXPOSE 3000


FROM base as dev
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
USER node
COPY . .
CMD [ "npm", "run", "dev" ]


FROM base as prod
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
USER node
COPY . .
CMD ["node", "./api/bin/www"]
