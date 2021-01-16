# DSNET API 🌆

> A simple wrapper for AGH University of Science and Technology Dormitories API.

[![install size](https://packagephobia.com/badge?p=dsnet)](https://packagephobia.com/result?p=dsnet)

## Highlights
* Well [documented](https://pcktm.github.io/dsnet/classes/index.default.html) (unlike the DSNET API itself - yeah, I'm lookin' at ya DSNET.)
* Easy to use, asynchronous API
* Full API coverage
* Super lightweight
* Written and typed in TypeScript


## Install

```
$ npm install dsnet

```

## Usage

```js
import DSNET from 'dsnet';

const api = new DSNET('OAUTH2_TOKEN');

(async () => {
	
	const userInfo = await api.getUserInfo();

})();

```

