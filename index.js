var jade = require("jade");
var jsonReport = require('../../report.json');
var fn = jade.compileFile('./templates/report.jade', {
  pretty: true
});

// Render the function
var html = fn(jsonReport);

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
