var Twitter = require('../twitter');

var twitterClient = new Twitter(
  'CONSUMER_KEY',
  'CONSUMER_SECRET',
  'TOKEN',
  'TOKEN_SECRET'
);

twitterClient.tweet('hello world', function (err, data) {
  console.log('Twitter responded', data);
})
