const keyCount = `SELECT COUNT(*) as count FROM (SELECT p.property_type, p.property_name, a.address, c.city, k.storage_location, k.office_location, k.key_number, k.key_type, k.key_status
    FROM proline.key_tab k
    INNER JOIN proline.address_tab a ON a.address_id = k.address_tab_address_id
	INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id
    INNER JOIN proline.property_tab p ON p.property_id = a.property_tab_property_id) as count `;

const keyRecords = `SELECT p.property_type, p.property_name, a.address, c.city, k.storage_location, k.office_location, k.key_number, k.key_type, k.key_status
    FROM proline.key_tab k
    INNER JOIN proline.address_tab a ON a.address_id = k.address_tab_address_id
	INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id
    INNER JOIN proline.property_tab p ON p.property_id = a.property_tab_property_id `;

const propCount = `SELECT COUNT(*) as count FROM (SELECT p.property_type, p.property_name, a.address, c.city, a.postal_code, p.comments
    FROM proline.key_tab k
    INNER JOIN proline.address_tab a ON a.address_id = k.address_tab_address_id
    INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id
    INNER JOIN proline.property_tab p ON p.property_id = a.property_tab_property_id) as count `;

const propRecords = `SELECT p.property_type, p.property_name, a.address, c.city, a.postal_code, p.comments
    FROM proline.key_tab k
    INNER JOIN proline.address_tab a ON a.address_id = k.address_tab_address_id
    INNER JOIN proline.city_tab c ON c.city_id = a.city_tab_city_id
    INNER JOIN proline.property_tab p ON p.property_id = a.property_tab_property_id `;

const peopleCount = `SELECT COUNT(*) as count FROM (SELECT first_name, last_name, email, phone_num, null as company
	FROM proline.users_tab
    UNION ALL
    SELECT first_name, last_name, null as email, phone_num, company
	FROM proline.contractor_tab) as count `;

const peopleRecords = `SELECT first_name, last_name, email, phone_num, null as company
    FROM proline.users_tab
    UNION ALL
    SELECT first_name, last_name, null as email, phone_num, company
    FROM proline.contractor_tab `;

module.exports = {
    keyCount,
    keyRecords,
    propCount,
    propRecords,
    peopleCount,
    peopleRecords
};