#FROM node:18 as build
#WORKDIR /app
#COPY package*.json ./
#COPY turbo.json ./
#RUN npm install
#
#COPY ./apps/api ./apps/api
#
#COPY ./apps/client ./apps/client
#WORKDIR ./apps
#RUN npm install
#RUN npm run build
#WORKDIR /app
#EXPOSE 3000
#RUN npm start

FROM node:18
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
RUN npm run build
# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]