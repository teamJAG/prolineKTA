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

module.exports = {
    createProperty,
    updateProperty
};