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
if :id is the the URL is will

### Register a user
`POST /auth/register`
* Body
`name, email, password`

### Login
`POST /auth/login`
* Body 
`email, password`

### Update User
`POST /:id/update-user`
`where :id is the users id`
* Body
`name, email, password`
