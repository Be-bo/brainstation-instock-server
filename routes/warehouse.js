const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile.js"));

router.get("/warehouse", async (req, res) => {
  try {
    const AllWarehousesData = await knex.select("*").from("warehouses");
    console.log("responded with a list of all warehouses successfully");
    res.json(AllWarehousesData);
  } catch (error) {
    console.log("Cannot return a list of all inventories: ", error);
    res.status(500).json({ error });
  }
});
router.post("/warehouse", async (req, res) => {
  try {
    const newWarehouseData = req.body;
    console.log(newWarehouseData);
    const insertedWarehouse = await knex("warehouses").insert(newWarehouseData);

    console.log("Created a new warehouse successfully");
    res.status(201).json(insertedWarehouse);
  } catch (error) {
    console.log("Cannot create a new warehouse: ", error);
    res.status(404).json({ error });
  }
});

module.exports = router;
