const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/', auth, userController.list);
router.get('/:id', auth, userController.getUser);
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;
