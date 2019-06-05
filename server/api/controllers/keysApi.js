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

//Returns a total row count and paginated results for requested records, optionally sorted and filtered
async function listRecords(req, res) {

    let countQuery;
    let recordQuery;

    switch (req.body.queryType) {
        case "keys":
            countQuery = queries.keyCount;
            recordQuery = queries.keyRecords;
            break;
        case "properties":
            countQuery = queries.propCount;
            recordQuery = queries.propRecords;
            break;
        case "people":
            countQuery = queries.peopleCount;
            recordQuery = queries.peopleRecords;
            break;
        default:
            throw new Error("No query type passed to server.");
    }
    
    if (req.body.filtered.length) {
        countQuery += 'WHERE ' + req.body.filtered[0].id + ' LIKE \"' + req.body.filtered.value + '\" ';
        recordQuery += 'WHERE ' + req.body.filtered[0].id + ' LIKE \"' + req.body.filtered.value + '\" ';
    }

    if (req.body.sorted.length) {   
        recordQuery += 'ORDER BY ' + req.body.sorted[0].id + ' ';
        if (req.body.sorted[0].desc) {
            recordQuery += 'DESC ';
        }
    }

    let offset = req.body.page * req.body.pageSize;
    recordQuery += `LIMIT ${offset}, ${req.body.pageSize} `;

    try {
        console.log(req.body);
        console.log(recordQuery);
        const count = await db.dbQuery(countQuery);
        const rows = await db.dbQuery(recordQuery);
        let pageCount = Math.ceil(parseFloat(count[0].count) / parseFloat(req.body.pageSize));
        const payload = {
            data: rows,
            pages: pageCount
        }
        res.status(200).json(payload);
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
}

module.exports = {
    toggleKeyStatus,
    createKey,
    deleteKey,
    listRecords
};