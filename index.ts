#!/usr/bin/env node

import * as chalk from "chalk";

import * as spawn from "cross-spawn";
import * as _ from "lodash";
import * as omelette from 'omelette';

const completion = omelette(`kukulkan <action> <name> <packaging> <databaseFlag> <database>`);

completion.on('action', ({ reply }) => {
    reply(['project']);
});

completion.on('name', ({ reply }) => {
    reply(['-name ']);
});

completion.on('packaging', ({ before, reply }) => {
    if (before !== "-name") {
        reply(['-packaging']);
    }
});

completion.on('databaseFlag', ({ reply }) => {
    reply(['-database']);
});

completion.on('database', ({ reply }) => {
    reply(['MYSQL', 'MONGO']);
});

completion.init();

if (~process.argv.indexOf('--setup')) {
    completion.setupShellInitFile()
}

require('yargs')
    .command(
        'project',
        'Create a new project',
        (yargs) => {
            return yargs.option('n', {
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
                })
        },
        (argv) => {
            console.log(chalk.default.greenBright(
                `Generating project ${argv.name}
with packaging ${argv.p}
with database type ${argv.d}`));
            //spawnCommandSync("java", ["-jar", "cli-0.0.1-SNAPSHOT.jar", argv.n, argv.p, argv.d, process.cwd()], {cwd: __dirname});
        }
    )
    .help()
    .argv;

function spawnCommandSync(command: string, args: string[], opt: any) {
    opt = opt || {};
    return spawn.sync(command, args, _.defaults(opt, { stdio: 'inherit' }));
}