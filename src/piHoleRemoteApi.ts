import got from 'got';

export interface Config {
  argument?: unknown;
  url?: string,
  command?: string,
  auth?: string,
  from?: string,
  until?: string,
  disabletime?: number
}

export async function callApi(commandName: string, config: Config): Promise<string | { data?: unknown } | unknown> {
  let command = commandName;
  if (commandName === 'disable' && config.disabletime && config.disabletime > 0) {
    command = `disable=${config.disabletime}`;
  }

  if (config.argument) {
    command = `${commandName}=${config.argument}`;
  }

  if (config.from) {
    command = `${commandName}&from=${config.from}`;
  }
  if (config.until) {
    command = `${commandName}&until=${config.until}`;
  }
  if (config?.url?.slice(0, 7) !== 'http://') {
    config.url = `http://${config.url}`;
  }
  const get = got.get(`${config.url}/admin/api.php?${command}&auth=${config.auth}`, { https: { rejectUnauthorized: false } });
  const ret = (['recentBlocked'].indexOf(commandName) < 0)
    ? await get.json()
    : await get.text();

  return ret;
}
