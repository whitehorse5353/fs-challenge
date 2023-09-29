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

#FROM node:18
# Create app directory
#WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./
#COPY turbo.json ./
#COPY . .
#RUN npm install
#RUN npm run build
#RUN npm prune --production
#COPY /app/dist /app/dist
#COPY /app/node_modules /app/node_modules

#ENV NODE_ENV=production
#EXPOSE 3000
#ENTRYPOINT ["node", "./main.js"]
#WORKDIR /app/dist
#CMD [""]
#RUN echo "'DID IT Happen to build!!!!!!!!!!!!!!!!!!!!!!!!'"


# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source
#COPY . .
#CMD [ "npm", "run", "start" ]

#COMMON
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm i
#CMD [ "npm", "run", "dev" ]
RUN npm run build
RUN npm prune --production
#RUN echo "====================="
#RUN pwd
#RUN echo "====================="
#COPY /app/apps/api/dist /app/dist
CMD [ "npm", "start" ]
#RUN npm i
#
##DEVELOPMENT
#FROM builder as dev
#CMD [""]
#
##PROD MIDDLE STEP
#FROM builder as prod-build
#RUN npm run build
#RUN npm prune --production
#
##PROD
#FROM $IMAGE as prod
#COPY --chown=node:node --from=prod-build /app/dist /app/dist
#COPY --chown=node:node --from=prod-build /app/node_modules /app/node_modules
##COPY --chown=node:node --from=prod-build /app/.env /app/dist/.env
#
#ENV NODE_ENV=production
#ENTRYPOINT ["node", "./main.js"]
#WORKDIR /app/dist
#CMD [""]
#
#USER node

