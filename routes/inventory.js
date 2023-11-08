// MARK: Setup
const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js'));
const joi = require('joi');
const helpers = require('../helpers.js');


// TODO: Proper REST error responses


// MARK: Get Inventory
router.get('/inventories', async(req, res) => {

    try{
        const allInventoriesData = await knex.select('*').from('inventories');
        console.log('Responded with a list of all inventories successfully.');
        res.json(allInventoriesData);

    }catch(error){
        console.log('Cannot return a list of all inventories: ', error);
        res.status(500).json({ error });
    }
});


// MARK: Update Inventory Item
router.put('/inventories/:id', async (req, res) => {
    const itemId = req.params.id;
    const itemBody = req.body;

    try{

        console.log(itemBody);
        const {error, value: cleanedData} = helpers.inventorySchema.validate(itemBody['inventory-item']);
        if(error){
            console.log('Failed to validate inventory data: ', error);
            res.status(500).json({error});
        }else{
            const numberOfRowsUpdated = await knex('inventories').where({id: itemId}).update(cleanedData);
            console.log('Successfully updated ', numberOfRowsUpdated, ' rows.');
            res.json(numberOfRowsUpdated);
        }

    }catch(error){
        console.log('Cannot update inventory item: ', error);
        res.status(500).json({error});
    }
});

module.exports = router;