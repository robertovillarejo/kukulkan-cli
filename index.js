#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spawn = require("cross-spawn");
var _ = require("lodash");
/*
omelette`kukulkan ${['pull', 'push']} ${['origin', 'upstream']} ${['master', 'develop']}`.init()

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
                `Generating project ${argv.n}
with packaging ${argv.p}
with database type ${argv.d}`));
            //spawnCommandSync("java", ["-jar", "cli-0.0.1-SNAPSHOT.jar", argv.n, argv.p, argv.d, process.cwd()], {cwd: __dirname});
        }
    )
    .completion('completion', function (current, argv) {
        // 'current' is the current command being completed.
        // 'argv' is the parsed arguments so far.
        // simply return an array of completions.
        console.log("Completion...");
        return [
            'foo',
            'bar'
        ];
    })
    .help()
    .argv;
*/
function spawnCommandSync(command, args, opt) {
    opt = opt || {};
    return spawn.sync(command, args, _.defaults(opt, { stdio: 'inherit' }));
}
var omelette = require('./node_modules/omelette');
omelette('kukulkan').tree({
    how: {
        much: {
            is: {
                this: ['car'],
                that: ['house'],
            }
        },
        are: ['you'],
        many: ['cars', 'houses'],
    },
    where: {
        are: {
            you: ['from'],
            the: ['houses', 'cars'],
        },
        is: {
            your: ['house', 'car'],
        },
    },
}).init();
