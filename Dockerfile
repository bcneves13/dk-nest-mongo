FROM node:16

# # Create app directory inside docker
WORKDIR /usr/src/app

# # Install app dependencies
COPY package*.json ./

RUN npm install
# # If you are building your code for production
# # RUN npm ci --only=production

# # Bundle app source
COPY ./api .

CMD [ "npm", "run", "start" ]