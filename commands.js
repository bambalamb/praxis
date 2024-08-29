const config = require('./config');
const scenes = require('./scenes');

function initializeCommands(message, args) {
    return {
        vore: () => message.channel.send("*vores* <@!266334592594608130>"),
        guillotine: () => message.channel.send({ files: ["https://cdn.britannica.com/27/194327-004-60511886.jpg"] }),
        pet: () => message.channel.send("*purr*"),
        scene: () => handleSceneCommand(message, args),
        scenelist: () => handleSceneListCommand(message),
        help: () => handleHelpCommand(message),
        // Commented out party game commands
        /*
        power: () => message.channel.send(`The ${partySystem.getPowerParty()} Party is in power.`),
        party: () => handlePartyCommand(message),
        parties: () => handlePartiesCommand(message),
        list: () => handleListCommand(message, args),
        join: () => handleJoinCommand(message, args),
        split: () => handleSplitCommand(message),
        revolution: () => handleRevolutionCommand(message),
        */
    };
}

async function handleSceneCommand(message, args) {
    if (args.length === 0) {
        message.channel.send("Please provide a scene to add.");
        return;
    }
    const newScene = args.join(" ");
    scenes.addScene(newScene);
    await scenes.saveScenes();
    message.channel.send(`Scene added: "${newScene}"`);
    await handleSceneListCommand(message);
}

async function handleSceneListCommand(message) {
    const sceneList = scenes.getScenes();
    if (sceneList.length === 0) {
        message.channel.send("No scenes have been added yet.");
    } else {
        const formattedScenes = sceneList.map(scene => `> ${scene}`).join("\n\n");
        message.channel.send(`Scenes from our inevitable future:\n\n\`\`\`${formattedScenes}\`\`\``);
    }
}

function handleHelpCommand(message) {
    const helpText = [
        "__General commands:__",
        `\`${config.prefix}help\`: Show this help message`,
        `\`${config.prefix}vore\`: Vore Aryn`,
        `\`${config.prefix}guillotine\`: Display a guillotine image`,
        `\`${config.prefix}pet\`: Pet the Praxis`,
        `\`${config.prefix}scene [text]\`: Add a scene to the future hellword list`,
        `\`${config.prefix}scenelist\`: Display the list of scenes of the future`,
        "",
        "__Garfield commands (only work in the Garfield channel):__",
        `\`${config.garfix}help\`: Show Garfield command help`,
        `\`${config.garfix}today\`: Show today's Garfield strip`,
        `\`${config.garfix}random\`: Show a random Garfield strip`,
        `\`${config.garfix}MM-DD-YYYY\`: Show a Garfield strip from a specific date`
    ];
    message.channel.send(helpText.join("\n"));
}

// Keep the other command handler functions commented out
/*
async function handlePartyCommand(message) { ... }
async function handlePartiesCommand(message) { ... }
async function handleListCommand(message, args) { ... }
async function handleJoinCommand(message, args) { ... }
async function handleSplitCommand(message) { ... }
async function handleRevolutionCommand(message) { ... }
*/

module.exports = { initializeCommands };
