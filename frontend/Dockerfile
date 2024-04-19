FROM node:16.13.1

WORKDIR /usr/src/app

COPY . ./frontend
WORKDIR /usr/src/app/frontend

RUN npm install -D typescript
RUN npm i react-router-dom @mui/material @emotion/react @emotion/styled @mui/icons-material
RUN npm run build
RUN npm install -g serve

EXPOSE 3000

CMD serve -s build