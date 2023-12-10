import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserById = async (userId) => {
    return prisma.users.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
    });
};
