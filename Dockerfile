FROM node:18.1.0-alpine3.14

ARG PORT=3000
ARG PORT_DEBUG=9229

ENV PORT=$PORT

EXPOSE $PORT $PORT_DEBUG

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .

# Run as non-root user
USER node

CMD [ "npm", "run", "start:watch" ]
