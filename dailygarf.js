const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config");
const garf = require('./garfield.js');
const today = new Date();

client.login(config.token).then(() => {

    if(today.getDate() == 12 && today.getMonth() == 2) {
        client.channels.get('422134197868691458').send('https://assets.amuniversal.com/b5bdb4206e700139533d005056a9545d.jpg').destroy();
    }
    else{
        client.channels.get('419250097373839360').send({files: [garf.latest()]}).destroy();
    }
});



