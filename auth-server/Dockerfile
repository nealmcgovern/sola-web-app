FROM node:16.13.1

WORKDIR /usr/src/app

COPY . ./auth-server
WORKDIR /usr/src/app/auth-server
RUN npm install
RUN npm uninstall bcrypt
RUN npm i bcrypt
RUN npm update
RUN chmod 777 startup.sh

EXPOSE 3080

CMD ./startup.sh