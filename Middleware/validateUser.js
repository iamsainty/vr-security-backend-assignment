const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY || "secret-key";

const validateUser = (req, res, next) => {
  try {
    // get the token from the req.header to verify
    const token = req.header('token');    

    // check if there is a token
    if(!token) {
        return res.json({verified : false, message : 'No token provided'});
    }

    // verify the token
    const decoded = jwt.verify(token, secretKey);

    // get the role and id of the user, role means whether it is Admin, Moderator or User
    const role = decoded.role;
    const _id = decoded.id;    

    // set the role and id in the req.user object
    req.user = {role, _id};

    // call the next middleware to move forward
    next();
  } catch (error) {
    console.log('Error validating user:', error);
  }
};

module.exports = validateUser;