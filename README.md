# pi-hole-remote <img src="https://upload.wikimedia.org/wikipedia/commons/0/00/Pi-hole_Logo.png" width="200" align="right" alt="pi-hole-remote">

Controls a remote pi-hole via cli or use it as a node module in your own module. Like my Node-RED nodes [node-red-contrib-pi-hole-remote](https://github.com/naimo84/node-red-contrib-pi-hole-remote)

## :question: Get Help

For bug reports and feature requests, open issues. :bug:

## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications _for free_! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

-   Starring and sharing the projects you like :rocket:
-   [![PayPal][badge_paypal]][paypal-donations] **PayPal**— You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
-   [![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/T6T412CXA) **Ko-fi**— I'll buy a ~~tea~~ coffee. :coffee: :wink:
-   ![](./docs/bitcoin.png) **Bitcoin**—You can send me bitcoins at this address (or scanning the code): `3GqiebqcZeonziRUMYxU35J3jPSMJzpTAc`

Thanks! :heart:

## :cloud: Installation

```sh
$ npm install -g pi-hole-remote
```

## :cloud: Usage

### Usage as cli

``` 
installed via npm globally: pi-hole-remote
alternatively: npx pi-hole-remote
```

```
Usage: pi-hole-remote [options] [command]

Options:
  -a, --auth <auth>             auth code
  -u, --url [url]               URL of pi-hole, without http/https and without admin path. (e.g. pihole:8080)
  -h, --help                    display help for command

Commands:
  status                        Display the running status of Pi-hole subsystems
  enable                        Enable Pi-hole subsystems
  disable [seconds]             Disable Pi-hole subsystems
  restartdns                    Restart Pi-hole subsystems
  version                       Show installed versions of Pi-hole, Admin Console & FTL
  summaryRaw                    Gives statistics in raw format (no number formatting applied)
  summary                       Gives statistics in formatted style
  overTimeData10mins            Data needed for generating the domains/ads over time graph on the Pi-hole web dashboard
  topItems [count]              Data needed for generating the Top Domain and Top Advertisers Lists
  getQuerySources               Data needed for generating the Top Clients list
  topClients [options] [count]  Data needed for generating the Top Clients list
  getForwardDestinations        Shows number of queries that have been forwarded and the target
  getQueryTypes                 Shows number of queries that the Pi-hole's DNS server has processed
  getAllQueries [options]       Get DNS queries data
  recentBlocked                 Show most recent blocked domain
  help [command]                display help for command
```

### Usage in your own node module

```sh
$ npm install pi-hole-remote
```

## :memo: Documentation

### Example:

```ts
//Typescript - index.ts

import { callApi } from 'pi-hole-remote';

let content = await callApi('status', { url: 'http://pihole:8080', auth: '123456789009123843029482 })
```

or

```js
//Javascript - index.js

var pihole = require("pi-hole-remote");
var ev = pihole.callApi('status', { url: 'http://pihole:8080', auth: '123456789009123843029482 });
```

output:  
```sh
$ tsc index.ts
$ node .\index.js
{ status: 'enabled' }
```

## :yum: How to contribute

Have an idea? Found a bug? See [how to contribute][contributing].

```sh
git clone https://github.com/naimo84/pi-hole-remote.git
cd pi-hole-remote
npm install
npm run build
cd /your/project/path
npm install /path/to/pi-hole-remote
```

[badge_brave]: ./docs/support_banner.png
[badge_paypal]: https://img.shields.io/badge/Donate-PayPal-blue.svg
[paypal-donations]: https://paypal.me/NeumannBenjamin
[brave]: https://brave.com/nai412
[contributing]: /CONTRIBUTING.md
