FROM node:16.13.1

WORKDIR /usr/src/app

COPY auth-server ./auth-server
WORKDIR /usr/src/app/auth-server
RUN npm i express cors jsonwebtoken lowdb
RUN npm rebuild bcrypt --build-from-source
RUN npm update

COPY frontend ../frontend
WORKDIR /usr/src/app/frontend
RUN npm install -D typescript
RUN npm i react-router-dom @mui/material @emotion/react @emotion/styled @mui/icons-material
RUN npm run build
RUN npm install -g serve

WORKDIR /usr/src/app
COPY startup.sh ./

EXPOSE 3000

CMD ./startup.sh