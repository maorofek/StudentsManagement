FROM node:14-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5173

CMD ["npx", "serve", "-s", "build", "-l", "5173"]