const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config");
const garf = require('./garfield.js');

client.login(config.token).then(() => {

    client.channels.get('419250097373839360').send({files: [garf.latest()]});
    client.destroy();
});



