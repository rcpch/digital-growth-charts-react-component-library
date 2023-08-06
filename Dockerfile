FROM node:16.20.1-alpine3.17

WORKDIR /app

COPY . /app

RUN npm install

CMD ["npm", "run", "build"]