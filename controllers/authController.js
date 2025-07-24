const { adminAuth, adminDB } = require('../config/firebase');
const User = require('../models/User');

const authController = {
  async register(req, res) {
    try {
      const { email, password, name, role = 'customer' } = req.body;

      const userRecord = await adminAuth.createUser({
        email,
        password,
        displayName: name
      });

      const uid = userRecord.uid;

      const userData = { name, email, role };
      await User.create(userData);

      await adminDB.ref(`users/${uid}`).set({
        name,
        email,
        role,
        created_at: new Date().toISOString()
      });

      res.status(201).json({
        message: 'User created successfully',
        user: {
          uid,
          email,
          name,
          role
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ error: error.message });
    }
  },

  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.uid);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ error: 'Failed to get user profile' });
    }
  },

  async updateProfile(req, res) {
    try {
      const { name } = req.body;
      const updatedUser = await User.update(req.user.uid, { name });

      res.json(updatedUser);
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  }
};

module.exports = authController;