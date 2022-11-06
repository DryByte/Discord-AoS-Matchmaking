const mysql = require("mysql");
const {
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD
} = require("../../config.json");

class DatabaseBase {
    constructor() {
        this.connection = mysql.createConnection({
            host: DB_HOST,
            port: DB_PORT,
            database: DB_DATABASE,

            user: DB_USER,
            password: DB_PASSWORD,
        });

        this.connection.connect(err => {
            if (err){
                console.log("[DATABASE] Can't connect to database: ", err);
                return;
            }

            console.log("[DATABASE] Database connection has been stabilished.");
        });
    }

    exec(query, values) {
        return new Promise((resolve) => {
            this.connection.query(query, values, (e,res,fields) => {
                if(e) {
                    console.log("Error executing query in database:",e);
                    resolve(false);
                    return;
                }

                resolve(res);
            });
        });
    }
}

module.exports = DatabaseBase;