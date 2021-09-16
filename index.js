// Readline lets us tap into the process events
const readline = require('readline');

// Sound library
const Audic = require("audic-forked");

// Path handling
const path = require("path");

// Config
const config = require("./config");

// Mappings keys <-> sounds
const mappings = config.sounds;

// Allows us to listen for events from stdin
readline.emitKeypressEvents(process.stdin);

// Raw mode gets rid of standard keypress events and other functionality Node.js adds by default
process.stdin.setRawMode(true);

// Setup Sound library
let audio = new Audic();
audio.volume = config.volume;

// Start the keypress listener for the process
process.stdin.on('keypress', async (str, key) => {

    // "Raw" mode so we must do our own kill switch
    if (key.sequence === '\u0003') {
        process.exit();
    }

    // User has triggered a keypress, now do whatever we want!
    let soundFile;
    for (let entry of mappings) {
        if (entry.key.name === key.name && entry.key.meta === key.meta) {
            soundFile = entry.file;
        }
    }

    if (soundFile) {
        if (audio.playing)
            await audio.pause();
        const filePath = path.join(__dirname, "/sounds/" + soundFile);
        await audio.setSrc(filePath);
        await audio.play();
    } else {
        console.log(key);
        console.log(str);
    }
});

