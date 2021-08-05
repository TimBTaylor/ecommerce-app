# Ecommerce API

I created this API to simulate an ecommerce store.

## Description

This API allows you to create a user, add user information such as name, address, credit/debit card information, save products to their cart/saved for later. Users can also place an order.

## Technologies Used

* Express.js
* MongoDB
* Mongoose

## Installation

* Download the file from this repository
* Navigate to the file via your CLI

### Executing program

* Run the following code in your CLI while in the project directory
```
npm install
```
or 
```
yarn install
```

* once it is finished installing the dependencies run the follow command
```
npm start
```

## Routes
#### if :id is in the URL is it referring to the user._id

### Register a user
`POST /auth/register`
* Body
`name, email, password`
* Example
```
```

### Login
`POST /auth/login`
* Body 
`email, password`
* Example
```
```

### Update User
`POST /info/:id/update-user`  

* Body
`name, email, password`
* Example
```
```

### Delete User
`POST /info/:id/delete-user`
* Example
```
```

### Adding users address
`POST /address/:id/new-address`

* Body
`name, streetAddress, city, state, zipcode`
* Example
```
```

### Deleting address
`DELETE /address/:id/delete-address`

* Body
`addressId`
* Example
```
```

### Updated address
`PUT /address/:id/update-address`

* Body
`name, streetAddress, city, state, zipcode`
* Example
```
```

### Add card information
`POST /card/:id/add-card`

* Body
`name, cardNumber, ccv, expiration`
* Example
```
```

### Delete card information
`DELETE /card/:id/delete-card`

* Body 
`cardId`
* Example
```
```

### Updated card information
`PUT /card/:id/updated-card`

* Body
`name, cardNumber, ccv, expiraton`
* Example
```
```

### Add items to users cart
`PUT /cart/:id/add-to-cart`

* Body
`_id (product id), name (product name), price (product price), category (product category), image (product image)`
* Example
```
```

### Removing items for users cart
`DElETE /cart/:id/delete-from-cart`

* Body
`productId`
* Example
```
```

### Add items to saved for later
`PUT /saved/:id/add-to-saved`

* Body
`_id (product id), name (product name), price (product price), category (product category), image (product image)`
* Example
```
```

### Remove item from saved for later
`DELETE /saved/:id/delete-from-saved`

* Body
`productId`
* Example
```
```

### Add an order to users orders
`POST /order/:id/new-order`

* Body
`products (product name, product price, product title, product image), order total $, quantity of items, orderNumber)`
* Example
```
```

### Delete an order
`DELETE /order/:id/delete-order`

* Body 
`orderId`
* Example
```
```

### Update an order
`PUT /order/:id/updated-order`

* Body
`orderId, productId (the one you want to remove)`
* Example
```
```

### Get all products 
`GET /product/all-products`

### Get product by id
`GET /get-product`

* Body
`productId`
* Example
```
```

### Add a new product
`POST /product/new-product`

* Body
`title (product title), price (product price), description (product description), category (product category), image (product image), quantity (product quantity)`
* Example
```
```

### Add review to a product
`POST /product-review`

* Body
`productId, name, rating (1-5), description, buyAgain (Yes or No)`
* Example
```
```
