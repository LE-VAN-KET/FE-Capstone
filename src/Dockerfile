# node mirror image
FROM node:10.16.3-slim as build-stage
# Maintainer information
LABEL maintainer="anhle1512001@gmail.com"

# Specify the next working path as /app
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
#COPY package*.json ./

# Copy the front-end project to the app directory
COPY . .

# install project dependencies
RUN npm install

# Packing purpose: to run under nginx
#RUN npm run build

# Front end project run command
CMD ["npm","run","serve"]
