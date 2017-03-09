var path = require('path');

function root(__path) {
    return path.join(__dirname, __path);
}

exports.root = root;