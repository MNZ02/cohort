const { User } = require("../db");

// Middleware for handling user auth
async function userMiddleware(req, res, next) {
  try {
    const { username, password } = req.headers;

    // Check if username and password headers are present
    if (!username || !password) {
      return res.status(400).send('Missing username or password');
    }

    // Find the user in the database
    const user = await User.findOne({ username, password });

    // If user not found, respond with 403
    if (!user) {
      return res.status(403).send('Invalid user credentials');
    }

    // Call next middleware if user is authenticated
    next();
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    res.status(500).send('Internal server error');
  }
}

module.exports = userMiddleware;

