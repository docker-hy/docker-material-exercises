FROM node:alpine

WORKDIR /usr/app

COPY package* ./
RUN npm ci
COPY . .

CMD ["npm", "start"]
