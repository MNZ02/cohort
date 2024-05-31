// Middleware for handling auth
const secret = 'Thisisasecret'
const jwt = require('jsonwebtoken')
function adminMiddleware(req, res, next) {
  const token = req.headers.authorization
  const words = token.split(" ");
  const jwtToken = words[1]

  try {
    const decodedValue = jwt.verify(jwtToken, secret);

    if (decodedValue.username) {
      next();
    }
    else {
      res.status(403).json({ message: 'You are not authorised' })
    }
  } catch (error) {
    console.error('Incorrect inputs', error.message)
  }
}

module.exports = adminMiddleware;
