const db = require("../db/connection");

//Create new contractor
async function createContractor(req, res) {
  const {
    firstName,
    lastName,
    phoneNum,
    company
  
  } = req.body;

  const contractorString = `INSERT INTO proline.contractor_tab (first_name, last_name, phone_num, company) VALUES `;


  console.log(contractorString);

  try {
    let contractorResult = await db.dbQuery(contractorString);
    let result = {
      contractorResult,
    };
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

async function updateContractor(req, res) {
  //Update existing record
  const contractorQueryString = "UPDATE";
  try {
    let result = await db.dbQuery(contractorQueryString);
    res.status(201).json(result);
  } catch (err) {
    res.status(422).json(err);
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

