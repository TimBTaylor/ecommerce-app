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
npm run devStart
```

## Routes
#### if :id is in the URL is it referring to the user._id

### Register a user
`POST /auth/register`
* Body
`name, email, password`
* Example
```
await axios({
      method: "post",
      url: "https://ecommersappbytim.herokuapp.com/auth/register",
      header: { "Content-Type": "application/json" },
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    })
```

### Login
`POST /auth/login`
* Body 
`email, password`
* Example
```
await axios({
      method: "post",
      url: "https://ecommersappbytim.herokuapp.com/auth/login",
      header: { "Content-Type": "application/json" },
      data: {
        email,
        password,
      },
    })
```

### Update User
`POST /info/:id/update-user`  

* Body
`name, email, password, orders, cardInfo, wishlist, cart`
* Example
```
await axios({
      method: "post",
      url: `https://ecommersappbytim.herokuapp.com/info/${userId}/update-user`,
      header: {
        "Content-Type": "application/json",
      },
      data: {
        firstName,
        lastName,
        email,
        password,
        orders,
        cardInfo,
        wishlist,
        cart,
      },
    })
```

### Delete User
`POST /info/:id/delete-user`
* Example
```
await axios({
      method: "delete",
      url: `https://ecommersappbytim.herokuapp.com/info/${userId}/delete-user`,
      header: {
        "Content-Type": "application/json",
      },
    })
```

### Adding users address
`POST /address/:id/new-address`

* Body
`name, streetAddress, city, state, zipcode`
* Example
```
await axios({
      method: "post",
      url: `https://ecommersappbytim.herokuapp.com/address/${userId}/new-address`,
      header: { "Content-Type": "application/json" },
      data: {
        name,
        streetAddress,
        city,
        state,
        zipcode,
      },
    })
```

### Deleting address
`DELETE /address/:id/delete-address`

* Body
`addressId`
* Example
```
await axios({
      method: "delete",
      url: `https://ecommersappbytim.herokuapp.com/address/${userId}/delete-address`,
      header: { "Content-Type": "application/json" },
      data: {
        addressId,
      },
    })
```

### Updated address
`PUT /address/:id/update-address`

* Body
`name, streetAddress, city, state, zipcode, addressId`
* Example
```
await axios({
      method: "put",
      url: `https://ecommersappbytim.herokuapp.com/address/${userId}/update-address`,
      header: { "Content-Type": "application/json" },
      data: {
        name,
        streetAddress,
        city,
        state,
        zipcode,
        addressId,
      },
    })
```

### Add card information
`POST /card/:id/add-card`

* Body
`name, cardNumber, type, expiration`
* Example
```
await axios({
      method: "post",
      url: `https://ecommersappbytim.herokuapp.com/card/${userId}/add-card`,
      header: { "Content-Type": "application/json" },
      data: {
        name,
        cardNumber,
        type,
        expiration,
      },
    })
```

### Delete card information
`DELETE /card/:id/delete-card`

* Body 
`cardId`
* Example
```
await axios({
      method: "delete",
      url: `https://ecommersappbytim.herokuapp.com/card/${userId}/delete-card`,
      header: { "Content-Type": "application/json" },
      data: {
        cardId,
      },
    })
```

### Updated card information
`PUT /card/:id/updated-card`

* Body
`name, cardNumber, type, expiraton, cardId`
* Example
```
await axios({
      method: "put",
      url: `https://ecommersappbytim.herokuapp.com/card/${userId}/update-card`,
      header: { "Content-Type": "application/json" },
      data: {
        name: cardInfo.name,
        cardNumber: cardInfo.cardNumber,
        type: cardInfo.type,
        expiration: cardInfo.expiration,
        cardId: cardInfo.cardId,
      },
    })
```

### Add items to users cart
`PUT /cart/:id/add-to-cart`

* Body
`productId (product id), quantity (product quantity), size (product size) `
* Example
```
await axios({
        method: "put",
        url: `https://ecommersappbytim.herokuapp.com/cart/${userId}/add-to-cart`,
        header: {
          "Content-Type": "application/json",
        },
        data: {
          productId,
          quantity,
          size,
        },
      })
```

### Removing items for users cart
`DELETE /cart/:id/delete-from-cart`

* Body
`productId`
* Example
```
await axios({
      method: "delete",
      url: `https://ecommersappbytim.herokuapp.com/cart/${userId}/delete-from-cart`,
      header: { "Content-Type": "application/json" },
      data: {
        productId,
      },
    })
```

### Update item in users cart
`PUT /cart/:id/update-cart-item`
* Body
`productId, quantity (product quantity), size (product size)`
* Example
```
await axios({
        method: "put",
        url: `https://ecommersappbytim.herokuapp.com/cart/${userId}/update-cart-item`,
        header: { "Content-Type": "application/json" },
        data: {
          newItem: {
            productId,
            quantity,
            size,
          },
          productId,
        },
      })
```

### Remove all items from users cart
`DELETE /cart/:id/remove-all-from-cart

* Example
```
await axios({
      method: "delete",
      url: `https://ecommersappbytim.herokuapp.com/cart/${userId}/remove-all-from-cart`,
      header: {
        "Content-Type": "application/json",
      },
    })
```

### Add items to saved for later/wishlist
`PUT /saved/:id/add-to-saved`

* Body
`_id (product id), quantity (product quantity), size (product size)`
* Example
```
await axios({
        method: "put",
        url: `https://ecommersappbytim.herokuapp.com/saved/${userId}/add-to-saved`,
        header: { "Content-Type": "application/json" },
        data: {
          productId,
          quantity,
          size,
        },
      })
```

### Remove item from saved for later/wishlist
`DELETE /saved/:id/delete-from-saved`

* Body
`productId`
* Example
```
await axios({
      method: "delete",
      url: `https://ecommersappbytim.herokuapp.com/saved/${userId}/delete-from-saved`,
      header: { "Content-Type": "application/json" },
      data: {
        productId,
      },
    })
```

### Add an order to users orders
`POST /order/:id/new-order`

* Body
`products (product price, product title, product image, product size, product quantity, product id), order total $, quantity of items, orderNumber, shippingType, date, name`
* Example
```
await axios({
      method: "post",
      url: `https://ecommersappbytim.herokuapp.com/order/${userId}/new-order`,
      header: {
        "Content-Type": "application/json",
      },
      data: {
        products: orderInformation.products,
        total: orderInformation.total,
        quantity: orderInformation.quantity,
        orderNumber: orderInformation.orderNumber,
        shippingType: orderInformation.shippingType,
        date: orderInformation.date,
        name: orderInformation.name,
      },
    })
```

### Delete an order
`DELETE /order/:id/delete-order`

* Body 
`orderId`
* Example
```
await axios({
      method: "delete",
      url: `https://ecommersappbytim.herokuapp.com/order/${userId}/delete-order`,
      header: {
        "Content-Type": "application/json",
      },
      data: {
        orderId,
      },
    })
```

### Get all products 
`GET /product/all-products`

* Example
```
await axios({
      method: "get",
      url: "https://ecommersappbytim.herokuapp.com/product/all-products",
      header: { "Content-Type": "application/json" },
    })
```

### Add review to a product
`POST /product-review`

* Body
`name, rating (1-5), description, buyAgain (Yes or No), productId`
* Example
```
await axios({
      method: "post",
      url: `https://ecommersappbytim.herokuapp.com/product/product-review`,
      header: { "Content-Type": "application/json" },
      data: {
        name: productInfo.name,
        rating: productInfo.rating,
        description: productInfo.description,
        buyAgain: productInfo.buyAgain,
        productId: productInfo.productId,
      },
    })
```
