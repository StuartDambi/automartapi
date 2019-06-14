import express from 'express';
import auth from '../middleware/auth';
import userController from '../controllers/userController';

const router = express.Router();

// User can signup to the system
router.post('/signup', auth.validateUserData, userController.signUp);
module.exports = router;
