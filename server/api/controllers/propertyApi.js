const db = require("../db/connection");

// //Get a property record
// async function getPropertyStatus(req, res) {
//   const { propertyId } = req.body;
//   let recordQuery = queries.propertyRecord;
//   recordQuery += `property_number LIKE ${propertyNumber} AND
//     property_name LIKE '${propertyName}' AND address LIKE
//     '${address}' AND city LIKE ${city} `;
//   console.log(recordQuery);
//   try {
//     const rows = await db.dbQuery(recordQuery);
//     let propertyRecord = rows[0];
//     if (rows.length > 1) {
//       throw new Error("More than one property matched in database.");
//     } else if (rows.length < 1) {
//       throw new Error("No records matched in database.");
//     }
//     let payload = {
//       key: {
//         keyId: propertyRecord.key_id,
//         address: propertyRecord.address,
//         city: propertyRecord.city,
//         propertyName: propertyRecord.property_name,
//         propertyNumber: propertyRecord.property_number,
//         propertyType: propertyRecord.property_type,
//         keyType: propertyRecord.key_type,
//         keyStatus: propertyRecord.key_status
//       }
//     };
//     if (rows[0].key_status === 0) {
//       const transactionQuery =
//         queries.transactionQuery +
//         `WHERE key_tab_key_id LIKE ${propertyRecord.key_id} 
//       ORDER BY checked_out DESC LIMIT 1`;
//       let transaction = await db.dbQuery(transactionQuery);
//       transaction = transaction[0];
//       payload = Object.assign(payload, {
//         trans: {
//           id: transaction.trans_id,
//           firstName: transaction.first_name,
//           lastName: transaction.last_name,
//           company: transaction.company,
//           checkedOut: transaction.checked_out.toLocaleString(),
//           dueDate: transaction.due_date.toLocaleString(),
//           deposit: transaction.deposit,
//           depositType: transaction.deposit_type,
//           fees: transaction.fees,
//           notes: transaction.notes
//         }
//       });
//     }
//     console.log(payload);
//     res.status(200).json(payload);
//   } catch (err) {
//     console.log(err);
//     res.status(404).json(err);
//     return;
//   }
// }

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

  const propertyString = `INSERT IGNORE INTO proline.property_tab (property_number, property_name, property_type, comments) VALUES 
  ("${propertyNumber}", "${propertyName}", "${propertyType}", "${comments}")`;

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

  const cityString = `INSERT IGNORE INTO proline.city_tab (city) VALUES ("${city}") `

  const updatePropertyString = `UPDATE proline.property_tab SET property_number = "${propertyNumber}",  
    property_name = "${propertyName}", property_type = "${propertyType}", comments = "${comments}"
    WHERE property_id = ${propertyId}`

  const updateAddressString = `UPDATE proline.address_tab SET address = "${address}", postal_code = "${postalCode}", 
    city_tab_city_id = (SELECT city_id FROM proline.city_tab WHERE city = "${city}"), 
    property_tab_property_id = "${propertyId}") WHERE address_id = ${addressId} `

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
