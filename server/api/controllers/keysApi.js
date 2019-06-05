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

    console.log(req.body);

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
            console.log("No query type passed to server.");
            res.status(400).json({error: "No query type passed to server."});
            return;
    }
    
    console.log(recordQuery);

    //Build queries with WHERE clause, if request body includes an id and a value.
    //If the query is for the people table, a second WHERE clause must be inserted in.
    if (req.body.filter.id && req.body.filter.value) {
        if (req.body.queryType === 'people') {
            const countIndex = countQuery.indexOf(' UNION ALL');
            const recordIndex = recordQuery.indexOf(' UNION ALL');
            let newCount = '';
            let newRecord = '';
            for (let i=0; i<countQuery.length; i++) {
                newCount += countQuery.charAt(i);
                if (i === countIndex) {
                    newCount += 'WHERE ' + req.body.filter.id + ' LIKE \"' + req.body.filter.value + '\" ';
                }
            }
            for (let i=0; i<recordQuery.length; i++) {
                newRecord += recordQuery.charAt(i);
                if (i === recordIndex) {
                    newRecord += 'WHERE ' + req.body.filter.id + ' LIKE \"' + req.body.filter.value + '\" ';
                }
            }
            countQuery = newCount;
            recordQuery = newRecord;
        }
        countQuery += 'WHERE ' + req.body.filter.id + ' LIKE \"' + req.body.filter.value + '\" ';
        recordQuery += 'WHERE ' + req.body.filter.id + ' LIKE \"' + req.body.filter.value + '\" ';
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