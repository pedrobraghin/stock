import { ICreateProduct } from "../../src/@types/IProduct";
import { createProductSchema, updateProductSchema, validateData } from "../../src/utils/validators";
import { describe, expect, it } from "@jest/globals";

describe("Product validation", () => {
  describe("Create Product", () => {
    it("should validate create product input data", async () => {
      const data: ICreateProduct = {
        name: "Test Product",
        sector: "1",
        price: 11,
        quantity: 11,
      };
  
      const validation = await validateData(createProductSchema, data);
  
      expect(validation.data).toEqual(data);
      expect(validation.errors).toHaveLength(0);
      expect(validation.error).toBe(false);
    });
  
    it("should not allow extra fields from input data", async () => {
      const data = {
        name: "Test Product",
        sector: "1",
        price: 11,
        quantity: 11,
        local: "Rio de Janeiro"
      };
  
      const validation = await validateData(createProductSchema, data);
  
      expect(validation.data).not.toHaveProperty('local');
    }) 
  
    it("should not accept wrong data type", async () => {
      const data = {
        name: 16,
        sector: 1,
        price: "11",
        quantity: "11"
      };
  
      const validation = await validateData(createProductSchema, data as any);
  
      expect(validation.error).toBe(true)
    })

    it("should return an error when number input is less than 1 or greater than 5000", async () => {
      const data: ICreateProduct = {
        name: "Test Product",
        sector: "1",
        price: 0,
        quantity: 5001
      }
      const validation = await validateData(createProductSchema, data) 

      expect(validation.error).toBe(true)
    })

    it("should return an error when string input length is greater than 60", async () => {
      const data: ICreateProduct = {
        name: "1234567890123456789012345678901234567890123456789012345678901234567890",
        sector: "1",
        price: 2,
        quantity: 100
      }
      const validation = await validateData(createProductSchema, data) 

      expect(validation.error).toBe(true)
    })
  })
  
  describe("Update Product", () => {
    it("should update product input data", async () => {
      const data = {
        name: "Test Product",
        sector: "1",
        price: 11,
        quantity: 11,
      }

      const validation = await validateData(updateProductSchema, data)

      expect(validation.data).toEqual(data)
      expect(validation.errors).toHaveLength(0)
      expect(validation.error).toBe(false)
    })

    it("should not allow extra fields from input data", async () => {
      const data = {
        name: "Test Product",
        sector: "1",
        price: 11,
        quantity: 11,
        local: "Rio de Janeiro"
      };
  
      const validation = await validateData(updateProductSchema, data);
  
      expect(validation.data).not.toHaveProperty('local');
    })

    it("should not accept wrong data type", async () => {
      const data = {
        name: 16,
        sector: 1,
        price: "11",
        quantity: "11"
      };
  
      const validation = await validateData(updateProductSchema, data as any);
  
      expect(validation.error).toBe(true)
    })
  })
});

