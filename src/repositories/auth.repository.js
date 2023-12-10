import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthRepository {

    static async findUserByEmail(email) {
        return prisma.users.findUnique({ where: { email } });
    }

    static async createUser(email, hashedPassword, name) {
        return prisma.users.create({
            data: { email, password: hashedPassword, name },
        });
    }
};
