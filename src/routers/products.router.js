import express from 'express';
import needSignin from '../middlewares/need-signin.middleware.js';
import { ProductsController } from '../controllers/products.controller.js';

const router = express.Router();

const productsController = new ProductsController()

// 생성
router.post('/products', needSignin, productsController.createProductController);

// 목록 조회
router.get('/products', productsController.getProductsController);

// 상세 조회
router.get('/products/:productId', productsController.getProductByIdController);

// 수정
router.put('/products/:productId', needSignin, productsController.updateProductController);

// 삭제
router.delete('/products/:productId', needSignin, productsController.deleteProductController);

export default router;
