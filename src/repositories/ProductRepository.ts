import { FindOptions, Op } from 'sequelize';
import { IProductCreation, IUpdateProduct, ProductInstance, IProductQuery } from '../@types/IProduct';
import { Product } from '../models/Product';

export class ProductRepository {
  async create(data: IProductCreation): Promise<ProductInstance> {
    const product = await Product.create(data);
    return product;
  }

  async findOne(query: IProductQuery): Promise<ProductInstance | null> {
    const product = await Product.findOne({ where: {
      ...query
    } });
    return product;
  }

  async findById(id: string): Promise<ProductInstance | null> {
    const product = await Product.findByPk(id);
    return product;
  }

  async list(userQuery: IProductQuery): Promise<ProductInstance[]> {
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

    const products = await Product.findAll({ where: {
      ...query
    }})

    return products;
  }

  async update(id: string, data: IUpdateProduct):Promise<ProductInstance | null> {
    const product = await Product.findByPk(id);

    if (!product) return null;

    const udpated= await product.update({
      ...data
    });

    return udpated;
  }

  async delete(id: string): Promise<ProductInstance | null> {
    const product = await Product.findByPk(id);

    if (!product) return null;

    await product.destroy();

    return product;
  }
}

export default new ProductRepository();