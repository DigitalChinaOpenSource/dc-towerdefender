FROM harbor.dev.wh.digitalchina.com/library/node:12.19-buster

RUN mkdir -p /app
ADD . /app
WORKDIR /app

RUN npm install
RUN npm build

ENV HOST 0.0.0.0
ENV PORT 8082

EXPOSE 8082

CMD ["node","/app/server.js"]