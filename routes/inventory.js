// MARK: Setup
const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js'));
const joi = require('joi');
const helpers = require('../helpers.js');


// MARK: Get Inventory
router.get('/inventories', async(req, res) => {

    try{
        const allInventoriesData = await knex.select('*').from('inventories');
        console.log('Responded with a list of all inventories successfully.');
        res.status(200).json(allInventoriesData)

    }catch(error){
        console.log('Cannot return a list of all inventories: ', error);
        res.status(500).json({ error });
    }
});


// MARK: Get Inventory Item
router.get('/inventories/:id', async(req, res) => {
    const itemId = req.params.id;

    try{
        const inventoryItem = await knex.select('*').from('inventories').where({id: itemId});
        if(inventoryItem.length == 0){
            console.log('Could not find an inventory item under id ', itemId);
            res.sendStatus(404);
        }
        else{
            console.log('Success retreiving inventory item with id ', itemId);
            res.status(200).json(inventoryItem);
        }
    
    }catch(error){
        console.log('Cannot return inventory item: ', error);
        res.status(500).json({error});
    }
});


// MARK: Insert Inventory Item
router.post('/inventories', async (req, res) =>{
    try{
        const itemBody = req.body;
        const {error, value: cleanedData} = helpers.inventorySchema.validate(itemBody);
        if(error){
            console.log('Failed to validate inserted inventory data: ', error);
            res.status(400).json({error});
        }else{
            const newInventoryItemId = await knex('inventories').insert(cleanedData);
            console.log('Successfully added an inventory item with id ', newInventoryItemId);
            res.status(201).json(newInventoryItemId);
        }
    }catch(error){
        console.log('Failed to insert a new inventory item: ', error);
        res.status(500).json({error});
    }
});


// MARK: Update Inventory Item
router.put('/inventories/:id', async (req, res) => {
    const itemId = req.params.id;
    const itemBody = req.body;

    try{

        const currentItemData = await knex('inventories').select('*').where({id: itemId});
        if(currentItemData.length == 0){
            console.log('Updated inventory item does not exist in the database.');
            res.sendStatus(404);
            return;
        }

        const {error, value: cleanedData} = helpers.inventorySchema.validate(itemBody);
        if(error){
            console.log('Failed to validate updated inventory data: ', error);
            res.status(400).json({error});

        }else{
            const numberOfRowsUpdated = await knex('inventories').where({id: itemId}).update(cleanedData);
            console.log('Successfully updated ', numberOfRowsUpdated, ' of inventory rows.');
            const updatedItemData = await knex('inventories').select('*').where({id: itemId});
            res.status(200).json(updatedItemData);
        }

    }catch(error){
        console.log('Cannot update inventory item: ', error);
        res.status(500).json({error});
    }
});


// MARK: Delete Inventory Item
router.delete('/inventories/:id', async(req, res) => {
    const itemId = req.params.id;

    try{
        const deletedItemData = await knex('inventories').select('*').where({id: itemId});
        if(deletedItemData.length == 0){
            console.log('Failed to delete inventory item under id ', itemId);
            res.sendStatus(404);

        }else{
            await knex('inventories').where({id: itemId}).del();
            console.log('Successfully deleted inventory item with id ', itemId);
            res.sendStatus(204);
        }
    
    }catch(error){
        console.log('Failed to delete inventory item: ', error);
        res.status(500).json({error});
    }
});

module.exports = router;