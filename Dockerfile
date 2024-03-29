FROM node:18 as build

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app

RUN npm run build -- --output-path=./dist/out

FROM nginx:alpine

COPY --from=build /app/dist/out/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
