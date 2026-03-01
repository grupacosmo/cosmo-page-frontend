FROM node:20-alpine

WORKDIR /usr/src/app

ARG API_KEY
ENV API_KEY=$API_KEY

ARG API_URL
ENV API_URL=$API_URL

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0", "--configuration", "production"]
