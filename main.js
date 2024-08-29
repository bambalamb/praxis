const Discord = require('discord.js');
const config = require('./config');
const { initializeCommands } = require('./commands');
const GarfieldModule = require('./garfieldModule');
// Keep the import but don't call loadParties
// const { loadParties } = require('./partySystem');

const client = new Discord.Client();
const garfieldModule = new GarfieldModule(client);

client.on('ready', async () => {
    console.log(`[${new Date().toISOString()}] Bot is ready and logged in as ${client.user.tag}`);
    // Commented out party system initialization
    // await loadParties();

    // Set up a daily job to post Garfield
    setInterval(() => {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) { // Run at midnight
            garfieldModule.postDailyGarfield();
        }
    }, 60000); // Check every minute
});

client.on('message', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith(config.prefix)) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        
        console.log(`[${new Date().toISOString()}] User ${message.author.tag} used command: ${config.prefix}${command}`);
        
        const commands = initializeCommands(message, args);
        
        if (commands[command]) {
            await commands[command]();
        } else {
            console.log(`[${new Date().toISOString()}] Unknown command used by ${message.author.tag}: ${config.prefix}${command}`);
            message.channel.send(`Unknown command. Use \`${config.prefix}help\` to see available commands.`);
        }
    } else if (message.channel.id === '419250097373839360' && message.content.startsWith(config.garfix)) {
        await garfieldModule.handleGarfieldCommands(message);
    }
});

client.login(config.token);
