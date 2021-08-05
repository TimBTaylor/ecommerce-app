const express = require("express");
const router = express.Router();
const addressSchema = require("../models/address");
const getUser = require("../middleware/getUser");

//add address request
router.post("/:id/new-address", getUser, async (req, res) => {
  // creating new addressSchema
  const newAddress = new addressSchema({
    name: req.body.name,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
  });

  res.user.address.push(newAddress);
  try {
    await res.user.save();
    return res.status(200).json(res.user.address);
  } catch (error) {}
});

//delete address request
router.delete("/:id/delete-address", getUser, async (req, res) => {
  const deletedAddress = req.body.addressId;
  const currentAddressList = res.user.address;

  //filtering through current address list and removes requested address
  const newAddressList = currentAddressList.filter((address) => {
    return address._id != deletedAddress;
  });
  res.user.address = newAddressList;

  try {
    await res.user.save();
    return res.status(200).json(res.user.address);
  } catch (error) {
    res.status(400).json(error);
  }
});

//update address
router.put("/:id/update-address", getUser, async (req, res) => {
  const updatedAddress = req.body.addressId;
  const currentAddressList = res.user.address;

  //filters out requested updated address
  const newAddressList = currentAddressList.filter((address) => {
    return address._id != updatedAddress;
  });

  //creates new address schema
  const newUpdatedAddress = new addressSchema({
    name: req.body.name,
    streetAddress: req.body.streetAddress,
    city: req.body,
    state: req.body.state,
    zipcode: req.body.zipcode,
  });
  res.user.address = newAddressList;
  res.user.address.unshift(newUpdatedAddress);

  try {
    await res.user.save();
    return res.status(200).json(res.user.address);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
