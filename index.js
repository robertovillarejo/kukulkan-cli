#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var spawn = require("cross-spawn");
var _ = require("lodash");
var omelette = require("omelette");
var completion = omelette("kukulkan <action> <name> <packaging> <databaseFlag> <database>");
completion.on('action', function (_a) {
    var reply = _a.reply;
    reply(['project']);
});
completion.on('name', function (_a) {
    var reply = _a.reply;
    reply(['-name ']);
});
completion.on('packaging', function (_a) {
    var before = _a.before, reply = _a.reply;
    if (before !== "-name") {
        reply(['-packaging']);
    }
});
completion.on('databaseFlag', function (_a) {
    var reply = _a.reply;
    reply(['-database']);
});
completion.on('database', function (_a) {
    var reply = _a.reply;
    reply(['MYSQL', 'MONGO']);
});
completion.init();
if (~process.argv.indexOf('--setup')) {
    completion.setupShellInitFile();
}
require('yargs')
    .command('project', 'Create a new project', function (yargs) {
    return yargs.option('name', {
        alias: 'name',
        describe: 'The name of project'
    })
        .option('p', {
        alias: 'packaging',
        describe: 'The packaging'
    })
        .option('d', {
        alias: 'database',
        describe: 'The database type'
    });
}, function (argv) {
    console.log(chalk.default.greenBright("Generating project " + argv.name + "\nwith packaging " + argv.p + "\nwith database type " + argv.d));
    //spawnCommandSync("java", ["-jar", "cli-0.0.1-SNAPSHOT.jar", argv.n, argv.p, argv.d, process.cwd()], {cwd: __dirname});
})
    .help()
    .argv;
function spawnCommandSync(command, args, opt) {
    opt = opt || {};
    return spawn.sync(command, args, _.defaults(opt, { stdio: 'inherit' }));
}
