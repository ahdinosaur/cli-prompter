# cli-prompter

interactive user prompts for the command-line interface

```shell
npm install --save cli-prompter
```

built on top of the [`prompt-skeleton`](https://github.com/derhuerst/prompt-skeleton) ecosystem.

## example

```js
const prompter = require('cli-prompter')
const range = require('array-range')
const randomWord = require('random-word')
const licenses = require('spdx-license-list/simple');
const getUserName = require('username').sync

const questions = [{
  type: 'text',
  name: 'name',
  message: "Give your app a name",
  default: range(2).map(randomWord).join('-')
}, {
  type: 'text',
  name: 'description',
  message: "How would you describe the app?",
  default: "there are many like it, but this one is mine.",
}, {
  type: 'text',
  name: 'author',
  message: "What is your name on GitHub?",
  default: getUserName(),
}, {
  type: 'autocomplete',
  name: 'license',
  message: "Choose a license:",
  suggest: suggestLicenses,
  default: 'ISC',
}, {
  type: 'confirm',
  message: 'Continue?',
  default: true
}]

prompter(questions, (err, values) => {
  if (err) throw err
  console.log(values)
})
```

see the full example at [./example](./example.js).

## usage

### `Prompter = require('cli-prompter')`

### `Prompter(questions, (err, values) => {})`

`questions` is an array of objects that each describe a prompt for the user.

a question object **must** have a string `type` to determine what [prompt type](#prompt-types) will handle it.

most prompt types support the following:

```js
{
  type: String,
  name: String,
  message: String,
  default // optional
}
```

the callback will be called when all questions have been answered with either an error or all the answered values.

## prompt types

there are a [wide variety of prompts] available thanks to [@derhuerst](https://github.com/derhuerst)'s [`prompt-skeleton`](https://github.com/derhuerst/prompt-skeleton).

### TODO

- [ ] [date](https://github.com/derhuerst/date-prompt)
- [ ] [mail](https://github.com/derhuerst/mail-prompt)
- [ ] [multiselect](https://github.com/derhuerst/multiselect-prompt)
- [ ] [number](https://github.com/derhuerst/number-prompt)
- [ ] [range](https://github.com/derhuerst/range-prompt)
- [ ] [select](https://github.com/derhuerst/select-prompt)
- [x] [text](https://github.com/derhuerst/text-prompt)
- [ ] [tree-select](https://github.com/derhuerst/tree-select-prompt)
- [ ] [switch](https://github.com/derhuerst/switch-prompt)
- [x] [autocomplete](https://github.com/derhuerst/cli-autocomplete)
- [x] confirm (based on `inquirer` and using `text`)

here's what we have so far:

### text

```shell
✔ Give your app a name (pythonomorphs-rewinders)
```

```js
{
  name: String,
  message: String,
  default: String // optional
}
```

### confirm

```shell
✔ Continue? (Y/n) … 
```

```js
{
  name: String, // optional
  message: String,
  default: Boolean // optional
}
```

### autocomplete

```shell
? Choose a license: (ISC) › GPL
NGPL
LGPLLR
GPL-1.0
GPL-2.0
GPL-3.0
GPL-2.0+
LGPL-2.1
LGPL-3.0
LGPL-2.0
AGPL-3.0
```

```js
{
  name: String,
  message: String,
  default: String, // optional
  suggest: ({ input, values }, cb) => cb(err, suggestions)
}
```

where `suggestions` is an array of either:

- strings
- objects with `title` and `value` keys

## license

The Apache License

Copyright &copy; 2017 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
