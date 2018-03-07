FROM node:8.9.4

ADD App /home/NodeProject/app



RUN npm install nodemon -g
RUN npm install

#CMD [ "nodemon", "app.js" ]
CMD npm start
