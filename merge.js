var jsonfile = require('jsonfile')
var fs = require('fs');
var path = require('path');
var copy = require('copy');

var dirname = './animations/';
var outputfolder = './mergelotties/';
var outputjson = outputfolder + '/lotties.json';
var outputimages = outputfolder + '/images/';

var onlineurl = 'https:\/\/asset.bondevisite.fr\/animation\/mergelotties\/images\/';

mergeLottieJson(dirname, outputjson);

function mergeLottieJson (dirname, output, callback) {
  var bigjson = {};
  emptyFolder(outputimages);
  fs.readdir(dirname, function(err, list) {
    dirname = fs.realpathSync(dirname);
    if (err) return console.error(err);
    var listlength = list.length;
    var count = 0;
    list.forEach(function(folder) {
      var folderpath = dirname + '/' + folder;
      var json = folderpath + '/data.json';
      var images = folderpath + '/images/';
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
  copy(path+'*.png', outputimages, function(err, files) {
    if (err) return console.error(err);
  });
}

function createOutput (bigjson, output) {
  jsonfile.writeFile(output, bigjson, function (err) {
    if (err) return console.error(err);
    //// REPLACE IMAGE LINKS
    fs.readFile(output, 'utf8', function (err, data) {
      if (err) return console.log(err);
      var result = data.replace(/images\//g, onlineurl);

      fs.writeFile(output, result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
  });
}

function emptyFolder (directory) {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
}
