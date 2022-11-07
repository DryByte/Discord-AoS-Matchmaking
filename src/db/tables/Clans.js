const TableBase = require("../TableBase.js");

class ClanMemberTable extends TableBase {
    constructor(db) {
        super(db);

        this.name = "clans";
        this.keys = {
            id: "INT AUTO_INCREMENT PRIMARY KEY",
            name: "CHAR(35) UNIQUE",
            tag: "CHAR(5) UNIQUE",
            creation_date: "DATE DEFAULT CURRENT_TIMESTAMP"
        };
    }
}

module.exports = ClanMemberTable;