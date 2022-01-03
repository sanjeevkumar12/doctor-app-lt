FROM node:lts

RUN npm install -g @angular/cli
RUN npm install -g npm
RUN mkdir /frontend && chown node:node /frontend
RUN mkdir /frontend/node_modules && chown node:node /frontend/node_modules
WORKDIR  /frontend
USER node
COPY --chown=node:node ./frontend/package.json ./frontend/package-lock.json ./
RUN npm ci --quiet
COPY --chown=node:node . .