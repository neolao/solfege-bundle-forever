"use strict"

let solfege = require("solfegejs");
let ForeverBundle = require("../lib/Bundle");
let MyBundle = require("./lib/Bundle");

// Build application
let application = solfege.factory();
application.addBundle(new ForeverBundle);
application.addBundle(new MyBundle);

// Load configuration
application.loadConfiguration({
    forever: {
        console_path: `${__dirname}/console.js`
    }
});

// Start application
let parameters = process.argv.slice(2);
application.start(["forever:start"].concat(parameters));
