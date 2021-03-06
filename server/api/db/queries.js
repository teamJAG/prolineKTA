//Queries for the recordsAPI. Each list of records also queries a count of the whole table to
//pass a 'page count' to the client data table.

const keyCount = `SELECT COUNT(*) as count FROM (SELECT p.property_type, p.property_name, p.property_number, 
    a.address, c.city, k.storage_location, k.office_location, k.key_number, k.key_quantity, k.key_type, k.key_status, k.key_id, k.deposit, a.address_id
    FROM proline.key_tab k
    INNER JOIN proline.address_tab a ON a.address_id = k.address_tab_address_id
	INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id
    INNER JOIN proline.property_tab p ON p.property_id = a.property_tab_property_id) as count `;

const keyRecords = `SELECT p.property_type, p.property_name, p.property_number, a.address, c.city, k.storage_location, 
    k.office_location, k.key_number, k.key_quantity, k.key_type, k.key_status, k.key_id, k.deposit, a.address_id
    FROM proline.key_tab k
    INNER JOIN proline.address_tab a ON a.address_id = k.address_tab_address_id
	INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id
    INNER JOIN proline.property_tab p ON p.property_id = a.property_tab_property_id `;

const propCount = `SELECT COUNT(*) as count FROM (SELECT a.address_id, p.property_id, p.property_number, p.property_type, 
    p.property_name, a.address, c.city, a.postal_code, p.comments
    FROM proline.property_tab p
    INNER JOIN proline.address_tab a ON a.property_tab_property_id = p.property_id
    INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id) as count `;

const propRecords = `SELECT a.address_id, p.property_id, p.property_number, p.property_type, p.property_name, a.address, 
    c.city, a.postal_code, p.comments
    FROM proline.property_tab p
    INNER JOIN proline.address_tab a ON a.property_tab_property_id = p.property_id
    INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id `;

const peopleCount = `SELECT COUNT(*) as count FROM (SELECT user_id, null as contractor_id, first_name, last_name, email, phone_num, null as company
	FROM proline.users_tab
    UNION ALL
    SELECT null as user_id, contractor_id, first_name, last_name, email, phone_num, company
	FROM proline.contractor_tab) as c `;

const peopleRecords = `SELECT user_id, contractor_id, first_name, last_name, email, phone_num, company
    FROM (SELECT user_id, null as contractor_id, first_name, last_name, email, phone_num, null as company FROM proline.users_tab
    UNION ALL
    SELECT null as user_id, contractor_id, first_name, last_name, email, phone_num, company
    FROM proline.contractor_tab) as users `;

//Queries for the keysAPI

const keyRecord = `SELECT k.storage_location, k.key_quantity, k.creation_date, k.key_status, k.active, k.key_type, 
    k.key_number, k.key_id, k.office_location, k.deposit, a.address, c.city, p.property_name, p.property_number, p.property_type
    FROM proline.key_tab k
    INNER JOIN proline.address_tab a ON a.address_id = k.address_tab_address_id
    INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id
    INNER JOIN proline.property_tab p ON p.property_id = a.property_tab_property_id 
    WHERE `;

const transactionQuery = `SELECT t.trans_id, t.checked_out, t.due_date, t.deposit, t.deposit_type, t.fees,
t.notes, c.first_name, c.last_name, c.company FROM proline.trans_tab t
INNER JOIN proline.contractor_tab c ON t.contractor_tab_contractor_id = c.contractor_id `;

//Queries for the propertyAPI

const propertyRecord = `SELECT p.property_name, p.property_number, p.property_type, p.comments, a.address, 
    a.postal_code, c.city
    FROM proline.address_tab a
    INNER JOIN proline.property_tab p ON a.property_tab_property_id = p.property_id
    INNER JOIN proline.city_tab c ON a.city_tab_city_id = c.city_id 
    WHERE `;

//Queries for the reportsAPI

const generateReport = (filePath) => {
    const outfileReport = `SELECT 'Building Number', 'Building Name', 'Building Type', 'Building Address', 'Postal Code', 'City', 'Key Type', 'Key Number', 'Key Quantity', 'Key Status',
'Office Location', 'Checked Out Date', 'Due Date', 'Checked In Date', 'Deposit', 'Deposit Type', 'Deposit Notes', 'Contractor Name', 'Contact Info', 'Company'
UNION ALL
SELECT p.property_number, p.property_name, p.property_type, a.address, a.postal_code, c.city, k.key_type,
k.key_number, k.key_quantity, k.key_status, k.office_location, CONVERT(t.checked_out, date), CONVERT(t.due_date, date),
CONVERT(t.checked_in, date), t.deposit, t.deposit_type, t.notes, cn.first_name||cn.last_name, cn.phone_num,
cn.company INTO OUTFILE '${filePath}'
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
FROM proline.key_tab k
INNER JOIN proline.address_tab a ON k.address_tab_address_id = a.address_id
INNER JOIN proline.property_tab p ON a.property_tab_property_id = p.property_id
INNER JOIN proline.city_tab c ON a.city_tab_city_id = c.city_id
LEFT JOIN proline.trans_tab t on t.key_tab_key_id = k.key_id
LEFT JOIN proline.contractor_tab cn ON t.contractor_tab_contractor_id = cn.contractor_id `;
    return outfileReport;
}

const keysOutCount = `SELECT COUNT(*) as count from (SELECT p.property_number, p.property_name, k.key_type, 
    k.key_number, k.office_location, cn.first_name, cn.last_name, cn.phone_num, cn.company, t.checked_out, 
    t.due_date, t.deposit, t.deposit_type FROM proline.key_tab k
    INNER JOIN proline.address_tab a ON k.address_tab_address_id = a.address_id
    INNER JOIN proline.property_tab p ON a.property_tab_property_id = p.property_id
    INNER JOIN proline.trans_tab t ON t.key_tab_key_id = k.key_id
    INNER JOIN proline.contractor_tab cn ON t.contractor_tab_contractor_id = cn.contractor_id) as count `;

const keysOutRecords = `SELECT p.property_number, p.property_name, k.key_type, 
    k.key_number, k.office_location, cn.first_name, cn.last_name, cn.phone_num, cn.company, t.checked_out, 
    t.due_date, t.deposit, t.deposit_type FROM proline.key_tab k
    INNER JOIN proline.address_tab a ON k.address_tab_address_id = a.address_id
    INNER JOIN proline.property_tab p ON a.property_tab_property_id = p.property_id
    INNER JOIN proline.trans_tab t ON t.key_tab_key_id = k.key_id
    INNER JOIN proline.contractor_tab cn ON t.contractor_tab_contractor_id = cn.contractor_id `;

const propTransCount = `SELECT COUNT(*) as count FROM (SELECT p.property_name, p.property_number, k.key_type, 
    k.key_number, k.key_status, k.office_location, k.storage_location FROM proline.property_tab p
    INNER JOIN proline.address_tab a ON a.property_tab_property_id = p.property_id
    INNER JOIN proline.key_tab k ON k.address_tab_address_id = a.address_id) as count `;

const propTransRecords = `SELECT p.property_name, p.property_number, k.key_type, 
k.key_number, k.key_status, k.office_location, k.storage_location FROM proline.property_tab p
INNER JOIN proline.address_tab a ON a.property_tab_property_id = p.property_id
INNER JOIN proline.key_tab k ON k.address_tab_address_id = a.address_id `;

module.exports = {
  keyCount,
  keyRecords,
  propCount,
  propRecords,
  peopleCount,
  peopleRecords,
  keyRecord,
  propertyRecord,
  generateReport,
  transactionQuery,
  keysOutCount,
  keysOutRecords,
  propTransCount,
  propTransRecords
};
