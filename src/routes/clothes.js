"use strict";

const express = require("express");
const { clothesCollection } = require("../models/index");
const router = express.Router();

router.get("/clothes", getClothes);
router.post("/clothes", addedClothes);
router.get("/clothes/:id", gettedById);
router.put("/clothes/:id", updatedClothes);
router.delete("/clothes/:id", deletedClothes);

async function getClothes(req, res) {
  let allClothes = await clothesCollection.readRecord();
  res.status(200).json(allClothes);
}

async function addedClothes(req, res) {
  let newClothes = req.body;
  let newCloth = await clothesCollection.createRecord(newClothes);
  res.status(201).json(newCloth);
}

async function gettedById(req, res) {
  let gettedId = parseInt(req.params.id);
  let gettedClothes = await clothesCollection.readRecord({
    where: { id: gettedId },
  });
  res.status(200).json(gettedClothes);
}

async function updatedClothes(req, res) {
  let body = req.body;
  let clothId = req.params.id;
  let clothesNeeded = await clothesCollection.updateRecord(body, clothId);
  res.status(201).json(clothesNeeded);
}

async function deletedClothes(req, res) {
  let delId = parseInt(req.params.id);
  let delCloth = await clothesCollection.deleteRecord({ where: { id: delId } });
  res.status(204).json(delCloth);
}
module.exports = router;
