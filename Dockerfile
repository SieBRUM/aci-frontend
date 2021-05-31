# stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --prod

# stage 2
FROM nginx:alpine
COPY ./nginx/default.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/ACIRental /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]