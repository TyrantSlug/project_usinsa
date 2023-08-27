FROM node:18.16.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY  nginx/default.conf /etc/nginx/conf.d/default.conf 
COPY  --from=build /app/build /usr/share/nginx/html 

EXPOSE 80

cMD [ "nginx", "-g", "daemon off;" ]