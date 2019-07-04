const db = require("../db/connection");
const queries = require("../db/queries");

//Returns the status of a requested key
async function getKeyStatus(req, res) {
  const filterArray = req.body.id.split("*");
  let recordQuery = queries.keyRecord;
  recordQuery += `property_number LIKE "${filterArray[0]}" AND
    office_location LIKE "${filterArray[1]}" AND key_type LIKE
    "${filterArray[2]}" AND key_quantity = ${filterArray[3]} `;
  console.log(recordQuery);
  try {
    const rows = await db.dbQuery(recordQuery);
    let keyRecord = rows[0];
    if (rows.length > 1) {
      throw Error("More than one key matched in database.");
    }
    if (keyRecord.active === 0) {
      throw Error("Key has been deactivated.");
    }
    let payload = {
      key: {
        keyId: keyRecord.key_id,
        address: keyRecord.address,
        city: keyRecord.city,
        propertyName: keyRecord.property_name,
        propertyNumber: keyRecord.property_number,
        propertyType: keyRecord.property_type,
        keyType: keyRecord.key_type,
        keyStatus: keyRecord.key_status,
        deposit: keyRecord.deposit,
        keyStorageLocation: keyRecord.storage_location,
        keyOfficeLocation: keyRecord.office_location,
        
      }
    };
    if (rows[0].key_status === "OUT") {
      const transactionQuery =
        queries.transactionQuery +
        `WHERE key_tab_key_id LIKE ${keyRecord.key_id} 
      ORDER BY checked_out DESC LIMIT 1`;
      let transaction = await db.dbQuery(transactionQuery);
      transaction = transaction[0];
      payload = Object.assign(payload, {
        trans: {
          id: transaction.trans_id,
          firstName: transaction.first_name,
          lastName: transaction.last_name,
          company: transaction.company,
          checkedOut: transaction.checked_out.toLocaleString(),
          dueDate: transaction.due_date.toLocaleString(),
          deposit: transaction.deposit,
          depositType: transaction.deposit_type,
          fees: transaction.fees,
          notes: transaction.notes
        }
      });
    }
    console.log(payload);
    res.status(200).json(payload);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
    return;
  }
}

//Switch the key_status in the database to reflect a key being checked in/out/pending
async function switchKeyStatus(req, res) {
  const { keyStatus, keyId } = req.body;
  let queryString = `UPDATE proline.key_tab SET key_status = "${keyStatus}" WHERE key_id LIKE ${keyId} `;
  console.log(queryString);
  try {
    const result = await db.dbQuery(queryString);
    res.status(201).json(result);
  } catch (err) {
    res.status(404).json(err);
    return;
  }
}

async function checkKeyOut(req, res) {
  let {
    firstName,
    lastName,
    company,
    deposit,
    depositType,
    fees,
    notes,
    sale,
    exit,
    keyId
  } = req.body;

  //Is this transaction a sale or a rental exit? Update key status appropriately.
  let newStatus = "";
  sale ? (newStatus = "SOLD") : (newStatus = "OUT");
  exit ? (newStatus = "RETURNED") : (newStatus = "OUT");

  //Is there is a deposit type and/or notes?
  if (depositType !== null) {
    depositType = `'${depositType}'`;
  }
  if (notes !== null) {
    notes = `'${notes}'`;
  }

  let checkString = `SELECT contractor_id, email, phone_num FROM proline.contractor_tab WHERE company LIKE '${company}' AND 
    first_name LIKE '${firstName}' AND last_name LIKE '${lastName}' UNION (SELECT 'No_contractor_found', null, null) 
    LIMIT 1 `;

  //Database queries to create a new record in the transaction table, and to update the key's status in the key table
  let transString = `INSERT INTO proline.trans_tab (deposit, deposit_type, fees, notes, key_tab_key_id, 
        contractor_tab_contractor_id) VALUES (${deposit}, ${depositType}, ${fees}, ${notes}, ${keyId}, (SELECT 
        contractor_id FROM proline.contractor_tab WHERE '${firstName}' LIKE first_name AND '${lastName}' 
        LIKE last_name AND '${company}' LIKE company))`;


  let active = ``;
  if (newStatus === "SOLD" || newStatus === "RETURNED") {
    active = `, active = 0 `;
  }

  let keyString = `UPDATE proline.key_tab SET key_status = "${newStatus}" ${active} WHERE key_id = ${keyId}`;
  console.log(transString);
  console.log(keyString);

  try {
    let checkResult = await db.dbQuery(checkString);
    if (checkResult[0].contractor_id === "No_contractor_found") {
      res.status(200).json({redirect: true});
      return;
    }
    let transResult = await db.dbQuery(transString);
    let keyResult = await db.dbQuery(keyString);
    const result = {
      transResult,
      keyResult,
      contractor: checkResult[0]
    };
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
    return;
  }
}

async function checkKeyIn(req, res) {
  const { keyId, transId } = req.body;
  const transString = `UPDATE proline.trans_tab SET checked_in = current_timestamp() WHERE trans_id = ${transId}`;
  const keyString = `UPDATE proline.key_tab SET key_status = "IN" WHERE key_id = ${keyId}`;
  console.log(transString);
  console.log(keyString);
  try {
    let transResult = await db.dbQuery(transString);
    let keyResult = await db.dbQuery(keyString);
    const result = {
      transResult,
      keyResult
    };
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
    return;
  }
}

//Add a key record to the database
async function createKey(req, res) {
  const {
    address,
    city,
    keyStorageLocation,
    keyOfficeLocation,
    keyQuantity,
    keyType,
    deposit
  } = req.body;

  const keyQueryString = `INSERT INTO proline.key_tab (storage_location, key_quantity, key_type, key_number, 
    deposit, office_location, address_tab_address_id) VALUES ('${keyStorageLocation}', ${keyQuantity}, 
    '${keyType}', 1, ${deposit}, '${keyOfficeLocation}', (SELECT a.address_id FROM 
      proline.address_tab a INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id 
      WHERE address LIKE '${address}' AND city LIKE '${city}'))`;
  
  //Gather remaining required information on the new key to generate a QR code.
  const qrQueryString = `SELECT p.property_number, MAX(k.key_number) as key_number FROM proline.key_tab k
    INNER JOIN proline.address_tab a ON k.address_tab_address_id = a.address_id
    INNER JOIN proline.property_tab p ON a.property_tab_property_id = p.property_id
    INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id
    WHERE address LIKE '${address}' AND city LIKE '${city}' AND key_type LIKE '${keyType}'
    GROUP BY property_number`;

  console.log(keyQueryString);
  console.log(qrQueryString);
  try {
    let keyResult = await db.dbQuery(keyQueryString);
    let qrResult = await db.dbQuery(qrQueryString);
    let result = Object.assign(keyResult, qrResult[0]);
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}

//Edit a key record in the database
async function updateKey(req, res) {
  const {
    address,
    city,
    keyStorageLocation,
    keyOfficeLocation,
    keyQuantity,
    keyStatus,
    keyId,
    keyType,
    deposit
  } = req.body;

  let active = ``;
  if (keyStatus === "LOST" || keyStatus === "SOLD" || keyStatus === "DESTROYED" || keyStatus === "RETURNED") {
    active = `, active = 0 `;
  } else if (keyStatus === "IN" || keyStatus === "OUT" || keyStatus === "PENDING") {
    active = `, active = 1 `;
  }

  let keyUpdateString = `UPDATE proline.key_tab SET storage_location = "${keyStorageLocation}", 
      key_quantity = ${keyQuantity}, key_type = "${keyType}", deposit = ${deposit}, 
      office_location = "${keyOfficeLocation}", address_tab_address_id = (SELECT a.address_id FROM 
      proline.address_tab a INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id 
      WHERE address LIKE "${address}" AND city LIKE "${city}"), key_status = "${keyStatus}" ${active} WHERE 
      key_id = ${keyId} `;

  const qrQueryString = `SELECT p.property_number, k.key_number FROM proline.key_tab k
    INNER JOIN proline.address_tab a ON k.address_tab_address_id = a.address_id
    INNER JOIN proline.property_tab p ON a.property_tab_property_id = p.property_id
    WHERE key_id = ${keyId} `;

  console.log(keyUpdateString);
  console.log(qrQueryString);

  try {
    let keyResult = await db.dbQuery(keyUpdateString);
    let qrResult = await db.dbQuery(qrQueryString);
    let result = Object.assign(keyResult, qrResult[0]);
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }}

module.exports = {
  switchKeyStatus,
  getKeyStatus,
  createKey,
  updateKey,
  checkKeyOut,
  checkKeyIn
};
