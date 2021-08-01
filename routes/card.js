const express = require("express");
const router = express.Router();
const User = require("../models/users");
const cardSchema = require("../models/card");

//add card request
router.post("/:id/addcard", getUser, async (req, res) => {
  try {
    if (req.body != null) {
      const newCard = new cardSchema({
        name: req.body.name,
        cardNumber: req.body.cardNumber,
        ccv: req.body.ccv,
        expiration: req.body.expiration,
      });
      res.user.cardInfo.push(newCard);
    }
    const updatedCardInfo = await res.user.save();
    return res.status(200).json(updatedCardInfo);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//delete card request
router.delete("/:id/deletecard/:cardId", getUser, async (req, res) => {
  const cardId = req.params.cardId;
  const usersCards = res.user.cardInfo;
  const updatedCard = usersCards.filter((card) => {
    return card._id != cardId;
  });
  res.user.cardInfo = updatedCard;
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

//edit card request
router.post("/:id/updatecard/:cardId", getUser, async (req, res) => {
  const cardId = req.params.cardId;
  const usersCards = res.user.cardInfo;
  const newCardList = usersCards.filter((card) => {
    return card._id != cardId;
  });
  const updatedCard = new cardSchema({
    name: req.body.name,
    cardNumber: req.body.cardNumber,
    ccv: req.body.ccv,
    expiration: req.body.expiration,
  });
  res.user.cardInfo = newCardList;
  res.user.cardInfo.push(updatedCard);
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
