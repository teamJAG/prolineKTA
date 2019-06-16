const db = require("../db/connection");
const queries = require("../db/queries");

//Returns a total row count and paginated results for requested records, optionally sorted and filtered
async function listRecords(req, res) {
  let countQuery;
  let recordQuery;

  console.log(req.body);

  switch (req.body.queryType) {
    case "keys":
      countQuery = queries.keyCount;
      recordQuery = queries.keyRecords;
      break;
    case "properties":
      countQuery = queries.propCount;
      recordQuery = queries.propRecords;
      break;
    case "people":
      countQuery = queries.peopleCount;
      recordQuery = queries.peopleRecords;
      break;
    default:
      console.log("No query type passed to server.");
      res.status(400).json({ error: "No query type passed to server." });
      return;
  }

  //Build queries with WHERE clause, if request body includes an id and a value.

  if (req.body.filter.id && req.body.filter.value) {
    //People view. Requires alias for UNION ALL subselect.
    if (req.body.queryType === "people") {
      countQuery +=
        "WHERE c." +
        req.body.filter.id +
        ' LIKE "%' +
        req.body.filter.value +
        '%" ';
      recordQuery +=
        "WHERE users." +
        req.body.filter.id +
        ' LIKE "%' +
        req.body.filter.value +
        '%" ';
    } else if (req.body.queryType === "properties") {
      //Properties and Keys views.
      countQuery +=
        "WHERE " +
        req.body.filter.id +
        ' LIKE "%' +
        req.body.filter.value +
        '%" ';
      recordQuery +=
        "WHERE " +
        req.body.filter.id +
        ' LIKE "%' +
        req.body.filter.value +
        '%" ';
    } else {
      //The key view has a special QR Code input, which will always take
      //a specially formatted string consisting of 4 values
      if (req.body.filter.id === "qr") {
        const filterArray = req.body.filter.value.split("-");
        countQuery += `WHERE property_number LIKE ${filterArray[0]} AND
                    office_location LIKE '${filterArray[1]}' AND key_type LIKE
                    '${filterArray[2]}' AND key_number LIKE ${filterArray[3]} `;
        recordQuery += `WHERE property_number LIKE ${filterArray[0]} AND
                    office_location LIKE '${filterArray[1]}' AND key_type LIKE
                    '${filterArray[2]}' AND key_number LIKE ${filterArray[3]} `;
      } else {
        countQuery +=
          "WHERE " +
          req.body.filter.id +
          ' LIKE "%' +
          req.body.filter.value +
          '%" ';
        recordQuery +=
          "WHERE " +
          req.body.filter.id +
          ' LIKE "%' +
          req.body.filter.value +
          '%" ';
      }
    }
  }

  //Build queries with ORDER BY clause, if request body includes an id
  if (req.body.sorted.length) {
    recordQuery += "ORDER BY " + req.body.sorted[0].id + " ";
    if (req.body.sorted[0].desc) {
      recordQuery += "DESC ";
    }
  }

  //Enable pagination
  let offset = req.body.page * req.body.pageSize;
  recordQuery += `LIMIT ${offset}, ${req.body.pageSize} `;

  console.log(recordQuery);

  //Query database and respond with state object
  try {
    const count = await db.dbQuery(countQuery);
    const rows = await db.dbQuery(recordQuery);
    //Placeholder for toUpper() conversion (only for capstone demo)
    let pageCount = Math.ceil(
      parseFloat(count[0].count) / parseFloat(req.body.pageSize)
    );
    const payload = {
      data: rows,
      pages: pageCount
    };
    res.status(200).json(payload);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
}

async function getSearchOptions(req, res) {
  //Return rows from SELECT of requested properties
  const { filterId, filterValue, tableName } = req.body;
  const listQueryString = `SELECT DISTINCT ${filterId} as title FROM proline.${tableName} WHERE ${filterId} LIKE '%${filterValue}%'  LIMIT 10`;
  console.log(listQueryString);
  try {
    const result = await db.dbQuery(listQueryString);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err });
  }
}

module.exports = {
  listRecords,
  getSearchOptions
};
