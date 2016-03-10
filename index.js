var fs = require('fs');
var program = require('commander');
var jade = require('jade');
var pkg = require('./package.json');
var version = pkg.version;

program
    .version(version)
    .usage('[options] [file]')
    .parse(process.argv);

var sourcePath = program.args.shift() || './report.json';
var jsonReport = require(sourcePath);

var fn = jade.compileFile('./templates/report.jade', {
  pretty: true
});

// Render the function
var html = fn({
  report: jsonReport
});

write('./report.html', html);

/**
 * echo str > path.
 *
 * @param {String} path
 * @param {String} str
 */

function write(path, str, mode) {
    fs.writeFileSync(path, str, {
        mode: mode || 0666
    });
    console.log('   \x1b[36mcreate\x1b[0m : ' + path);
}
