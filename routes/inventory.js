const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js'));

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

module.exports = router;