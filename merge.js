var jsonfile = require('jsonfile')
var fs = require('fs');

var dirname = './animations/';
var output = './bigjson.json';
mergeLottieJson(dirname, output);

function mergeLottieJson (dirname, output, callback) {
  var bigjson = {};
  fs.readdir(dirname, function(err, list) {
    dirname = fs.realpathSync(dirname);
    if (err) return console.error(err);
    var listlength = list.length;
    var count = 0;
    list.forEach(function(folder) {
      folderpath = dirname + '\\' + folder;
      json = folderpath+'\\data.json';
      jsonfile.readFile(json, function(err, obj) {
        if (err) return console.error(err);
        bigjson[folder] = obj;
        count++;
        if (count == listlength) createOutput(bigjson, output);
      });
    });
  });
}

function createOutput (bigjson, output) {
  jsonfile.writeFile(output, bigjson, function (err) {
    if (err) return console.error(err);
  });
}
