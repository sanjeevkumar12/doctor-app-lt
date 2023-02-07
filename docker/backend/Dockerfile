FROM node:18.14-bullseye-slim

RUN mkdir /backend && chown node:node /backend
#RUN mkdir /backend/node_modules && chown node:node /backend/node_modules
WORKDIR  /backend
USER node
COPY --chown=node:node package*.json ./
RUN npm install --dev
COPY --chown=node:node . .