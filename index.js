var fs = require('fs');
var jade = require('jade');

module.exports = function(source, destiny) {
    var sourcePath = source || './report.json';
    var destPath = destiny || './report.html';
    var jsonReport = require(sourcePath);
    var fn = jade.compileFile('./templates/report.jade', {
      pretty: true
    });

    // Render the function
    var html = fn({
      report: jsonReport
    });
    write(destPath, html);
}


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
