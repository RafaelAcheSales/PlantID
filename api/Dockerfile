FROM node:latest

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
ENV PORT 3000

RUN npm cache clear --force && npm install

CMD [ "npm", "start" ]
