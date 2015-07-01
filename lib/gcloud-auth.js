var fs = require('fs');

var config = JSON.parse(fs.readFileSync('/Users/peihsinsu/.config/gcloud/credentials'));

config.data.forEach(function(v) {
  console.log(v.key.account);
});

