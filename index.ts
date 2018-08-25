#!/usr/bin/env node

import * as chalk from "chalk";

import * as spawn from "cross-spawn";
import * as _ from "lodash";
import * as omelette from 'omelette';

//omelette`kukulkan ${['pull', 'push']} ${['origin', 'upstream']} ${['master', 'develop']}`.init()

const completion = omelette(`kukulkan -n <project> -p <packaging> -d <database>`);

completion.on('project', ({ reply }) => {
    reply(['demo', 'awesome']);
});

completion.on('packaging', ({ reply }) => {
    reply(['mx.infotec.dads', 'com.example']);
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
                `Generating project ${argv.n}
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