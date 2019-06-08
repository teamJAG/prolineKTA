const db = require('../db/connection');
const queries = require('../db/queries');

//Returns the status of a requested key
async function getKeyStatus(req, res) {
    const recordQuery = queries.keyRecord + req.body.id;
    console.log(recordQuery);
    try {
        const rows = await db.dbQuery(recordQuery);
        let keyRecord = rows[0];
        if (rows.length > 1) {
            throw Error("More than one key matched in database.");
        }
        if (keyRecord.active === 0) {
            throw Error("Key has been deactivated.");
        }
        let payload = {
            key: {
                address: keyRecord.address,
                city: keyRecord.city,
                propertyName: keyRecord.property_name,
                propertyType: keyRecord.property_type,
                keyType: keyRecord.key_type,
                keyStatus: keyRecord.key_status,
                keyStorageLocation: keyRecord.storage_location,
                keyOfficeLocation: keyRecord.office_location
            }
        };
        if (rows[0].key_status === 0) {
            payload = Object.assign(payload, {
                trans: {
                    checkedOut: keyRecord.checked_out,
                    dueDate: keyRecord.due_date,
                    deposit: keyRecord.deposit,
                    depositType: keyRecord.deposit_type,
                    notes: keyRecord.notes
                }
            });
        }
        console.log(payload);

        res.status(200).json(payload);
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
        return;
    }
}

//Switch the key_status in the database to reflect a key being checked in/out/pending
async function switchKeyStatus(req, res) {
    let value = req.body.keyStatus;
    let id = req.body.keyId;
    let queryString = `UPDATE proline.key_tab SET key_status = ${value} WHERE key_id = ${id}`;
    console.log(queryString);
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