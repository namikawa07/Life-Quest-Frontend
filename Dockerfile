FROM node:17.6.0

WORKDIR /usr/src/app
COPY ./ ./

RUN npm install

CMD ["npm", "start"]
