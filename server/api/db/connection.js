const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '',
    user: '',
    password: '',
    connectionLimit: 5
});

async function dbQuery(queryString) {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(queryString);
        console.log(rows); //print result of db query
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (conn) {
            conn.end();
            return rows;
        }
    }
}

module.exports = dbQuery;