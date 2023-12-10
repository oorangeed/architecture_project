
import { AuthService } from '../services/auth.service.js';

export class AuthController {

    authService = new AuthService();

    signUp = async (req, res) => {
        try {
            const { email, password, passwordConfirm, name } = req.body;
            const newUser = await this.authService.signUp(email, password, passwordConfirm, name);

            return res.status(201).json({
                success: true,
                message: '회원가입에 성공했습니다.',
                data: newUser,
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    };

    signIn = async (req, res) => {
        try {
            const { email, password } = req.body;
            const accessToken = await this.authService.signIn(email, password);

            return res.status(200).json({
                success: true,
                message: '로그인에 성공했습니다.',
                data: { accessToken },
            });
        } catch (error) {
            console.error(error);
            return res.status(401).json({
                success: false,
                message: error.message,
            });
        }
    };
};