const TableBase = require("../TableBase.js");

class ClanMemberTable extends TableBase {
    constructor(db) {
        super(db);

        this.depends = ["players", "clans"];
        this.name = "clan_member";
        this.keys = {
            player_id: "INT",
            clan_id: "INT",
            role: "INT"
        };
        this.constraints = {
            fk_player_id: "FOREIGN KEY (player_id) REFERENCES players(id)",
            fk_clan_id: "FOREIGN KEY (clan_id) REFERENCES clans(id)",
        }
    }
}

module.exports = ClanMemberTable;