# => Build Container
FROM node:12.16.0-alpine3.11 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN rm -rf node_modules
RUN rm -f package-lock.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY src /app/src
COPY public /app/public
RUN npm run build

# => Run Container
FROM nginx:1.17.8-alpine

# Nginx Config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Static build
COPY --from=build /app/build /usr/share/nginx/html

# Default port exposure
EXPOSE 80

# Start Nginx server
ENTRYPOINT ["nginx", "-g", "daemon off;"]