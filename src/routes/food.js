"use strict";

const express = require("express");
const { foodCollection } = require("../models/index");
const router = express.Router();

router.get("/food", gettedFood);
router.post("/food", addedFood);
router.get("/food/:id", gettedById);
router.put("/food/:id", updatedFood);
router.delete("/food/:id", deletedFood);

async function gettedFood(req, res) {
  let allFood = await foodCollection.readRecord();
  res.status(200).json(allFood);
}

async function addedFood(req, res) {
  let newFood = req.body;
  let addedFood = await foodCollection.createRecord(newFood);
  res.status(201).json(addedFood);
}

async function gettedById(req, res) {
  let gettedId = parseInt(req.params.id);
  let geFood = await foodCollection.readRecord({ where: { id: gettedId } });
  res.status(200).json(geFood);
}

async function updatedFood(req, res) {
  let body = req.body;
  let foodId = req.params.id;
  let updatFood = await foodCollection.updateRecord(body, foodId);
  res.status(201).json(updatFood);
}

async function deletedFood(req, res) {
  let delId = parseInt(req.params.id);
  let delFood = await foodCollection.deleteRecord({ where: { id: delId } });
  res.status(204).json(delFood);
}

module.exports = router;
