FROM node:20-alpine AS build

WORKDIR /app

ARG API_KEY
ENV API_KEY=$API_KEY
ARG API_URL
ENV API_URL=$API_URL

COPY package*.json ./

RUN npm install

COPY . .

RUN npx ng build --configuration=production


FROM nginx:alpine

RUN apk update && apk upgrade --no-cache

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/cosmo-frontend-app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]