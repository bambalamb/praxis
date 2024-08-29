const Discord = require('discord.js');
const moment = require('moment');
const http = require('http');
const config = require('./config');

const GARFIELD_CHANNEL_ID = '419250097373839360';
const GARFIELD_START_DATE = '1978-06-19';
const ARCHIVE_URL = 'http://picayune.uclick.com/comics/ga/';

class GarfieldModule {
    constructor(client) {
        this.client = client;
    }

    async postDailyGarfield() {
        const channel = this.client.channels.cache.get(GARFIELD_CHANNEL_ID);
        const today = new Date();

        console.log(`[${new Date().toISOString()}] Attempting to post daily Garfield`);

        if (today.getDate() === 1 && today.getMonth() === 3) {
            // April Fools' Day
            const aprilFoolsUrl = 'https://assets.amuniversal.com/b5bdb4206e700139533d005056a9545d.jpg';
            await channel.send(aprilFoolsUrl);
            console.log(`[${new Date().toISOString()}] Posted April Fools' Garfield: ${aprilFoolsUrl}`);
        } else {
            try {
                const stripUrl = await this.fetchStrip(this.latest());
                await channel.send({ files: [stripUrl] });
                console.log(`[${new Date().toISOString()}] Posted daily Garfield: ${stripUrl}`);
            } catch (error) {
                const errorMessage = "Sorry, I couldn't fetch today's Garfield strip.";
                await channel.send(errorMessage);
                console.error(`[${new Date().toISOString()}] Error posting daily Garfield: ${error.message}`);
            }
        }
    }

    async handleGarfieldCommands(message) {
        const command = message.content.slice(config.garfix.length).trim();
        console.log(`[${new Date().toISOString()}] User ${message.author.tag} used Garfield command: ${command}`);

        if (command === 'help') {
            const helpMessage = "`g!today`: Show today's strip\n`g!MM-DD-YYYY`: Show a strip from a specific date\n`g!random`: Show a random strip";
            await message.channel.send(helpMessage);
            console.log(`[${new Date().toISOString()}] Sent help message to ${message.author.tag}`);
            return;
        }

        if (command === 'today') {
            return this.sendStrip(message, this.latest());
        }

        if (command === 'random') {
            return this.sendStrip(message, this.random());
        }

        const dateArgs = command.split('-');
        if (dateArgs.length === 3) {
            return this.handleDateSpecificStrip(message, dateArgs);
        }

        const errorMessage = "Invalid command. Use `g!help` for usage instructions.";
        await message.channel.send(errorMessage);
        console.log(`[${new Date().toISOString()}] Sent error message to ${message.author.tag}: ${errorMessage}`);
    }

    async handleDateSpecificStrip(message, [month, day, year]) {
        if (!this.isValidDate(month, day, year)) {
            const errorMessage = "Please enter a valid date. Format is MM-DD-YYYY.";
            await message.channel.send(errorMessage);
            console.log(`[${new Date().toISOString()}] Sent error message to ${message.author.tag}: ${errorMessage}`);
            return;
        }

        const stripDate = moment(`${year}-${month}-${day}`);
        const startDate = moment(GARFIELD_START_DATE);
        const today = moment();

        if (stripDate.isBefore(startDate)) {
            const errorMessage = "Garf did not exist yet";
            await message.channel.send(errorMessage);
            console.log(`[${new Date().toISOString()}] Sent error message to ${message.author.tag}: ${errorMessage}`);
            return;
        }

        if (stripDate.isAfter(today)) {
            const errorMessage = "Garf does not exist yet";
            await message.channel.send(errorMessage);
            console.log(`[${new Date().toISOString()}] Sent error message to ${message.author.tag}: ${errorMessage}`);
            return;
        }

        return this.sendStrip(message, this.request(year, month, day));
    }

    isValidDate(month, day, year) {
        const date = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD', true);
        return date.isValid();
    }

    latest() {
        const today = moment();
        return this.request(today.year(), today.month() + 1, today.date());
    }

    random() {
        const start = moment(GARFIELD_START_DATE);
        const today = moment();
        const randomDate = moment(start + Math.random() * (today - start));
        return this.request(randomDate.year(), randomDate.month() + 1, randomDate.date());
    }

    request(year, month, day) {
        const formattedYear = year.toString();
        const formattedMonth = month.toString().padStart(2, '0');
        const formattedDay = day.toString().padStart(2, '0');
        const shortYear = formattedYear.slice(-2);
        return `${ARCHIVE_URL}${formattedYear}/ga${shortYear}${formattedMonth}${formattedDay}.gif`;
    }

    fetchStrip(url) {
        console.log(`[${new Date().toISOString()}] Attempting to fetch strip: ${url}`);
        return new Promise((resolve, reject) => {
            http.get(url, (response) => {
                if (response.statusCode === 200) {
                    console.log(`[${new Date().toISOString()}] Successfully fetched strip: ${url}`);
                    resolve(url);
                } else {
                    console.error(`[${new Date().toISOString()}] Failed to fetch strip: ${url}, Status code: ${response.statusCode}`);
                    reject(new Error('Strip not found'));
                }
            }).on('error', (err) => {
                console.error(`[${new Date().toISOString()}] Error fetching strip: ${url}, Error: ${err.message}`);
                reject(err);
            });
        });
    }

    async sendStrip(message, stripUrl) {
        try {
            const validatedUrl = await this.fetchStrip(stripUrl);
            await message.channel.send({ files: [validatedUrl] });
            console.log(`[${new Date().toISOString()}] Sent Garfield strip to ${message.author.tag}: ${validatedUrl}`);
        } catch (error) {
            const errorMessage = "Sorry, I couldn't find that Garfield strip.";
            await message.channel.send(errorMessage);
            console.error(`[${new Date().toISOString()}] Error sending strip to ${message.author.tag}: ${error.message}`);
        }
    }
}

module.exports = GarfieldModule;
