<h1 align="center">Stock API</h1>

## Project Description
<p>📦 An API that store products from a "storage"</p>

## Content Table
- [Project Description](#project-description)
- [Project Status](#project-status)
 - [Features](#features)
 - [Requirements](#requirements)
- [Installation](#installation)
 - [Install dependencies](#install-dependencies)
 - [Run the application](#run-the-application)
 - [Technologies](#technologies)

### Project Status
<h4>🚧 In Progress 🚧</h4>

### Features
- [x] Register product
- [x] Update product
- [x] Delete product
- [x] Show individual/all products
- [x] Get income from sector

### Requirements
Before running, you will need to install [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/)

## Installation

### Clone this repository

```
git clone "https://github.com/victorzix/stock"
cd [FOLDER NAME]
cd backend
```

### Install dependencies

```
npm install
```

### Run the application

```
npm run dev
```

### Technologies
The following technologies were used to build this project:

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [ExpressJs](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [Postgres](https://www.postgresql.org/)
  

# Endpoints
- # Store
  `POST /products`
  ## Request example
  ```json
  {
    "name": "Cookie",
    "sector": "1",
    "price": 5,
    "quantity": 300
  }
  ```
  
  ## Response example
  `201 Created`
  ```json
  "message": "Product successfully created",
	"data": {
		"name": "aasasd",
		"sector": "2",
		"price": 3,
		"quantity": 2,
		"id": "7778a889",
		"total_income": 6,
		"updatedAt": "2023-08-11T11:46:01.159Z",
		"createdAt": "2023-08-11T11:46:01.159Z"
	}
  ```

  `400 Bad Request`
  ```json
  "Validation error: ${path} is a required field"
  ```

  ```json
  "Product already exists"
  ```

- # Index
  `GET /products`
  ## Request example
  ```
  // can be null or send a query string
  ```
  
  ## Response example
  `200 OK`
  ```json
  {
		"id": "66955f2a",
		"name": "a",
		"price": 1,
		"sector": "132",
		"quantity": 1,
		"total_income": 1,
		"createdAt": "2023-08-10T14:57:14.000Z",
		"updatedAt": "2023-08-10T14:57:14.000Z"
	},
	{
		"id": "7778a889",
		"name": "aasasd",
		"price": 3,
		"sector": "2",
		"quantity": 2,
		"total_income": 6,
		"createdAt": "2023-08-11T11:46:01.000Z",
		"updatedAt": "2023-08-11T11:46:01.000Z"
	},
	{
		"id": "9121a1e7",
		"name": "fg",
		"price": 1,
		"sector": "132",
		"quantity": 4,
		"total_income": 4,
		"createdAt": "2023-08-10T14:31:05.000Z",
		"updatedAt": "2023-08-10T14:31:05.000Z"
	}
  ```

- # Show
  `GET /products/product/:id`
  ## Request example
  ```
  // send id in params
  ```
  
  ## Response example
  `200 OK`
  ```json
  {
	"id": "66955f2a",
	"name": "a",
	"price": 1,
	"sector": "132",
	"quantity": 1,
	"total_income": 1,
	"createdAt": "2023-08-10T14:57:14.000Z",
	"updatedAt": "2023-08-10T14:57:14.000Z"
  }
  ```

  `404 Not Found`

  ```json
  "Product not found"
  ```

  ```json
  {
	"statusCode": 404,
	"message": "Cannot find this route"
  }
  ```

- # Get Incomes
  `GET /products/income/`
  ## Request example
  ```
  // send a sector in query
  ```
  
  ## Response example
  `200 OK`
  ```json
  12
  ```

  `404 Not Found`

  ```json
  "This sector is not registered"
  ```

  `400 Bad Request`

  ```json
  "Please provide a sector"
  ```

- # Update
  `PATCH /products/:id`
  ## Request example
  ```json
  {
	"name": "aa",
	"price": 6,
	"quantity": 2
  }
  ```
  
  ## Response example
  `200 OK`
  ```json
  {
	"message": "Successfully updated product",
	"update": {
		"id": "66955f2a",
		"name": "a",
		"price": 6,
		"sector": "132",
		"quantity": 1,
		"total_income": 6,
		"createdAt": "2023-08-10T14:57:14.000Z",
		"updatedAt": "2023-08-11T13:19:33.310Z"
	}
  }
  ```

  `404 Not Found`

  ```json
  "Product not found"
  ```
  ```json
  {
	"statusCode": 404,
	"message": "Cannot find this route"
  }
  ```

  `400 Bad Request`

  ```json
  "Product Name already registered"
  ```
  ```json
  "Validation error: price must be a `number` type, but the final value was: `NaN` (cast from the value `\"a\"`)."
  ```

- # Delete
  `DELETE /products/:id`
  ## Request example
  ```
  // send id in params
  ```
  
  ## Response example
  `204 No Content`
  ```
  // No body returned for response
  ```

  `404 Not Found`

  ```json
  "Product not found"
  ```

  ```json
  {
	"statusCode": 404,
	"message": "Cannot find this route"
  }
  ```
