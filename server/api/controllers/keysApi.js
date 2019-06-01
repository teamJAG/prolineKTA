const db = require('../db/connection');

async function toggleKeyStatus(req,res) {
    const queryString = "UPDATE key_tab SET key_status = !key_status WHERE key_id LIKE " + req.body.scannedKey;
    try {
        const result = await db.dbQuery(queryString);
        res.status(201).json(result);
    } catch (err) {
        res.status(404).json(err);
        return;
    }
}

async function createKey(req,res) {
    //Add key record
    const keyValues = ""
    const keyQueryString = "INSERT key_tab VALUES " + keyValues;
    try {
        result = await db.dbQuery(keyQueryString);
        res.status(201).json(result);
    } catch(err) {
        res.status(404).json(err);
    }    
}

async function deleteKey(req,res) {
    //Delete record of propery key
    const queryString = "DELETE FROM key_tab WHERE key_id=" + req.body.keyId;
    try {
        const result = await db.dbQuery(queryString);
        res.status(204).json(result);
    } catch(err) {
        res.status(404).json(err);
    }
}

async function listKeys(req, res) {
    //Return result of SELECT statement
    const queryString = `SELECT p.property_type, p.property_name, a.address, c.city, k.storage_location, k.office_location, k.key_number, k.key_type, k.key_status
    FROM proline.key_tab k
    INNER JOIN proline.address_tab a ON a.address_id = k.address_tab_address_id
	INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id
	INNER JOIN proline.property_tab p ON p.property_id = a.property_tab_property_id
	ORDER BY property_type`
    try {
        const result = await db.dbQuery(queryString);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json(err);
    }
}

module.exports = {
    toggleKeyStatus,
    createKey,
    deleteKey,
    listKeys
};