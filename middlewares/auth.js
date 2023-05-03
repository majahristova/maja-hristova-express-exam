const auth = function isAuthenticated(req, res, next) {
    if (req.session.authenticated && req.session.username) {
      req.isAuthenticated = true;
    } else {
      req.isAuthenticated = false;
    }
    next();
}

module.exports = auth;