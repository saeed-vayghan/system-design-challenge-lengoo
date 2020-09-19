FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent
RUN npm install pm2 -g --silent

COPY . .

EXPOSE 8080 8090

CMD ["pm2-docker", "start", "process.json"]