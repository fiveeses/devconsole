function clog(...args) { return console.log(...args); }

clog.dir = function(...args) { return console.dir(...args) };

export default clog;