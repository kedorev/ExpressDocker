FROM node:8.9.4

ADD App /home/NodeProject/app

WORKDIR /home/NodeProject/app

RUN npm install
RUN npm install nodemon --save


CMD npm start
