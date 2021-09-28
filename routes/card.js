const express = require("express");
const router = express.Router();
const cardSchema = require("../models/card");
const getUser = require("../middleware/getUser");

//add card request
router.post("/:id/add-card", getUser, async (req, res) => {
  try {
    //creates new card schema
    const newCard = new cardSchema({
      name: req.body.name,
      cardNumber: req.body.cardNumber,
      type: req.body.type,
      expiration: req.body.expiration,
    });
    // add new card to card info list
    res.user.cardInfo.push(newCard);
    await res.user.save();
    return res.status(201).json(res.user.cardInfo);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//delete card request
router.delete("/:id/delete-card", getUser, async (req, res) => {
  const cardId = req.body.cardId;
  const usersCards = res.user.cardInfo;
  // filters out requested deleted card
  const updatedCard = usersCards.filter((card) => {
    return card._id != cardId;
  });
  res.user.cardInfo = updatedCard;
  try {
    await res.user.save();
    return res.status(200).json(res.user.cardInfo);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// update card request
router.put("/:id/update-card", getUser, async (req, res) => {
  const cardId = req.body.cardId;
  const usersCards = res.user.cardInfo;
  // filters out requested updated card
  const newCardList = usersCards.filter((card) => {
    return card._id != cardId;
  });
  const updatedCard = new cardSchema({
    name: req.body.name,
    cardNumber: req.body.cardNumber,
    type: req.body.type,
    expiration: req.body.expiration,
  });
  res.user.cardInfo = newCardList;
  res.user.cardInfo.unshift(updatedCard);
  try {
    await res.user.save();
    return res.status(201).json(res.user.cardInfo);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
