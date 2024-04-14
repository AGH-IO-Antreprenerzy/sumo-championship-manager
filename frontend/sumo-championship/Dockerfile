FROM node:20.11.1 AS build

WORKDIR /frontend
COPY . .

RUN yarn install
CMD ["yarn", "start"]
