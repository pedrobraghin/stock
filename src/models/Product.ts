import Sequelize from 'sequelize';
import { sequelize } from '../database/db';
import { ProductModelDefinition } from '../@types/IProduct';


export const ProductModel = sequelize.define<ProductModelDefinition>('Product', {
	id: {
    type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true,
	},
	name: {
    type: Sequelize.STRING,
		allowNull: false,
	},
	price: {
		type: Sequelize.FLOAT,
		defaultValue: '00.00',
	},
	sector: {
		type: Sequelize.STRING,
    allowNull: false,
	},
	quantity: {
		type: Sequelize.INTEGER,
    allowNull: false,
	},
  total_income: {
    type: Sequelize.FLOAT,
  }
});
