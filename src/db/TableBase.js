class TableBase {
    constructor(db){
        this.db = db;
    }

    initTable() {
        let query = `CREATE TABLE IF NOT EXISTS ${this.name}(`;
        let i = 0;
        for (let key in this.keys) {
            query+=`${key} ${this.keys[key]}`;

            if (i < Object.keys(this.keys).length-1)
                query+=",";

            i+=1;
        }

        query+=");";

        this.db.exec(query);
    }

    newRow(obj) {
        let keysQuery = `INSERT INTO ${this.name} (`;
        let valuesQuery = ") VALUES(";
        let values = [];
        let i = 0;

        for (let key in obj) {
            keysQuery+=key;
            valuesQuery+="?";
            values.push(obj[key]);

            if (i < Object.keys(obj).length-1) {
                keysQuery+=",";
                valuesQuery+=",";
            }

            i+=1;
        }

        let query = keysQuery+valuesQuery+");";
        this.db.exec(query, values);
    }
}

module.exports = TableBase;