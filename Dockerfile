FROM node:18 as build
WORKDIR /app
COPY package*.json ./
COPY turbo.json ./
RUN npm install

COPY ./apps/api ./apps/api

COPY ./apps/client ./apps/client
WORKDIR ./apps
RUN npm install
RUN npm run build
WORKDIR /app
EXPOSE 3000
RUN npm start

#WORKDIR ./client
#RUN npm install
#COPY . .
#RUN RUST_BACKTRACE=1
#RUN npm run dev