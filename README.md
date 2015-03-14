# upyun-hopper
[![NPM version](https://img.shields.io/npm/v/upyun-hopper.svg?style=flat)](https://www.npmjs.org/package/upyun-hopper)

grab a bunch of images into upyun bucket

## Installation

```bash
$ npm install upyun-hopper
```

## Usage
```js
hopper(imgs, config, callback)
```
__Arguments__

* `imgs`: image urls list to fetch
* `config`: config of upyun
    * `bucket`: upyun bucket name
    * `operator`: upyun bucket's operator name
    * `password`: password for operator
    * `path`: where the files should be upload to
* `callback`: it will comes with two arguments
    * first: `err`: for catch the error
    * second: `result`: an array contains the urls of the image which has been uploaded to upyun bucket

## Example
```js
var hopper = require('upyun-hopper');

var config = {
    bucket: 'lisposter',
    operator: 'lisposter',
    password: 'test2014',
    path: 'hopper'
};

var imgs = [
    'https://www.google.com/images/srpr/logo11w.png', 
    'http://img.hb.aicdn.com/105e70e100ada370b94c066683996d262d649aac6ec31-rkKO0b_fw658', 
    'http://img.hb.aicdn.com/0cb2f6a5401e75769f63653c28c49897c2397d2c1fe5f-1uSaMq_fw658'
];

hopper(imgs, config, function(err, result) {
    console.log(result);
});
```

## License

MIT © [Leigh Zhu](#)
