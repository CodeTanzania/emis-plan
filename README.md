# emis-plan

[![Build Status](https://travis-ci.org/CodeTanzania/emis-plan.svg?branch=develop)](https://travis-ci.org/CodeTanzania/emis-plan)
[![Dependencies Status](https://david-dm.org/CodeTanzania/emis-plan/status.svg?style=flat-square)](https://david-dm.org/CodeTanzania/emis-plan)
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/CodeTanzania/emis-plan/tree/develop)

A representation of written set of activities and procedures that outlines(or guides) what stakeholders and others should do in emergency(or disaster) event.

## Domain Model

![EMIS Plan Domain Model](https://raw.githubusercontent.com/CodeTanzania/emis-plan/develop/specifications/planv0.1.0.png)

## Requirements

- [NodeJS v8.11.1+](https://nodejs.org)
- [Npm v5.6.0+](https://www.npmjs.com/)
- [MongoDB v3.4.10+](https://www.mongodb.com/)
- [Mongoose v5.1.2+](https://github.com/Automattic/mongoose)

## Installation

```sh
npm install @codetanzania/emis-plan --save
```

## Usage

```js
const { app } = require('@codetanzania/emis-plan');
app.start((error) => { ... });
```

## Testing

- Clone this repository

- Install all development dependencies

```sh
npm install
```

- Run example

```sh
npm run dev
```

- Then run test

```sh
npm test
```

## Contribute

It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.


## References
- [Disaster](https://en.wikipedia.org/wiki/Disaster)
- [Emergency Management](https://en.wikipedia.org/wiki/Emergency_management)
- [Disaster and Emergency Planning for Preparedness, Response, and Recovery](http://naturalhazardscience.oxfordre.com/view/10.1093/acrefore/9780199389407.001.0001/acrefore-9780199389407-e-12)
- [Contingency Plan](https://en.wikipedia.org/wiki/Contingency_plan)
- [Emergency Procedure](https://en.wikipedia.org/wiki/Emergency_procedure)


## License

The MIT License (MIT)

Copyright (c) 2018 CodeTanzania & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
