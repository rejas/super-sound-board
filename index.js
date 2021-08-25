// Readline lets us tap into the process events
const readline = require('readline');

// Sound library
const Audic = require("audic");

// Path handling
const path = require("path");

// Config
const config = require("./config");

// Mappings keys <-> sounds
const mappings = require("./sounds/mappings");

let audio;

// Allows us to listen for events from stdin
readline.emitKeypressEvents(process.stdin);

// Raw mode gets rid of standard keypress events and other
// functionality Node.js adds by default
process.stdin.setRawMode(true);

// Start the keypress listener for the process
process.stdin.on('keypress', (str, key) => {

    // "Raw" mode so we must do our own kill switch
    if(key.sequence === '\u0003') {
        process.exit();
    }

    // User has triggered a keypress, now do whatever we want!
    // ...

    //console.log(key);
    //console.log(str);

    let soundFile;
    for (let entry of mappings.entries) {
        if (entry.key.sequence === key.sequence && entry.key.meta === key.meta) {
            soundFile = entry.file;
        }
    }

    if (soundFile) {
        if (audio) {
            audio.pause();
        }
        const filePath = path.join(__dirname, "/sounds/" + soundFile);
        audio = new Audic(filePath);
        audio.volume = config.volume;
        audio.play().then(() => console.log("done!"));
    } else {
        console.log(key);
    }
});

