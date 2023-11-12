const express = require("express");
const app = express();
const knex = require("knex");
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);

const warehouseRouter = require("./routes/warehouse");

app.use(express.json());

app.use("/api/warehouses", warehouseRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const warehouses = await db("warehouses").select("*");
    res.status(200).json(warehouses);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching warehouses." });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const warehouseID = await db("warehouses").select("*");
    res.status(200).json(warehouseID);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ error: "An error occurred while fetching warehouse by ID." });
  }
});

module.exports = router;
