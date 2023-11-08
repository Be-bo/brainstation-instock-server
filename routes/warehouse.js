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

router.get("/warehouse/:id", async (req, res) => {
  try {
    const id = req.params.id; // Get the ID from the URL parameter
    const oneWarehouseData = await knex
      .select("*")
      .from("warehouses")
      .where({ id });

    if (oneWarehouseData.length === 0) {
      console.log("Warehouse not found");
      res.status(404).json({ error: "Warehouse not found" });
    } else {
      console.log("Responded with selected warehouse");
      res.json(oneWarehouseData[0]); // Assuming there's only one matching warehouse
    }
  } catch (error) {
    console.log("Cannot return a warehouse: ", error);
    res.status(500).json({ error });
  }
});
router.delete("/warehouse/:id", async (req, res) => {
  try {
    await knex("warehouses").where({ id: req.params.id }).del();

    res.sendStatus(204);
  } catch (error) {
    console.log("Cannot return a warehouse: ", error);
    res.status(500).json({ error });
  }
});

router.put("/warehouse/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  const data = await knex("warehouses")
    .where({ id: req.params.id })
    .update(req.body);
  res.json(data);
});
module.exports = router;
