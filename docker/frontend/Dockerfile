FROM node:18.14-bullseye-slim

RUN npm install -g @angular/cli@13 @angular/core@13
RUN mkdir /frontend && chown node:node /frontend
RUN mkdir /frontend/node_modules && chown node:node /frontend/node_modules
WORKDIR  /frontend
USER node
COPY --chown=node:node package*.json ./
RUN npm install --include=dev
COPY --chown=node:node . .