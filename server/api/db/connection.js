const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASS}`,
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