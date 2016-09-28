"use strict"

let solfege = require("solfegejs");
let ForeverBundle = require("../lib/Bundle");
let MyBundle = require("./lib/Bundle");

// Build application
let application = solfege.factory();
application.addBundle(new ForeverBundle);
application.addBundle(new MyBundle);

// Load configuration
application.loadConfiguration(`${__dirname}/config/production.yml`);

// Start application
application.start(process.argv.slice(2));
