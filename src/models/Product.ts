import Sequelize from 'sequelize';
import { sequelize } from '../database/db';
import { ProductInstance } from '../@types/IProduct';


export const Product = sequelize.define<ProductInstance>('Product', {
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
