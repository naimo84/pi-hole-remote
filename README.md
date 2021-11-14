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
$ npm install pi-hole-remote
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

## :scroll: The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Coded with :heart: in :cloud:

[badge_brave]: ./docs/support_banner.png
[badge_paypal]: https://img.shields.io/badge/Donate-PayPal-blue.svg
[paypal-donations]: https://paypal.me/NeumannBenjamin
[brave]: https://brave.com/nai412
[contributing]: /CONTRIBUTING.md
