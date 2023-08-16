import { randomUUID } from 'crypto'
import { ICreateProduct, Product } from '../../src/@types/IProduct'
import { ProductRepository } from '../../src/repositories/ProductRepository';
import { ProductServices } from '../../src/services/ProductServices';

jest.mock('sequelize')

describe('ProductService', () => {
  let productService: ProductServices;

  beforeEach(() => {
    productService = new ProductServices();
  });

  it('should be able to create a product', async () => {
    const productDto: ICreateProduct = {
      name: 'Biscoito maizena',
      price: 1.99,
      quantity: 100,
      sector: '3',
    }

    const repositorySpy = jest.spyOn(ProductRepository.prototype, 'create').mockImplementationOnce(async (data) => {
      return {
        ...data,
        id: randomUUID(),
        total_income: data.price * data.quantity,
      }
    });

    jest.spyOn(ProductRepository.prototype, 'findOne').mockImplementationOnce(async () => null);

    const product = await productService.storeProduct(productDto);
    expect(repositorySpy).toHaveBeenCalledTimes(1);
    expect(product.name).toEqual(productDto.name);
    expect(product).toHaveProperty('id');

  })
})