"use strict";

const express = require("express");
const { food } = require("../models/index");
const router = express.Router();

router.get("/food", getFood);
router.post("/food", addFood);
router.get("/food/:id", getById);
router.delete("/food/:id", deleteFood);
router.put("/food/:id", updateFood);

async function getFood(req, res) {
  let allFood = await food.findAll();
  res.status(200).json(allFood);
}

async function addFood(req, res) {
  let newFood = req.body;
  let addedFood = await food.create(newFood);
  res.status(201).json(addedFood);
}

async function getById(req, res) {
  let gettedId = parseInt(req.params.id);
  let gettedFood = await food.findOne({ where: { id: gettedId } });
  res.status(200).json(gettedFood);
}

async function deleteFood(req, res) {
  let delId = parseInt(req.params.id);
  let delFood = await food.destroy({ where: { id: delId } });
  res.status(204).json(delFood);
}

async function updateFood(req, res) {
  let body = req.body;
  let foodId = req.params.id;
  let foodNeeded = await food.findOne({ where: { id: foodId } });
  const updatedFood = await foodNeeded.update(body);
  res.status(201).json(updatedFood);
}

module.exports = router;
