import { ProductsService } from '../services/products.service.js';

export class ProductsController {

    // productsController = new ProductsController();

    createProductController = async (req, res) => {
        try {
            const { id: userId } = res.locals.user;
            const { title, description } = req.body;
            const product = await ProductsService.createProductService(userId, title, description);

            return res.status(201).json({
                success: true,
                message: '상품 생성에 성공했습니다.',
                data: { ...product, userName: res.locals.user.name },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
            });
        }
    };

    getProductsController = async (req, res) => {
        try {
            const { sort } = req.query;
            const products = await ProductsService.getProductsService(sort);

            return res.status(200).json({
                success: true,
                message: '상품 목록 조회에 성공했습니다.',
                data: products,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
            });
        }
    };

    getProductByIdController = async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await ProductsService.getProductByIdService(productId);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: '상품 조회에 실패했습니다.',
                });
            }

            return res.status(200).json({
                success: true,
                message: '상품 목록 조회에 성공했습니다.',
                data: product,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
            });
        }
    };

    updateProductController = async (req, res) => {
        try {
            const { productId } = req.params;
            const { title, description, status } = req.body;
            const { id: userId } = res.locals.user;
            const updatedProduct = await ProductsService.updateProductService(productId, userId, title, description, status);

            return res.status(200).json({
                success: true,
                message: '상품 수정에 성공했습니다.',
                data: updatedProduct,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
            });
        }
    };

    deleteProductController = async (req, res) => {
        try {
            const { productId } = req.params;
            const { id: userId } = res.locals.user;
            const deletedProduct = await ProductsService.deleteProductService(productId, userId);

            return res.status(200).json({
                success: true,
                message: '상품 삭제에 성공했습니다.',
                data: deletedProduct,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
            });
        }
    };

}