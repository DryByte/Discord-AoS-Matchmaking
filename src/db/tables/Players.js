const TableBase = require("../TableBase.js");

class PlayersTable extends TableBase {
    constructor(db) {
        super(db);

        this.name = "players";
        this.keys = {
            id: "INT AUTO_INCREMENT PRIMARY KEY",
            name: "CHAR(30) NOT NULL UNIQUE",
            kills: "INT NOT NULL",
            deaths: "INT NOT NULL"
        };
    }
}

module.exports = PlayersTable;