const db = require('../db/connection');

//Create new property
function createProperty(req, res) {
    //Insert address if none exists
    const addrQueryString = "INSERT";
    try {
        let result = db.dbQuery(addrQueryString);
        res.status(201).json(result);
    } catch (err) {
        res.status(404).json(err);
        return;
    }
    //Insert property if none exists
    const propQueryString = "INSERT";
    try {
        let result = db.dbQuery(propQueryString);
        res.status(201).json(result);
    } catch (err) {
        res.status(404).json(err);
        return;
    }
}

function updateProperty(req,res) {
    return;
}

function deleteProperty(req,res) {
    return;
}

module.exports = {
    createProperty
};