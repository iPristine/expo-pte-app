FROM ubuntu:22.04

WORKDIR /app

RUN apt install nodejs npm -y
RUN npm -g install yarn -y
COPY ./package*.json ./
COPY ./yarn.lock ./
RUN yarn install
RUN yarn add expo eas eas-cli

COPY . .

VOLUME [ "/app" ]

ENTRYPOINT [ "yarn expo prebuild && yarn eas build --platform android --local" ]