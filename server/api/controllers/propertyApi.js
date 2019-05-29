const db = require('../db/connection');

//Create new property
function createProperty(req, res) {
    //Insert address if none exists
    const addrQueryString = "INSERT";
    try {
        let result = db.dbQuery(addrQueryString);
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

function updateProperty(req,res) {
    //Update existing record
    const propQueryString = "UPDATE";
    try {
        let result = db.dbQuery(propQueryString);
        res.status(201).json(result);
    } catch (err) {
        res.status(422).json(err);
    }
}

function deleteProperty(req,res) {
    //Delete existing record
    const deleteQueryString = "DELETE FROM property_tab WHERE property_id=" + req.body.property_id;
    try {
        let result = db.dbQuery(deleteQueryString);
        res.status(204).json(result);
    } catch (err) {
        res.status(422).json(err);
    }
}

async function listProperty(req, res) {
    //Return rows from SELECT of requested properties
    const listQueryString = "SELECT * FROM proline.property_tab WHERE property_id LIKE \"" + req.body.property_id + "\"";
    console.log(listQueryString);
    try {
        const result =  await db.dbQuery(listQueryString);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({"error" : err});
    }
}

module.exports = {
    listProperty,
    createProperty,
    updateProperty,
    deleteProperty
};