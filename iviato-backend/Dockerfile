# base image
FROM node:9.6.1

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app/iviato-api

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/iviato-api/node_modules/.bin:$PATH

# install and cache app dependencies
COPY iviato-api/package.json /usr/src/app/iviato-api/package.json

RUN npm install --silent

# start app
CMD ["npm", "start"]