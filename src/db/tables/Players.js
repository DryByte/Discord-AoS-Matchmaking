const TableBase = require("../TableBase.js");

class PlayersTable extends TableBase {
    constructor(db) {
        super(db);

        this.name = "players";
        this.keys = {
            id: "INT AUTO_INCREMENT PRIMARY KEY",
            name: "CHAR(30) NOT NULL UNIQUE",
            discord_id: "INT NOT NULL UNIQUE",
            kills: "INT NOT NULL DEFAULT 0",
            deaths: "INT NOT NULL DEFAULT 0",
            creation_date: "DATE DEFAULT CURRENT_TIMESTAMP"
        };
    }
}

module.exports = PlayersTable;