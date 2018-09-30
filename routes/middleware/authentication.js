/* eslint-disable */
// passport session check
function sessionCheck(req, res, next){
    // isAuthenticated is added by passport
    if(req.isAuthenticated()){
        return next();
    } else {
        res.status(401).send('authorization failed')
    }
}
module.exports = sessionCheck;
