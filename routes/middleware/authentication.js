function sessionCheck(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401);
    res.send('authorisation failed');
  }
}
module.exports = sessionCheck;
