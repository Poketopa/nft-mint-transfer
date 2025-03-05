FROM node:16

RUN npm install -g ganache-cli

WORKDIR /workspace/ganache-project