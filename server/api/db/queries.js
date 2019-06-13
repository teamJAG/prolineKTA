//Queries for the recordsAPI. Each list of records also queries a count of the whole table to
//pass a 'page count' to the client data table.

const keyCount = `SELECT COUNT(*) as count FROM (SELECT p.property_type, p.property_name, p.property_number, a.address, c.city, k.storage_location, k.office_location, k.key_number, k.key_type, k.key_status
    FROM proline.key_tab k
    INNER JOIN proline.address_tab a ON a.address_id = k.address_tab_address_id
	INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id
    INNER JOIN proline.property_tab p ON p.property_id = a.property_tab_property_id) as count `;

const keyRecords = `SELECT p.property_type, p.property_name, p.property_number, a.address, c.city, k.storage_location, k.office_location, k.key_number, k.key_type, k.key_status
    FROM proline.key_tab k
    INNER JOIN proline.address_tab a ON a.address_id = k.address_tab_address_id
	INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id
    INNER JOIN proline.property_tab p ON p.property_id = a.property_tab_property_id `;

const propCount = `SELECT COUNT(*) as count FROM (SELECT p.property_number, p.property_type, p.property_name, a.address, c.city, a.postal_code, p.comments
    FROM proline.property_tab p
    INNER JOIN proline.address_tab a ON a.property_tab_property_id = p.property_id
    INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id) as count `;

const propRecords = `SELECT p.property_number, p.property_type, p.property_name, a.address, c.city, a.postal_code, p.comments
    FROM proline.property_tab p
    INNER JOIN proline.address_tab a ON a.property_tab_property_id = p.property_id
    INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id `;

const peopleCount = `SELECT COUNT(*) as count FROM (SELECT user_id, first_name, last_name, email, phone_num, null as company
	FROM proline.users_tab
    UNION ALL
    SELECT contractor_id, first_name, last_name, null as email, phone_num, company
	FROM proline.contractor_tab) as c `;

const peopleRecords = `SELECT user_id, first_name, last_name, email, phone_num, company
    FROM (SELECT user_id, first_name, last_name, email, phone_num, null as company FROM proline.users_tab
    UNION ALL
    SELECT contractor_id, first_name, last_name, null as email, phone_num, company
    FROM proline.contractor_tab) as users `;

//Queries for the keysAPI

const keyRecord = `SELECT k.storage_location, k.key_quantity, k.creation_date, k.key_status, k.active, k.key_type, 
    k.key_number, k.key_id, k.office_location, k.deposit, a.address, c.city, p.property_name, p.property_number, p.property_type
    FROM proline.key_tab k
    INNER JOIN proline.address_tab a ON a.address_id = k.address_tab_address_id
    INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id
    INNER JOIN proline.property_tab p ON p.property_id = a.property_tab_property_id 
    WHERE `;

module.exports = {
  keyCount,
  keyRecords,
  propCount,
  propRecords,
  peopleCount,
  peopleRecords,
  keyRecord
};
