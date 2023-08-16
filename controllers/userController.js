const User = require('../models/User');
const { hashPassword } = require('../utils/passwordUtils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET ='dfbewjonfcdjodnfioweiopjewopjddebdkjew';
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password,} = req.body;

    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    } 
      // Hash the password
      const hashedPassword = await hashPassword(req.body.password);
          
    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    // Save user to database
    await user.save();

    res.json({name,email, password});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


// const isAdminOrAuthenticatedMiddleware = async (req, res, next) => {
//   const { email } = req.body;

//   try {
//     // Check if the request contains a valid admin token
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
//       const aToken = req.headers.authorization.split(' ')[1];
//       const decodedToken = jwt.verify(aToken, JWT_SECRET);

//       // If the token is valid and the user is already authenticated, proceed with the login
//       if (decodedToken) {
//         return next();
//       }
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     if (user.role !== 'admin') {
//       return res.status(403).json({ message: 'You are not authorized to access this resource' });
//     }

//     // If the user is an admin, store the user object in the request for further use
//     req.adminUser = user;
//     next();
//   } catch (error) {
//     console.error('Error while checking admin status:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // For Admin login
// exports.loginUser = ( isAdminOrAuthenticatedMiddleware, async (req, res) => {
//   const {email, password } = req.body;
//   const user = req.adminUser;

//   try {
//     // Check if the request contains a valid admin token
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
//       const aToken = req.headers.authorization.split(' ')[1];
//       const decodedToken = jwt.verify(aToken, JWT_SECRET);

//       // If the token is valid and the user is already authenticated, use it for authentication
//       if (decodedToken) {
//         const aToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '6h' });
//         return res.json({ aToken });
//       }
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '6h' });

//     res.json({ token });
//   } catch (error) {
//     console.error('Error while logging in:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


const isAdminOrAuthenticatedMiddleware = async (req, res, next) => {
    const { email } = req.body;
  
    try {
      // Check if the request contains a valid admin token
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        const aToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(aToken, JWT_SECRET);
  
        // If the token is valid and the user is already authenticated, proceed with the login
        if (decodedToken) {
          return next();
        }
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to access this resource' });
      }
  
      // If the user is an admin, store the user object in the request for further use
      req.adminUser = user;
      next();
    } catch (error) {
      console.error('Error while checking admin status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '6h' });
  
      res.json({ token });
    } catch (error) {
      console.error('Error while logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  