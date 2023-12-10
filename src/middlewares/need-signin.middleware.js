import jwt from 'jsonwebtoken';
import { JWT_ACCESS_TOKEN_SECRET } from '../constants/security.constant.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(400).json({
                success: false,
                message: '인증 정보가 없습니다.',
            });
        }
        const [tokenType, accessToken] = authorizationHeader.split(' ');

        if (tokenType !== 'Bearer') {
            return res.status(400).json({
                success: false,
                message: '지원하지 않는 인증 방식입니다.',
            });
        }

        if (!accessToken) {
            return res.status(400).json({
                success: false,
                message: 'AccessToken이 없습니다.',
            });
        }

        const { userId } = jwt.verify(accessToken, JWT_ACCESS_TOKEN_SECRET);
        prisma.users.findFirst({ where: { id: userId } }).then(user => {
            req.user = user;

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: '존재하지 않는 사용자입니다.',
                });
            }

            req.user = user;
            next();
        });



    } catch (error) {
        // 검증에 실패한 경우
        console.error(error);

        let statusCode = 500;
        let errorMessage = '';

        switch (error.message) {
            case 'jwt expired':
                statusCode = 401;
                errorMessage = '인증 정보 유효기간이 지났습니다.';
                break;
            case 'invalid signature':
                statusCode = 401;
                errorMessage = '유효하지 않는 인증 정보입니다.';
                break;
            default:
                statusCode = 500;
                errorMessage =
                    '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.';
                break;
        }

        return res.status(statusCode).json({
            success: false,
            message: errorMessage,
        });
    }
};
