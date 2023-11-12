const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile.js"));

router.get("/warehouses", async (req, res) => {
  try {
    const AllWarehousesData = await knex.select("*").from("warehouses");
    console.log("responded with a list of all warehouses successfully");
    res.status(200).json(AllWarehousesData);
  } catch (error) {
    console.log("Cannot return a list of all inventories: ", error);
    res.status(500).json({ error });
  }
});
router.post("/warehouses", async (req, res) => {
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

router.get("/warehouses/:id", async (req, res) => {
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
      res.status(200).json(oneWarehouseData[0]);
    }
  } catch (error) {
    console.log("Cannot return a warehouse: ", error);
    res.status(500).json({ error });
  }
});
router.delete("/warehouses/:id", async (req, res) => {
  try {
    const deleted = await knex("warehouses").where({ id: req.params.id }).del();
    console.log(deleted);
    deleted == 1
      ? res.status(204).json({ deleted })
      : res.status(500).json({ error: "No warehouse to delete" });
  } catch (error) {
    console.log("Cannot return a warehouse: ", error);
    res.status(500).json({ error });
  }
});

router.put("/warehouses/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const data = await knex("warehouses")
      .where({ id: req.params.id })
      .update(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});
module.exports = router;
