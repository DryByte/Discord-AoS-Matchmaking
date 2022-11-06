const DatabaseBase = require("../db/DatabaseBase.js");
const PlayersTable = require("../db/tables/Players.js");

class DatabaseManager extends DatabaseBase {
    constructor() {
        super();
    }
}

module.exports = DatabaseManager;