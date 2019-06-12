const db = require('../db/connection');
const queries = require('../db/queries');

//Returns the status of a requested key
async function getKeyStatus(req, res) {
    const filterArray = req.body.id.split("-");
    let recordQuery = queries.keyRecord;
    recordQuery += `property_number LIKE ${filterArray[0]} AND
    office_location LIKE '${filterArray[1]}' AND key_type LIKE
    '${filterArray[2]}' AND key_number LIKE ${filterArray[3]} `;
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
                deposit: keyRecord.deposit,
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
    const { keyStatus, keyId } = req.body
    const filterArray = keyId.split('-');
    let queryString = `UPDATE proline.key_tab SET key_status = ${keyStatus} 
        WHERE property_number LIKE ${filterArray[0]} AND
        office_location LIKE '${filterArray[1]}' AND key_type LIKE
        '${filterArray[2]}' AND key_number LIKE ${filterArray[3]} `;
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
    const {keyStatus, keyId } = req.body
    let queryString = `UPDATE proline.key_tab SET key_status = ${keyStatus} WHERE key_id = ${keyId}`;
    console.log(queryString);
    try {
        let result = await db.dbQuery(queryString);
        res.status(201).json(result);
    } catch (err) {
        res.status(404).json(err);
        return;
    }
    queryString = queries.createTransaction;
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