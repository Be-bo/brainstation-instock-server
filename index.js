// MARK: Setup
const knex = require('knex')(require ('./knexfile.js'));
const express = require('express');
const app = express();
const cors = require("cors");
const inventoryRoutes = require('./routes/inventory');
const warehouseRoutes = require('./routes/warehouse');
require("dotenv").config();
const {PORT} = process.env;

app.use(express.json());
app.use(cors());


// MARK: Test Routes
app.get('/', (req, res) => res.send("Hello World!"));
app.get('/test', async (req, res) => {
    try{
        const data = await knex.select('*').from('inventories');
        console.log(data);
    }catch(errur){
        console.log(errur);
    }
})


// MARK: Actual Routes
app.use(inventoryRoutes);
app.use(warehouseRoutes);


// MARK: Run Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));