const knex = require('knex')(require ('./knexfile.js'));
const express = require('express');
const app = express();
const port = 5050;
app.use(express.json());

app.get('/', (req, res) => res.send("Hello World!"));

app.get('/test', async (req, res) => {
    try{
        const data = await knex.select('*').from('inventories');
        console.log(data);
    }catch(errur){
        console.log(errur);
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));