const db = require('../db/connection');
const queries = require('../db/queries');

//Toggle the key_status in the database to reflect a key being checked in/out
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

module.exports = {
    toggleKeyStatus,
    createKey,
    deleteKey
};