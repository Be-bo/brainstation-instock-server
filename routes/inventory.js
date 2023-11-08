const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js'));

router.get('/inventories', async(req, res) => {
    try{
        const data = await knex.select('*').from('inventories');
        console.log(data);
    }catch(error){
        console.log('Bruh, en error: ', error);
    }
});

module.exports = router;