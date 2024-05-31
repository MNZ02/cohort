const secret = 'Thisisasecret';
const jwt = require('jsonwebtoken')
function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const words = token.split(" ");
  const jwtToken = words[1];


  try {
    const decodedValue = jwt.verify(jwtToken, secret)
    if (decodedValue.username) {
      next()
    }
    else {
      res.status(403).send('You are not authorized')
    }
  } catch (error) {
    console.error('Error during authorization', error.message)
  }

}

module.exports = userMiddleware;
