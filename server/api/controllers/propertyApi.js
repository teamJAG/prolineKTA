const db = require("../db/connection");

//Create new property
async function createProperty(req, res) {
  const {
    address,
    city,
    postalCode,
    propertyName,
    propertyNumber,
    propertyType,
    comments
  } = req.body;

  const propertyString = ``;

  const addressString = ``;

  console.log(propertyString);
  console.log(addressString);

  try {
    let propertyResult = await db.dbQuery(propertyString);
    let addressString = await db.dbQuery(addressString);
    let result = {
      propertyResult,
      addressResult
    };
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

async function updateProperty(req, res) {
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
