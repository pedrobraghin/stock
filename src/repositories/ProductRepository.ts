import { FindOptions, Op } from 'sequelize';
import { IProductCreation, IUpdateProduct, Product, IProductQuery } from '../@types/IProduct';
import { ProductModel } from '../models/Product';

export class ProductRepository {
  async create(data: IProductCreation): Promise<Product> {
    const product = await ProductModel.create(data);
    return product.dataValues;
  }

  async findOne(query: IProductQuery): Promise<Product | null> {
    const product = await ProductModel.findOne({ where: {
      ...query
    } });
    return product?.dataValues || null;
  }

  async findById(id: string): Promise<Product | null> {
    const product = await ProductModel.findByPk(id);
    return product?.dataValues || null;
  }

  async list(userQuery: IProductQuery): Promise<Product[]> {
    const query: IProductQuery = {
			name: userQuery.name ? `%${userQuery.name}%` : '',
			price: userQuery.price ? Number(userQuery.price) : undefined,
			sector: userQuery.sector ? `${userQuery.sector}` : '',
		};

		const whereConditions: FindOptions['where'] = {};

		if (query.name) {
			whereConditions.name = {
				[Op.like]: query.name,
			};
		}
		if (query.price) {
			whereConditions.price = {
				[Op.lte]: query.price,
			};
		}
		if (query.sector) {
			whereConditions.sector = {
				[Op.like]: query.sector,
			};
		}

    const products = await ProductModel.findAll({ where: {
      ...query
    }})

    const productsData = products.map(p => p.dataValues);

    return productsData;
  }

  async update(id: string, data: IUpdateProduct):Promise<Product | null> {
    const product = await ProductModel.findByPk(id);

    if (!product) return null;

    const udpated= await product.update({
      ...data
    });

    return udpated.dataValues;
  }

  async delete(id: string): Promise<Product | null> {
    const product = await ProductModel.findByPk(id);

    if (!product) return null;

    await product.destroy();

    return product.dataValues;
  }
}

export default new ProductRepository();