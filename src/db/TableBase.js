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
        let query = `INSERT INTO ${this.name} VALUES(`;
        let values = [];
        let i = 0;

        for (let originalKey in this.keys) {
            if (!obj[originalKey]) {
                values.push(null);
            } else {
                values.push(obj[originalKey]);
            }

            query+="?";
            if (i < Object.keys(this.keys).length-1)
                query+=",";

            i+=1;
        }

        query+=");";

        this.db.exec(query, values);
    }
}

module.exports = TableBase;