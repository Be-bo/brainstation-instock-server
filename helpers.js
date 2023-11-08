const joi = require('joi');

const inventorySchema = joi.object({
    warehouse_id: joi.number().required(),
    item_name: joi.string().required(),
    description: joi.string(),
    category: joi.string().required(),
    status: joi.string().required(),
    quantity: joi.number().required()
});

const warehouseSchema = joi.object({
    warehouse_name: joi.string().required(),
    address: joi.string().required(),
    city: joi.string().required(),
    country: joi.string().required(),
    contact_name: joi.string().required(),
    contact_position: joi.string().required(),
    contact_phone: joi.string().required(),
    contact_email: joi.string().required()
});

module.exports = {
    inventorySchema,
    warehouseSchema,
};