import * as os from 'node:os';
import { Command, Option } from 'commander';
import { callApi, Cmd, Config } from '../piHoleRemoteApi';
import { default as globby } from 'globby';
import { promises as fsPromises } from 'fs';
import * as fs from 'fs';

async function status(cli1: Config, cli2: Command | Config, cli3: Command) {
  let options: Config = cli1;
  let command: Command = cli2 as Command;
  if (cli3 !== undefined) {
    options = cli2 as Config;
    options.argument = cli1;
    command = cli3;
  }

  if (!Object.prototype.hasOwnProperty.call(options, 'auth')) {
    const paths = await globby(['**/.pi-hole-remote.json']);
    const homedir = os.homedir();
    if (fs.existsSync(`${homedir}/.pi-hole-remote.json`)) {
      paths.push(`${homedir}/.pi-hole-remote.json`);
    }

    for (const path of paths) {
      const data = JSON.parse((await fsPromises.readFile(path)).toString());
      options = Object.assign(options, data);
    }
  }

  const ret: unknown | { data?: unknown } = await callApi(command.name() as Cmd, options);
  if (command.name() === 'getAllQueries') {
    console.table((ret as { data?: unknown }).data ? (ret as { data?: unknown }).data : []);
  } else {
    console.log(ret);
  }
}

export async function execute(rawArgs: string[]): Promise<Config | undefined> {
  try {
    const program = new Command();
    const urlOption = new Option('-u, --url [url]', 'URL of pi-hole, without http/https and without admin path. (e.g. pihole:8080)');
    const authOption = new Option('-a, --auth <auth>', 'auth code');
    const fromOption = new Option('-f, --from [from]', 'The default number of returned entries is 10. It can be changed by specifying a numeric argument');
    const untilOption = new Option('-u, --until [until]', 'The default number of returned entries is 10. It can be changed by specifying a numeric argument');


    program
      .command('status')
      .description('Display the running status of Pi-hole subsystems')
      .addOption(urlOption)
      .addOption(authOption)
      .action(status);

    program
      .command('enable')
      .description('Enable Pi-hole subsystems')
      .addOption(urlOption)
      .addOption(authOption)
      .action(status);

    program
      .command('disable')
      .argument('[seconds]', 'Temporal disabling is possible by specifying the amount of seconds')
      .description('Disable Pi-hole subsystems')
      .addOption(urlOption)
      .addOption(authOption)
      .action(status);

    program
      .command('restartdns')
      .description('Restart Pi-hole subsystems')
      .addOption(urlOption)
      .addOption(authOption)
      .action(status);

    program
      .command('version')
      .description('Show installed versions of Pi-hole, Admin Console & FTL')
      .addOption(urlOption)
      .addOption(authOption)
      .action(status);

    program
      .command('summaryRaw')
      .description('Gives statistics in raw format (no number formatting applied)')
      .addOption(urlOption)
      .addOption(authOption)
      .action(status);

    program
      .command('summary')
      .description('Gives statistics in formatted style')
      .addOption(urlOption)
      .addOption(authOption)
      .action(status);

    program
      .command('overTimeData10mins')
      .description('Data needed for generating the domains/ads over time graph on the Pi-hole web dashboard')
      .addOption(urlOption)
      .addOption(authOption)
      .action(status);

    program
      .command('topItems')
      .argument('[count]', 'The default number of returned entries is 10. It can be changed by specifying a numeric argument')
      .description('Data needed for generating the Top Domain and Top Advertisers Lists')
      .addOption(urlOption)
      .addOption(authOption)
      .action(status);

    program
      .command('getQuerySources')
      .description('Data needed for generating the Top Clients list')
      .addOption(urlOption)
      .addOption(authOption)
      .action(status);

    program
      .command('topClients')
      .argument('[count]', 'The default number of returned entries is 10. It can be changed by specifying a numeric argument')
      .description('Data needed for generating the Top Clients list')
      .addOption(urlOption)
      .addOption(authOption)
      .addOption(fromOption)
      .addOption(untilOption)
      .action(status);

    program
      .command('getForwardDestinations')
      .description('Shows number of queries that have been forwarded and the target')
      .addOption(urlOption)
      .addOption(authOption)
      .action(status);

    program
      .command('getQueryTypes')
      .description('Shows number of queries that the Pi-hole\'s DNS server has processed')
      .addOption(urlOption)
      .addOption(authOption)
      .action(status);

    program
      .command('getAllQueries')
      .description('Get DNS queries data')
      .addOption(urlOption)
      .addOption(authOption)
      .addOption(fromOption)
      .addOption(untilOption)
      .action(status);

    program
      .command('recentBlocked')
      .description('Show most recent blocked domain')
      .addOption(urlOption)
      .addOption(authOption)
      .action(status);

    const options = program.opts();
    await program.parseAsync(rawArgs);
    if (process.argv.length < 3) {
      program.help();
    }
    return options as Config;
  } catch (error) {
    console.error(error);
  }
  return undefined;
}
