// Readline lets us tap into the process events
const readline = require('readline');

// Sound library
const sound = require('sound-play');

// Path handling
const path = require("path");

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

    console.log(key);
    console.log(str);

    if (key.name === "c") {
        const filePath = path.join(__dirname, "/sounds/cow.mp3");
        sound.play(filePath, 1);
    }
});

