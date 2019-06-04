const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '165.22.101.186',
    user: 'aidanr',
    password: 'MingMeow2019',
    connectionLimit: 5
});

async function dbQuery(queryString) {
    let conn;
    let rows;
    try {
        conn = await pool.getConnection();
        console.log("connected");
        rows = await conn.query(queryString);
        return rows;
    } catch (err) {
        console.log("dbQuery failed: " + err);
        throw err;
    } finally {
        if (conn) {
            conn.end();
            console.log(rows);
        }
    }
}

module.exports = {
    dbQuery
};