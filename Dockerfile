#informando a imagem a ser usada
FROM node:16

#Autor
LABEL maintainer="André Nogueira"

#Atualizando o container
RUN apt update; apt update

RUN mkdir /app


COPY . /app 

RUN npm config set fund false --global
RUN npm config set fund false

WORKDIR /app

RUN npm install


EXPOSE 8102
EXPOSE 8103

ENTRYPOINT [ "node","src/server.js" ]
