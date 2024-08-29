# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the bot's dependencies
RUN npm install

# Copy the bot's source code and configuration files
COPY main.js .
COPY config.json .
COPY commands.js .
COPY garfieldModule.js .
COPY scenes.js .
COPY parties.json .
COPY scenes.json .

# Command to run the bot
CMD [ "node", "main.js" ]
