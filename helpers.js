const joi = require('joi');

const inventorySchema = joi.object({
    warehouse_id: joi.number().required(),
    item_name: joi.string().required(),
    description: joi.string(),
    category: joi.string().required(),
    status: joi.string().required(),
    quantity: joi.number().required()
});

module.exports = {
    inventorySchema,
};