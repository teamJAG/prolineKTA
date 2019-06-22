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

  const cityString = `INSERT IGNORE INTO proline.city_tab (city) VALUES ("${city.toUpperCase()}") `

  const propertyString = `INSERT IGNORE INTO proline.property_tab (property_number, property_name, property_type, comments) VALUES 
  ("${propertyNumber.toUpperCase()}", "${propertyName.toUpperCase()}", "${propertyType.toUpperCase()}", "${comments.toUpperCase()}")`;

  const addressString = `INSERT INTO proline.address_tab (address, postal_code, city_tab_city_id, property_tab_property_id) VALUES 
    ("${address.toUpperCase()}", "${postalCode.toUpperCase()}", (SELECT city_id FROM proline.city_tab WHERE city LIKE "${city.toUpperCase()}"), 
    (SELECT property_id FROM proline.property_tab WHERE property_number LIKE "${propertyNumber.toUpperCase()}") )`;

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

//Update existing property records. Create new cities and/or property records as necessary
async function updateProperty(req, res) {
  const {
    propertyId,
    addressId,
    address,
    city,
    postalCode,
    propertyName,
    propertyNumber,
    propertyType,
    comments
  } = req.body;

  const cityString = `INSERT IGNORE INTO proline.city_tab (city) VALUES ("${city.toUpperCase()}") `

  const updatePropertyString = `UPDATE proline.property_tab SET property_number = "${propertyNumber.toUpperCase()}",  
    property_name = "${propertyName.toUpperCase()}", property_type = "${propertyType.toUpperCase()}", comments = "${comments.toUpperCase()}"
    WHERE property_id = ${propertyId}`

  const updateAddressString = `UPDATE proline.address_tab SET address = "${address.toUpperCase()}", postal_code = "${postalCode.toUpperCase()}", 
    city_tab_city_id = (SELECT city_id FROM proline.city_tab WHERE city = "${city.toUpperCase()}"), 
    property_tab_property_id = "${propertyId}" WHERE address_id = ${addressId} `

  console.log(cityString);
  console.log(updatePropertyString);
  console.log(updateAddressString);

  try {
    let cityResult = await db.dbQuery(cityString);
    let propertyResult = await db.dbQuery(updatePropertyString);
    let addressResult = await db.dbQuery(updateAddressString);
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

module.exports = {
  createProperty,
  updateProperty
};
