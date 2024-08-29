const fs = require('fs').promises;

let parties = [];
let power = '';

async function loadParties() {
    try {
        const data = await fs.readFile('./parties.json', 'utf8');
        const partyData = JSON.parse(data);
        parties = partyData.parties;
        power = partyData.power;
    } catch (error) {
        console.error('Error loading parties:', error);
    }
}

async function saveParties() {
    try {
        await fs.writeFile('./parties.json', JSON.stringify({ parties, power }, null, 2));
    } catch (error) {
        console.error('Error saving parties:', error);
    }
}

function getUserParty(userId) {
    return parties.find(party => party.members.includes(userId));
}

function getPartyByName(partyName) {
    return parties.find(party => party.name.toLowerCase() === partyName.toLowerCase());
}

async function joinParty(userId, partyName) {
    const party = getPartyByName(partyName);
    if (party) {
        removeUserFromParties(userId);
        party.members.push(userId);
        await saveParties();
        return true;
    }
    return false;
}

function removeUserFromParties(userId) {
    parties.forEach(party => {
        const index = party.members.indexOf(userId);
        if (index !== -1) {
            party.members.splice(index, 1);
        }
    });
}

async function splitParty(userId) {
    const userParty = getUserParty(userId);
    if (!userParty) {
        return "You must join a party before you can split one.";
    }

    const tendencies = ['Radical', 'Orthodox', 'Reformed', 'Neo'];
    const tendency = tendencies[Math.floor(Math.random() * tendencies.length)];
    const newPartyName = `${tendency} ${userParty.name}`;

    removeUserFromParties(userId);
    parties.push({
        name: newPartyName,
        members: [userId]
    });

    await saveParties();
    return `The ${newPartyName} Party has formed under the guidance of their leader.`;
}

async function attemptRevolution(userId) {
    const challenger = Math.floor(Math.random() * 10);
    const defender = Math.floor(Math.random() * 10);

    if (challenger >= defender) {
        const oldPower = power;
        const userParty = getUserParty(userId);
        power = userParty ? userParty.name : 'Unknown';
        await saveParties();
        return `After a bloody struggle, the ${power} Party has taken power.`;
    } else {
        return `The ${power} Party crushed the revolution and remains in power.`;
    }
}

async function purgeParties(ownerUserId) {
    parties = [{ name: "Furry", members: [ownerUserId] }];
    power = "Furry";
    await saveParties();
}

function getParties() {
    return parties;
}

function getPowerParty() {
    return power;
}

module.exports = {
    loadParties,
    saveParties,
    getUserParty,
    getPartyByName,
    joinParty,
    splitParty,
    attemptRevolution,
    purgeParties,
    getParties,
    getPowerParty
};
