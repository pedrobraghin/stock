import {
	object,
	string,
	number,
	ObjectSchema,
	setLocale,
	AnyObjectSchema,
	ValidationError,
} from 'yup';

export interface IValidProduct {
	name: string;
	quantity: number;
	price: number;
	sector: string;
}

interface ValidResponse<T> {
	data: T;
	error: boolean;
	errors: Array<string>;
}

export interface IValidUpdate extends Partial<Omit<IValidProduct, 'id'>> {}

setLocale({
	mixed: {
		default: 'Product is invalid',
	},
	number: {
		min: ({ path }) => `${path} Must have more than 1`,
	},
	string: {
		min: 'Please insert at least one character',
		max: ({ path, max }) => `${path} Cannot be more than ${max}`,
	},
});

export const createProductSchema: ObjectSchema<IValidProduct> = object({
	name: string().min(1).max(60).required().strict(),
	quantity: number().min(1).max(5000).required().strict(),
	price: number().min(1).max(10000).required().strict(),
	sector: string()
		.min(0)
		.max(3)
		.required()
		.matches(/^\d+$/, 'Please enter only numbers').strict(),
});

export const updateProductSchema: ObjectSchema<IValidUpdate> = object({
	name: string().min(1).max(60).strict(),
	quantity: number().min(1).max(5000).strict(),
	price: number().min(1).max(10000).strict(),
	sector: string()
		.min(0)
		.max(3)
		.matches(/^\d{1,3}$/, 'Please enter only numbers').strict(),
});

export async function validateData<T>(
	schema: AnyObjectSchema,
	data: T
): Promise<ValidResponse<T>> {
	try {
		const parsedData = await schema.validate(data, {
			strict: false,
			stripUnknown: true,
			abortEarly: false,
		});
		return { data: parsedData, error: false, errors: [] };
	} catch (err: any) {
		let errors: string[] = [];

		if (err instanceof ValidationError) {
			errors = err.errors;
		}

		return { data, error: true, errors };
	}
}
