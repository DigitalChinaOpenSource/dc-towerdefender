FROM node:10
WORKDIR app
COPY . ./app
RUN npm install node
RUN npm install express
EXPOSE 8082
RUN node ./app/server.js