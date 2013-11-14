var helpers = {
  encodePath: function (path) {
    path = path || '';
    return path.replace(/\//gi, '-_-');
  }
};

module.exports = helpers;