const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config");
const fs = require("fs");
const garf = require('./garfield.js');
const moment = require('./moment');
const today = new Date();
const party = require('./parties');
const scenes = require('./scenes');

client.on("ready", () => {
    console.log("At your service!");
})
;


client.on("message", (message) => {

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
if (!message.content.startsWith(config.prefix) && !message.content.startsWith(config.garfix)) return;

    else if (command === "guillotine"){
    message.channel.send({files: https://cdn.britannica.com/27/194327-004-60511886.jpg})
    }
    
    else if (message.content.startsWith(config.prefix)) {

    if (message.content.includes("good bot") || message.content.includes("Good bot")) {
        message.channel.send("*uwu* thanks daddy");
    }

    else if (command === "vore") {
        message.channel.send("*vores* <@!266334592594608130>");
    }
    else if (command === "pet") {
        message.channel.send("*purr*");
    }

    else if (command === "scene") {

        if (args.length != 0) {
            string = [args.join(" ")];
            scenes.scenes.push(string);
            fs.writeFile("./scenes.json", JSON.stringify(scenes), (err) => console.error);
            message.channel.send("Scenes from our inevitable future: ```" + scenes.scenes.join("\n>") + "```")

        }
        else {
            message.channel.send("Scenes from our inevitable future: ```" + scenes.scenes.join("\n>") + "```")
        }
    }

//** Leftist Infighting **//

//Party in power
    else if (command === "power") {
        message.channel.send("The " + party.power + " Party is in power.")
    }

//User's party

    else if (command === "party") {
        var current = [];
        var id = message.author.id;
        party.parties.forEach(function (a) {
            if (a.members.some(function (b) {
                    return b === id;
                })) {
                current.push(a.name);
            }
        });
        if (current.length === 0) {
            message.channel.send("You are not currently in a party. Type \"" + config.prefix + "parties\" to see the options.")
        }
        else {
            var id = message.author.id;
            party.parties.forEach(function (a) {
                if (a.members.some(function (b) {
                        return b === id;
                    })) {
                    message.channel.send("You are a memeber of the " + a.name + " Party");
                }
                else {
                    return
                }
            });
        }
    }

//List Parties
    else if (command === "parties") {
        list = [];
        party.parties.forEach(function (element) {
            list.push(element.name);
        });
        message.channel.send("Current parties:\n```" + "-" + list.join(" Party \n-") + "```");
    }

//List Party Members
    else if (command === "list") {
        if (args.length === 0) {
            message.channel.send("Please choose a party.")
        }
        else {
            list = [];

            party.parties.forEach(function (element) {
                list.push(element.name);
            });
            p = list.filter(parties => parties.startsWith(args[0])
        )
            ;

            list = party.parties.filter(function (a) {
                return a['name'] == p;
            });
            if (list.length === 0) {
                message.channel.send("Party not found. Names are case-sensitive.")
            }
            else {
                names = [];
                list[0].members.forEach(
                    function (id) {
                        names.push(message.guild.members.get(id).displayName)
                    }
                )

                if (names.length === 0) {
                    message.channel.send("The " + p + " Party has no members.")
                }
                else if (names.length === 1) {
                    message.channel.send("The " + p + " Party has " + list.length + " member:\n" + names.join(" \n"))
                }
                else (
                        message.channel.send("The " + p + " Party has " + list[0].members.length + " members:\n" + names.join(" \n"))
                    )
            }

        }
    }


//Join a Party
    else if (command === "join") {
        if (args.length === 0) {
            message.channel.send("Please enter a party");
        }
        else {
            list = [];
            party.parties.forEach(function (element) {
                list.push(element.name);
            });
            newParty = list.filter(parties => parties.startsWith(args[0])
        );
            if (newParty.length != 0) {
                list = party.parties.filter(function (a) {
                    return a['name'] == newParty;
                });

                //Remove user from other lists
                var id = message.author.id;

                party.parties.forEach(function (a) {
                    var index = a.members.findIndex(function (b) {
                        return b == id
                    });
                    if (index != -1) {
                        a.members.splice(index, 1);
                    }
                });
                //Add user to new party
                list[0].members.push(message.author.id);
                fs.writeFile("./parties.json", JSON.stringify(party), (err) => console.error
            )
                ;
                result = "You have joined the " + newParty + " Party."
            }
            else {
                result = "Party does not exist."
            }
        }
        message.channel.send(result);
    }


//Splitting the Party
    else if (command === "split") {
        var current = [];
        var id = message.author.id;
        party.parties.forEach(function (a) {
            if (a.members.some(function (b) {
                    return b === id;
                })) {
                current.push(a.name);
            }
        });
        if (current.length === 0){message.channel.send("You must join a party before you can split one.")}
        else {
        var tendency = party.tendencies[Math.floor(Math.random() * party.tendencies.length)];

        var id = message.author.id;
        var newParty;
        party.parties.forEach(function (a) {
            if (a.members.some(function (b) {
                    return b === id;
                })) {
                newParty = tendency + " " + a.name;
            }
        });

            //Remove user from other lists
        var id = message.author.id;

        party.parties.forEach(function (a) {
            var index = a.members.findIndex(function (b) {
                return b == id
            });
            if (index != -1) {
                a.members.splice(index, 1);
            }
        });

        //Register new party
        party.parties.push({
            "name": newParty,
            "members": [
                message.author.id
            ]
        });

        fs.writeFile("./parties.json", JSON.stringify(party), (err) => console.error);
        message.channel.send("The " + newParty + " Party has formed under the guidance of their leader, " + message.author.username + ".")
    }
    }

//Revolutions
    else if (command === "revolution") {
        var challenger = Math.floor(Math.random() * 10); //Add weighting
        var defender = Math.floor(Math.random() * 10);
        if (challenger >= defender) {
            power = party.power;
            party.parties = party.parties.filter(function (a) {
                return a['name'] !== power;
            });
            //Set the party in power to the user's party
            var id = message.author.id;
            party.parties.forEach(function (a) {
                if (a.members.some(function (b) {
                        return b === id;
                    })) {
                    party.power = a.name;
                }
            });
            fs.writeFile("./parties.json", JSON.stringify(party), (err) => console.error);
            message.channel.send("After a bloody struggle, the " + party.power + " Party has taken power.")
        }
        else {
            message.channel.send("The " + party.power + " Party crushed the revolution and remains in power.")
        }
    }
    else if (command === "help") {
        message.channel.send("`" + config.prefix + "party: See your party`\n`" + config.prefix + "power: Show the party in power`\n`" + config.prefix + "parties: List all parties`\n`" + config.prefix + "list party: Show all members of a party`\n`" + config.prefix + "split: Form a new splinter party`\n`" + config.prefix + "join party: Defect to another party`\n`" + config.prefix + "revolution: Attempt a coup`");

    }
}
//Garfield Functionality

if (message.channel.id === "419250097373839360") {
    if (message.content.startsWith(config.garfix + "help")) {
        message.channel.send("`g!today`: Show today's strip\n`g!MM-DD-YYYY`: Show a strip from a specific date\n`g!random`: Show a random strip");
    }

    else if (message.content.startsWith(config.garfix + "today")) {
        message.channel.send({files: [garf.latest()]});
    }
    else if (message.content.startsWith(config.garfix + "random")) {
        message.channel.send({files: [garf.random()]});
    }
    else if (message.content.startsWith(config.garfix)) {
        const args = message.content.slice(config.garfix.length).trim().split("-");
        if (
            args[0].length > 2 ||
            args[1].length > 2 ||
            args[2].length !== 4
        ) {
            message.channel.send("Invalid date format. Please use *MM-DD-YYYY*");
        }
        else if (
            args[0] == 4 && args[1] > 30 || args[0] == 6 && args[1] > 30 || args[0] == 9 && args[1] > 30 ||
            args[0] == 11 && args[1] > 30 || args[0] == 2 && (args[1] > 29 || ((args[2] % 4 != 0) && args[1] > 28)) || args[0] == 1 && args[1] > 31 ||
            args[0] == 3 && args[1] > 31 || args[0] == 5 && args[1] > 31 || args[0] == 7 && args[1] > 31 ||
            args[0] == 8 && args[1] > 31 || args[0] == 10 && args[1] > 31 || args[0] == 12 && args[1] > 31 ||
            args[0] > 12
        ) {
            message.channel.send("Please enter a valid date. Format is MM-DD-YYYY.");
        }
        else if (
            args[2] <= 1978 && (args[0] < 6 || (args[0] = 6 && args[1] < 19))
        ) {
            message.channel.send("Garf did not exist yet");
        }
        else if (
            moment(args[2] + "-" + args[0] + "-" + args[1]) > moment(today)
        ) {
            message.channel.send("Garf does not exist yet");
        }
        else (
                message.channel.send({files: [garf.request(args[2], args[0], args[1])]})
            );
    }
}


//** These commands only work for Bamb **//
if (message.author.id !== config.ownerID) return;

//Change bot prefix
else if (message.content.startsWith(config.prefix + "prefix")) {
    // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
    let newPrefix = message.content.split(" ").slice(1, 2)[0];
    // change the configuration in memory
    config.prefix = newPrefix;
    // Now we have to save the file.
    fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error
)
    ;
}

// Purge all parties
else if (command === "purge") {
    party.parties = [{"name": "Furry", "members": [message.author.id]}];
    party.power = "Furry";
    message.channel.send("All parties purged. The Furry Party has returned to power.");
    fs.writeFile("./parties.json", JSON.stringify(party), (err) => console.error)
}
})
;

client.login(config.token);
