import users from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
 
    try {
      console.log('Incoming registration request:', req.body);
      const { username, email, password } = req.body;
  
      const existingUser = await users.findOne({ email });
      if (existingUser) {
        console.log('User already exists');
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
      console.log('Password hashed successfully');
  
      const newUser = new users({ username, email, password: hashedPassword });
      await newUser.save();
  
      console.log('User registered successfully');
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during user registration:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
// Log in a user

  export const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body; 
      // console.log("Received data from client:", { username, password });
      const user = await users.findOne({ username });
      //  console.log("User found in DB:", user);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isMatch = await user.matchPassword(password);
      // console.log(isMatch)
      if (isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
     
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "5D" });
     

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
// Get user profile
export const getUser = async (req, res) => {
  try {
    const user = await user.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default { registerUser, loginUser, getUser };
