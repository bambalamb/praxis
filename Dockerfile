# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the bot's dependencies
RUN npm install

# Copy the bot's source code and configuration files
COPY bot.js .
COPY config.json .
COPY garfield.js .
COPY moment.js .
COPY parties.json .
COPY scenes.json .

# Command to run the bot
CMD [ "node", "bot.js" ]
