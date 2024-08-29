const fs = require('fs').promises;
const path = require('path');

const SCENES_FILE = path.join(__dirname, 'scenes.json');

let scenes = [];

async function loadScenes() {
    try {
        const data = await fs.readFile(SCENES_FILE, 'utf8');
        const parsed = JSON.parse(data);
        scenes = parsed.scenes.map(scene => scene[0]); // Extract the first (and only) string from each array
    } catch (error) {
        console.error('Error loading scenes:', error);
        scenes = [];
    }
}

async function saveScenes() {
    try {
        const data = JSON.stringify({ scenes: scenes.map(scene => [scene]) }, null, 2);
        await fs.writeFile(SCENES_FILE, data, 'utf8');
    } catch (error) {
        console.error('Error saving scenes:', error);
    }
}

function addScene(scene) {
    scenes.push(scene);
}

function getScenes() {
    return scenes;
}

// Load scenes when the module is first imported
loadScenes();

module.exports = {
    loadScenes,
    saveScenes,
    addScene,
    getScenes
};
