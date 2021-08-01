const express = require("express");
const router = express.Router();
const addressSchema = require("../models/address");
const { rawListeners } = require("../models/users");
const User = require("../models/users");

//add address request
router.post("/:id/newaddress", getUser, async (req, res) => {
  if (req.body != null) {
    const newAddress = new addressSchema({
      name: req.body.name,
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
    });
    res.user.address.push(newAddress);
  }
  try {
    const updatedUserAddress = await res.user.save();
    return res.status(200).json(updatedUserAddress);
  } catch (error) {}
});

//delete address request
router.delete("/:id/deleteaddress/:addressId", getUser, async (req, res) => {
  const deletedAddress = req.params.addressId;
  const currentAddressList = res.user.address;
  const newAddressList = currentAddressList.filter((address) => {
    return address._id != deletedAddress;
  });
  res.user.address = newAddressList;

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

//update address
router.post("/:id/updateaddress/:addressId", getUser, async (req, res) => {
  const updatedAddress = req.params.addressId;
  const currentAddressList = res.user.address;
  const newAddressList = currentAddressList.filter((address) => {
    return address._id != updatedAddress;
  });
  const newUpdatedAddress = new addressSchema({
    name: req.body.name,
    streetAddress: req.body.streetAddress,
    city: req.body,
    state: req.body.state,
    zipcode: req.body.zipcode,
  });
  res.user.address = newAddressList;
  res.user.address.push(newUpdatedAddress);

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

//get user middleware
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);

    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user;
  next();
}

module.exports = router;
