import {
  Model,
} from "sequelize";

export interface ICreateProduct {
  name: string;
  price: number;
  sector: string;
  quantity: number;
};

export interface IProductQuery {
  name?: string;
  price?: number;
  sector?: string | number;
}

export interface IProductCreation extends ICreateProduct{
  id: string;
  total_income: number;
}

export class ProductModelDefinition extends Model<ICreateProduct & IProductCreation, IProductCreation> {}

export interface Product extends IProductCreation {}

export interface IProductQuery {
  id?: string;
  name?: string;
  sector?: string | number;
  price?: number;
}

export interface IUpdateProduct {
  name?: string;
  price?: number;
  sector?: string;
  total_income?: number;
  quantity?: number;
}