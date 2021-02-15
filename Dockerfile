FROM node:15-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 4000

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD [ "npm", "start" ]