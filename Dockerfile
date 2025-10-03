FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .


FROM node:18-alpine

LABEL fly_launch_runtime="nodejs"

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json /app/yarn.lock ./
COPY --from=builder /app/*.js ./
COPY --from=builder /app/db ./db

ENV NODE_ENV production

CMD [ "yarn", "run", "start" ]
