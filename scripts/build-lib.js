const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const baseDir = path.resolve(path.dirname(__dirname), 'src');

function buildCSS(baseDir) {
  fs.readdir(baseDir, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    var len = files.length;
    for (let i = 0; i < len; i++) {
      const pathFile = path.resolve(baseDir, files[i]);
      if (fs.lstatSync(pathFile).isDirectory()) {
        buildCSS(pathFile);
      } else if (/\.s[ac]ss$/g.test(pathFile)) {
        exec(`node-sass ${pathFile} --output-style compressed`,
          function (err, stdout, stderr) {
            if (err) {
              console.log(err);
            }
            const fileName = `${baseDir}\\${files[i]}`
              .replace('src', 'dist')
              .replace(/\.s[ac]ss$/g, '.css');
            fs.writeFile(fileName,
              stdout, function (err) {
                if (err) throw err;
                console.log('Convert to scss to css done!');
              });
          })
      }
    }
  });
};

(function build() {
  exec('babel src --out-dir dist --ignore __tests__,**/index.dev.js', function (err) {
    if (err) throw err;
    console.log('Build JS done!');
    buildCSS(baseDir);
  })
})();
