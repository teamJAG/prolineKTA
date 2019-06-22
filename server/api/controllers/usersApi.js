const db = require("../db/connection");

//Create new contractor
async function createContractor(req, res) {
  const { firstName, lastName, phoneNum, email, company } = req.body;

  const contractorString = `INSERT INTO proline.contractor_tab (first_name, last_name, phone_num, email, company) VALUES 
    ('${firstName.toUpperCase()}', '${lastName.toUpperCase()}', '${phoneNum}', '${email.toUpperCase()}', '${company.toUpperCase()}')`;

  console.log(contractorString);

  try {
    let contractorResult = await db.dbQuery(contractorString);
    let result = {
      contractorResult
    };
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

async function updateContractor(req, res) {
  const { firstName, lastName, phoneNum, email, company, contractorId } = req.body;

  const contractorString = `UPDATE proline.contractor_tab SET first_name = '${firstName.toUpperCase()}', 
    last_name = '${lastName.toUpperCase()}', phone_num = ${phoneNum}, email='${email.toUpperCase()}', company = '${company.toUpperCase()}' WHERE contractor_id = ${contractorId} `;

  console.log(contractorString);

  try {
    let contractorResult = await db.dbQuery(contractorString);
    let result = {
      contractorResult
    };
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

function login(req, res) {
  res.status(200).json(req.user);
}

module.exports = {
  createContractor,
  updateContractor,
  login
};
