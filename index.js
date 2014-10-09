'use strict';
var path = require('path');

var sign = require('upyun-http-signature');
var async = require('async');
var request = require('request');

module.exports = function(list, config, callback) {
    if(list.length <= 0) {
        callback('no job to do');
    }

    async.eachLimit(list, 20, function(item, callback) {
        request.head(item, function(err, res, body) {
            var length = res.headers['content-length'];
            var date = new Date().toGMTString();

            //request options
            var options = {
                url: 'http://v0.api.upyun.com/',
                headers: {
                    'User-Agent': 'UPYUN-Hopper',
                    'Mkdir': true
                }
            };

            options.headers.Authorization = sign('PUT', path.join(config.bucket, config.path || '', path.basename(item)), date, length, config.password, config.operator);
            options.headers.Date = date;
            options.url = options.url + path.join(config.bucket, config.path || '', path.basename(item));

            request.get(item).pipe(request.put(options, function(err, res, body) {
                if (err) {
                    callback(err);
                }
                callback(null);
            }));

        });
    }, function(err) {
        if(err) {
            callback(err);
        }

        var result = list.map(function(item) {
            return path.join('http://' + config.bucket + '.b0.upaiyun.com/', config.path, path.basename(item));
        });
        callback(null, result);
    });
};


