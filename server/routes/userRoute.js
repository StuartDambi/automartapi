import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

// User can signup to the system
router.post('/signup', userController.signUp);

// User can signin to the system

module.exports = router;
