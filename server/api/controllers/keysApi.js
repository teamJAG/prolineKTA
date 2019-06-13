const db = require("../db/connection");
const queries = require("../db/queries");

//Returns the status of a requested key
async function getKeyStatus(req, res) {
  const filterArray = req.body.id.split("-");
  let recordQuery = queries.keyRecord;
  recordQuery += `property_number LIKE ${filterArray[0]} AND
    office_location LIKE '${filterArray[1]}' AND key_type LIKE
    '${filterArray[2]}' AND key_number LIKE ${filterArray[3]} `;
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
        propertyType: keyRecord.property_type,
        keyType: keyRecord.key_type,
        keyStatus: keyRecord.key_status,
        deposit: keyRecord.deposit,
        keyStorageLocation: keyRecord.storage_location,
        keyOfficeLocation: keyRecord.office_location
      }
    };
    if (rows[0].key_status === 0) {
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
  const filterArray = keyId.split("-");
  let queryString = `UPDATE proline.key_tab
        INNER JOIN proline.address_tab ON proline.address_tab.address_id = proline.key_tab.address_tab_address_id
        INNER JOIN proline.property_tab ON proline.property_tab.property_id = proline.address_tab.property_tab_property_id
        SET key_status = ${keyStatus}
        WHERE property_number LIKE ${filterArray[0]} AND
        office_location LIKE '${filterArray[1]}' AND key_type LIKE
        '${filterArray[2]}' AND key_number LIKE ${filterArray[3]} `;
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
  const {
    firstName,
    lastName,
    company,
    deposit,
    depositType,
    fees,
    notes,
    keyId
  } = req.body;
  let queryString = `INSERT INTO proline.trans_tab (deposit, deposit_type, fees, notes, key_tab_key_id, 
        contractor_tab_contractor_id) VALUES (${deposit}, '${depositType}', ${fees}, "${notes}", ${keyId}, (SELECT 
        contractor_id FROM proline.contractor_tab WHERE '${firstName}' LIKE first_name AND '${lastName}' 
        LIKE last_name AND '${company}' LIKE company))`;

  console.log(queryString);
  try {
    let result = await db.dbQuery(queryString);
    res.status(201).json(result);
  } catch (err) {
    res.status(404).json(err);
    return;
  }
}

async function checkKeyIn(req, res) {
  const { keyId, transId } = req.body;
  const transString = `UPDATE proline.trans_tab SET checked_in = current_timestamp() WHERE trans_id = ${transId}`;
  const keyString = `UPDATE proline.key_tab SET key_status = 2 WHERE key_id = ${keyId}`;
  console.log(transString);
  console.log(keyString);
  try {
      let transResult = await db.dbQuery(transString);
      let keyResult = await dbQuery(keyString);
      const result = await transResult + keyResult;
      res.status(201).result(json);
  } catch(err) {
      res.status(404).json(err);
      return;
  }
}

async function createKey(req, res) {
  //Add key record
  const keyValues = "";
  const keyQueryString = "INSERT key_tab VALUES " + keyValues;
  try {
    result = await db.dbQuery(keyQueryString);
    res.status(201).json(result);
  } catch (err) {
    res.status(404).json(err);
  }
}

async function updateKey(req, res) {
  return;
}

module.exports = {
  switchKeyStatus,
  getKeyStatus,
  createKey,
  updateKey,
  checkKeyOut,
  checkKeyIn
};
