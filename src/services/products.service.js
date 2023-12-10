import { ProductsRepository } from '../repositories/products.repository.js';

export class ProductsService {
    productsService = new ProductsRepository();

    createProductService = async (userId, title, description) => {
        return createProduct(title, description, userId);
    };

    getProductsService = async (sort) => {
        return getProducts(sort);
    };

    getProductByIdService = async (productId) => {
        return getProductById(productId);
    };

    updateProductService = async (productId, userId, title, description, status) => {
        return updateProduct(productId, title, description, status);
    };

    deleteProductService = async (productId, userId) => {
        return deleteProduct(productId);
    };
};
