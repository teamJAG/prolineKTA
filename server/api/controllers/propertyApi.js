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

  const cityString = `INSERT IGNORE INTO proline.city_tab (city) VALUES ("${city}") `

  const propertyString = `INSERT IGNORE INTO proline.property_tab (property_number, property_name, property_type) VALUES 
  ("${propertyNumber}", "${propertyName}", "${propertyType}")`;

  const addressString = `INSERT INTO proline.address_tab (address, postal_code, city_tab_city_id, property_tab_property_id) VALUES 
    ("${address}", "${postalCode}", (SELECT city_id FROM proline.city_tab WHERE city LIKE "${city}"), 
    (SELECT property_id FROM proline.property_tab WHERE property_number LIKE "${propertyNumber}") )`;

  console.log(cityString);
  console.log(propertyString);
  console.log(addressString);

  try {
    let cityResult = await db.dbQuery(cityString);
    let propertyResult = await db.dbQuery(propertyString);
    let addressResult = await db.dbQuery(addressString);
    let result = {
      cityResult: cityResult,
      propertyResult: propertyResult,
      addressResult: addressResult
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
