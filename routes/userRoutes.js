const express = require('express');
const userController = require('../controllers/userController');
const { authorizeRole } = require('../middleware/auth');
const { validateUserData } = require('../middleware/validation');

const router = express.Router();

// Admin only routes
router.get('/', authorizeRole(['admin']), userController.getAllUsers);
router.get('/:id', authorizeRole(['admin']), userController.getUserById);
router.put('/:id', authorizeRole(['admin']), validateUserData, userController.updateUser);
router.delete('/:id', authorizeRole(['admin']), userController.deleteUser);

module.exports = router;