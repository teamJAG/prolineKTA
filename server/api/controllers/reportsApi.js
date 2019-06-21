const db = require("../db/connection");
const queries = require("../db/queries");

// Returns a report of the entire database
async function generateReport(req, res) {
  try {
    const result = await db.dbQuery(queries.generateReport);
    res.status(201).json(result);
  } catch(err) {
    console.log(err);
    res.status(400).json(err);
  }
  return;
}

//Returns a total row count and paginated results for requested reports, optionally sorted and filtered
async function getReport(req, res) {
  let countQuery;
  let recordQuery;

  console.log(req.body);

  switch (req.body.queryType) {
    case "keys":
      countQuery = queries.keysOutCount;
      recordQuery = queries.keysOutRecords;
      break;
    case "properties":
      countQuery = queries.propTransCount;
      recordQuery = queries.propTransRecords;
      break;
    default:
      console.log("No query type passed to server.");
      res.status(400).json({ error: "No query type passed to server." });
      return;
  }

  //Build queries with WHERE clause, if request body includes an id and a value.

  if (req.body.filter.id && req.body.filter.value) {
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
    let rows = await db.dbQuery(recordQuery);
    //Placeholder for toUpper() conversion (only for capstone demo)
    let pageCount = Math.ceil(
      parseFloat(count[0].count) / parseFloat(req.body.pageSize)
    );
    if (req.body.queryType === "keys") {
      for (let i=0; i<rows.length; i++) {
      rows[i].checked_out = rows[i].checked_out.toLocaleString();
      rows[i].due_date = rows[i].due_date.toLocaleString();
      }
    }
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

module.exports = {
  generateReport,
  getReport
};
