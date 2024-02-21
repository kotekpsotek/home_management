# syntax=docker/dockerfile:1

FROM node:21-alpine3.18
WORKDIR /app
COPY . .
RUN npm i
CMD ["npm", "run", "run:dev"]
EXPOSE 8080