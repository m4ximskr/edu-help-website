#STAGE 1
FROM node:21-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:lv
RUN npm run build:ru

#STAGE 2
FROM nginx:1.25.3-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html/dist
