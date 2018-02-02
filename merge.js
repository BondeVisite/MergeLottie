var jsonfile = require('jsonfile')
var fs = require('fs');
var copy = require('copy');

var dirname = './animations/';
var outputfolder = './mergelotties/';
var outputjson = outputfolder + '/lotties.json';
var outputimages = outputfolder + '/images/';

mergeLottieJson(dirname, outputjson);

function mergeLottieJson (dirname, output, callback) {
  var bigjson = {};
  fs.readdir(dirname, function(err, list) {
    dirname = fs.realpathSync(dirname);
    if (err) return console.error(err);
    var listlength = list.length;
    var count = 0;
    list.forEach(function(folder) {
      var folderpath = dirname + '/' + folder;
      var json = folderpath + '/data.json';
      var images = folderpath+'/images/';
      jsonfile.readFile(json, function(err, obj) {
        if (err) return console.error(err);
        bigjson[folder] = obj;
        copyImagesAnim(images);
        count++;
        if (count == listlength) createOutput(bigjson, output);
      });
    });
  });
}

function copyImagesAnim (path) {
  console.log(path+'*.png');
  copy(path+'*.png', outputimages, function(err, files) {
    if (err) return console.error(err);
  });
}

function createOutput (bigjson, output) {
  jsonfile.writeFile(output, bigjson, function (err) {
    if (err) return console.error(err);
  });
}
