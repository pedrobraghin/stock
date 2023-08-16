import { IProduct, IProductQuery, ProductInstance } from '../@types/IProduct';
import { Product } from '../models/Product';
import { NextFunction, Request, Response } from 'express';
import { Op, FindOptions } from 'sequelize';
import {
	IValidUpdate,
	updateProductSchema,
	validateData,
} from '../utils/validators';
import ProductServices from '../services/ProductServices';
('./store-product-service');
import { NotFoundError } from '../errors/NotFoundError';
import { BadRequestError } from '../errors/BadRequestError';

class ProductController {
	async store(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const data: IProduct = req.body;
			const product: ProductInstance = await ProductServices.storeProduct(data);

			return res.status(201).json({
				message: 'Product successfully created',
				data: product,
			});
		} catch (err) {
			return next(err);
		}
	}

	async show(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const product = await ProductServices.showProduct(req.params.id);
			res.status(200).json(product);
		} catch (err) {
			return next(err);
		}
	}

	async update(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const update = await ProductServices.updateProduct(
				req.params.id,
				req.body
			);
			return res.status(200).json({
				message: 'Successfully updated product',
				update,
			});
		} catch (err) {
			return next(err);
		}
	}

	async index(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const query: IProductQuery = req.query;
			const listOfProducts = await ProductServices.listProducts(query);

			res.status(200).json(listOfProducts);
		} catch (err: any) {
			next(err);
			return;
		}
	}

	async delete(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			await ProductServices.deleteProduct(req.params.id);
			return res.status(204).json("OK");
		} catch (err: any) {
			return next(err);
		}
	}

	async getIncomes(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const income = await ProductServices.getSectorIncome(req.query);
			return res.status(200).json(income);
		} catch (err: any) {
			return next(err);
		}
	}
}

export default new ProductController();
