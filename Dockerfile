FROM node:lts

WORKDIR /api
COPY ./package*.json ./
RUN npm ci
COPY . .
RUN chown -R node:node /api
USER node

EXPOSE 49828
CMD npm start
