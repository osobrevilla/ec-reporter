const fs = require('fs');
const jade = require('jade');
const glob = require('glob');
const repConf = require('../../package.json').reporter;

const REG_MATCH_LINES = /@.+\:.+/g;
const REG_MATCH_VALUES = /([\w-_]+)(?:(?:\s+)?\:(?:\s+)?)((?:\s?[\w-_])+)/i;

const fn = jade.compileFile(__dirname + '/templates/report.jade', {
    pretty: true
});

const reporter = function(source, dest) {
    dest   = './report.html' || dest;
    source = './src/views/**/*.jade' || source;
    var views = [],
        files = glob.sync(source);
    if (files)
        files.forEach(function(file) {
            var meta = {},
                lines = (fs.readFileSync(file, {
                    encoding: 'utf-8'
                }).toString().match(REG_MATCH_LINES) ||  []);
            lines.forEach(function(line) {
                var splits = line.match(REG_MATCH_VALUES).slice(1, 4);
                meta[splits[0]] = splits[1];
            });
            views.push(meta);
        });

    write(dest, fn({
        title: repConf.title || "",
        logo:  repConf.logo || "" ,
        views: views
    }));
};

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

module.exports = reporter;
