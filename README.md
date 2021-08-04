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
### If the URL requires a :id it will always be the users ID unless its a request to the products

### Register a user
`POST /auth/register`
* Body
`name, email, password`

### Login
`POST /auth/login`
* Body 
`email, password`

### Update User
`POST /info/:id/update-user`  

* Body
`name, email, password`

### Delete User
`POST /info/:id/delete-user`

### Adding users address
`POST /address/:id/new-address`

* Body
`name, streetAddress, city, state, zipcode`

### Deleting address
`DELETE /address/:id/delete-address`

* Body
`addressId`

### Updated address
`PUT /address/:id/update-address`

* Body
`name, streetAddress, city, state, zipcode`

### Add card information
`POST /card/:id/add-card`

* Body
`name, cardNumber, ccv, expiration`

### Delete card information
`DELETE /card/:id/delete-card`

* Body 
`cardId`

### Updated card information
`PUT /card/:id/updated-card`

* Body
`name, cardNumber, ccv, expiraton`

### Add items to users cart
`PUT /cart/:id/add-to-cart`

* Body
`_id (product id), name (product name), price (product price), category (product category), image (product image)`

### Removing items for usrs cart
`DElETE /cart/:id/delete-from-cart`

* Body
`productId`

### Add items to saved for later
`PUT /saved/:id/add-to-saved`

* Body
`_id (product id), name (product name), price (product price), category (product category), image (product image)`

### Remove item from saved for later
`DELETE /saved/:id/delete-from-saved`

* Body
`productId`

### Add an order to users orders
`POST /order/:id/new-order`

* Body
`products (product name, product price, product title, product image), order total $, quantity of items, orderNumber)`

### Delete an order
`DELETE /order/:id/delete-order`

* Body 
`orderId`

### Update an order
`PUT /order/:id/updated-order`

* Body
`orderId, productId (the one you want to remove)`

### Get all products 
`GET /product/all-products`

### Get product by id
`GET /product/:id`
THE :id IN THE URL WILL BE THE PRODUCT ID

### Add a new product
`POST /product/new-product`

* Body
`title (product title), price (product price), description (product description), category (product category), image (product image), quantity (product quantity)`

### Add review to a product
`POST /product/review/:id`
THE :id IN THE URL WILL BE THE PRODUCT ID

* Body
`name, rating (1-5), description, buyAgain (Yes or No)`
