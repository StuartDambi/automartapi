import express from 'express';
import userController from '../controllers/userController';
import auth from '../middleware/auth';

const router = express.Router();

// User can signup to the system
router.post('/signup', auth.validateUserData, userController.signUp);

// User can signin to the system
router.post('/signin', userController.signIn);
module.exports = router;
