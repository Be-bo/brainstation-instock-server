const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile.js"));
const joi = require("joi");
const helpers = require("../helpers.js");

router.get("/warehouses", async (req, res) => {
    try {
        const AllWarehousesData = await knex.select("*").from("warehouses");
        console.log("responded with a list of all warehouses successfully");
        res.json(AllWarehousesData);
        res.status(200).json(AllWarehousesData);
    } catch (error) {
        console.log("Cannot return a list of all inventories: ", error);
        res.status(500).json({ error });
    }
});
router.post("/warehouses", async (req, res) => {
    try {
        const newWarehouseData = req.body;
        const { error, value: cleanedWarehouseData } = helpers.warehouseSchema.validate(newWarehouseData);
        if (error) {
            console.log('Failed to insert a new warehouse item, incoming data not valid.');
            res.status(400).json({ error });
        } else {
            const insertedWarehouseIndex = await knex("warehouses").insert(cleanedWarehouseData);
            const newWarehouseData = await knex('warehouses').select('*').where({id: insertedWarehouseIndex[0]});
            console.log("Created a new warehouse successfully, id: ", insertedWarehouseIndex[0]);
            res.status(201).json(newWarehouseData);
        }
    } catch (error) {
        console.log("Cannot create a new warehouse: ", error);
        res.status(500).json({ error });
    }
});

router.get("/warehouses/:id", async (req, res) => {
    console.log('running');
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
    const itemId = req.params.id;

    try {
        const deletedWarehouseData = await knex('inventories').select('*').where({id: itemId});
        if(deletedWarehouseData.length == 0){
            console.log('Failed to delete, warehouse item with the following id does not exist ', itemId);
            res.sendStatus(404);

        }else{
            await knex("warehouses").where({ id: itemId }).del();
            res.sendStatus(204);
        }

    } catch (error) {
        console.log("Cannot return a warehouse: ", error);
        res.status(500).json({ error });
    }
});

router.put("/warehouses/:id", async (req, res) => {
    const itemId = req.params.id;
    const itemData = req.body;

    try{
        const updatedWarehouseData = await knex('warehouses').select('*').where({id: itemId});
        if(updatedWarehouseData.length == 0){
            console.log('Updated warehouse item of the following id does not exist: ', itemId);
            res.sendStatus(404);
        }else{

            const {error, value: cleanedWarehouseData} = helpers.warehouseSchema.validate(itemData);
            if(error){
                console.log('Failed to insert a new warehouse item, incoming data invalid.');
                res.status(400).json({error});

            }else{
                const data = await knex("warehouses").where({ id: req.params.id }).update(cleanedWarehouseData);
                res.status(200).json(data);
            }
        }

    }catch(error){
        console.log('Failed to update warehouse item ', itemId);
        res.status(500).json({error});
    }

});
module.exports = router;
