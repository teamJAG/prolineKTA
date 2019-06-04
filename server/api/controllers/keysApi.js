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
    let countQuery = `SELECT COUNT(*) as count FROM (SELECT p.property_type, p.property_name, a.address, c.city, k.storage_location, k.office_location, k.key_number, k.key_type, k.key_status
    FROM proline.key_tab k
    INNER JOIN proline.address_tab a ON a.address_id = k.address_tab_address_id
	INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id
    INNER JOIN proline.property_tab p ON p.property_id = a.property_tab_property_id) as count `;

    let queryString = `SELECT p.property_type, p.property_name, a.address, c.city, k.storage_location, k.office_location, k.key_number, k.key_type, k.key_status
    FROM proline.key_tab k
    INNER JOIN proline.address_tab a ON a.address_id = k.address_tab_address_id
	INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id
    INNER JOIN proline.property_tab p ON p.property_id = a.property_tab_property_id `;
    
    if (req.body.filtered.length) {
        countQuery += req.body.filtered;
        queryString += req.body.filtered;   
    }

    if (req.body.sorted.length) {   
        queryString += 'ORDER BY ' + req.body.sorted[0].id + ' ';
        if (req.body.sorted[0].desc) {
            queryString += 'DESC ';
        }
        // req.body.sorted.forEach(sorter => {
        //     queryString += sorter.id + ', ';
        // })
    }

    let offset = req.body.page * req.body.pageSize;
    queryString += `LIMIT ${offset}, ${req.body.pageSize} `;

    try {
        console.log(req.body);
        console.log(queryString);
        const count = await db.dbQuery(countQuery);
        const rows = await db.dbQuery(queryString);
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
    listKeys
};