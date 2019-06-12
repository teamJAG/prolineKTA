const db = require('../db/connection');

//Create new property
async function createProperty(req, res) {
    //Insert address if none exists
    const addrQueryString = "INSERT";
    try {
        let result = await db.dbQuery(addrQueryString);
        res.status(201).json(result);
    } catch (err) {
        res.status(422).json(err);
    }
    //Insert property if none exists
    const propQueryString = "INSERT";
    try {
        let result = db.dbQuery(propQueryString);
        res.status(201).json(result);
    } catch (err) {
        res.status(422).json(err);
    }
}

async function updateProperty(req,res) {
    //Update existing record
    const propQueryString = "UPDATE";
    try {
        let result = await db.dbQuery(propQueryString);
        res.status(201).json(result);
    } catch (err) {
        res.status(422).json(err);
    }
}

// async function listPropertyNames(req, res) {
//     //Return rows from SELECT of requested properties
//     const listQueryString = "SELECT property_id, property_name FROM proline.property_tab";
//     try {
//         const result =  await db.dbQuery(listQueryString);
//         res.status(200).json(result);
//     } catch (err) {
//         res.status(404).json({"error" : err});
//     }
// }

module.exports = {
    // listPropertyNames,
    createProperty,
    updateProperty
};