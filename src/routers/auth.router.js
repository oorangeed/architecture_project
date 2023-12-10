import express from 'express';
const router = express.Router();
import { AuthController } from '../controllers/auth.controller.js';
import { deflate } from 'zlib';

const authController = new AuthController();

// 회원가입
router.post('/signup', authController.signUp);

// 로그인
router.post('/signin', authController.signIn);

export default router;