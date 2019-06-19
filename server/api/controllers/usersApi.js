const db = require("../db/connection");

//Create new contractor
async function createContractor(req, res) {
  const { firstName, lastName, phoneNum, company } = req.body;

  const contractorString = `INSERT INTO proline.contractor_tab (first_name, last_name, phone_num, company) VALUES 
    ('${firstName}', '${lastName}', '${phoneNum}', '${company}')`;

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
  const { firstName, lastName, phoneNum, company, contractorId } = req.body;

  const contractorString = `UPDATE proline.contractor_tab SET first_name = ${firstName}, 
    last_name = ${lastName}, phone_num = ${phoneNum}, company = ${company} WHERE contractor_id = ${contractorId} `;

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

function login(credentials) {
  return;
}

function logout(credentials) {
  return;
}

module.exports = {
  createContractor,
  updateContractor,
  login,
  logout
};
