import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductsRepository {

    createProduct = async (title, description, userId) => {
        return prisma.products.create({
            data: { title, description, userId },
        });
    };

    getProducts = async (sort) => {
        return prisma.products.findMany({
            attributes: [
                'id',
                'title',
                'description',
                'status',
                'userId',
                { 'user.name': 'userName' },
                'createdAt',
                'updatedAt',
            ],
            order: [['createdAt', sort.toUpperCase()]],
            include: { user: { select: { name: true } } },
        });
    };

    getProductById = async (productId) => {
        return prisma.products.findUnique({
            where: { id: productId },
            attributes: [
                'id',
                'title',
                'description',
                'status',
                'userId',
                { 'user.name': 'userName' },
                'createdAt',
                'updatedAt',
            ],
            include: { user: { select: { name: true } } },
        });
    };

    updateProduct = async (productId, title, description, status) => {
        return prisma.products.update({
            where: { id: productId },
            data: {
                ...(title && { title }),
                ...(description && { description }),
                ...(status && { status }),
            },
            attributes: [
                'id',
                'title',
                'description',
                'status',
                'userId',
                { 'user.name': 'userName' },
                'createdAt',
                'updatedAt',
            ],
            include: { user: { select: { name: true } } },
        });
    };

    deleteProduct = async (productId) => {
        return prisma.products.delete({
            where: { id: productId },
            attributes: [
                'id',
                'title',
                'description',
                'status',
                'userId',
                { 'user.name': 'userName' },
                'createdAt',
                'updatedAt',
            ],
            include: { user: { select: { name: true } } },
        });
    };

};
