const express = require("express");
const app = express();
const port = 8080;
const knex = require("knex");
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Define a GET route to retrieve inventory data
app.get("/api/inventories", (req, res) => {
  // Use Knex to retrieve data from the 'inventories' table
  db.select("*")
    .from("inventories")
    .then((inventories) => {
      res.json(inventories);
    })
    .catch((error) => {
      console.error("Error fetching inventories:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});
