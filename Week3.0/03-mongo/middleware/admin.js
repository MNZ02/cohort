const { Admin } = require("../db");

// Middleware for handling admin auth
async function adminMiddleware(req, res, next) {
  try {
    const { username, password } = req.headers;

    // Check if username and password headers are present
    if (!username || !password) {
      return res.status(400).send('Missing username or password');
    }

    // Find the admin in the database
    const admin = await Admin.findOne({ username, password });

    // If admin not found, respond with 403
    if (!admin) {
      return res.status(403).send('Invalid admin credentials');
    }

    // Call next middleware if admin is authenticated
    next();
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    res.status(500).send('Internal server error');
  }
}

module.exports = adminMiddleware;

