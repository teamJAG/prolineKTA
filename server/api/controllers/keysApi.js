const db = require('../db/connection');
const queries = require('../db/queries');

//Returns the status of a requested key
async function getKeyStatus(req, res) {
    const recordQuery = queries.keyRecord + req.body.id;
    console.log(recordQuery);
    try {
        const rows = await db.dbQuery(recordQuery);
        res.status(200).json(rows);
    } catch (err) {
        res.status(404).json(err);
        return;
    }
}

//Switch the key_status in the database to reflect a key being checked in/out/pending
async function switchKeyStatus(req, res) {
    let value = req.keyStatus;
    let id = req.keyId
    let queryString = queries.keyPending();
    try {
        const result = await db.dbQuery(queryString);
        res.status(201).json(result);
    } catch (err) {
        res.status(404).json(err);
        return;
    }
}

async function checkKeyOut(req, res) {
    return;
}

async function checkKeyIn(req, res) {
    return;
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

async function updateKey(req,res) {
    return;
}

module.exports = {
    switchKeyStatus,
    getKeyStatus,
    createKey,
    updateKey,
    checkKeyOut,
    checkKeyIn
};