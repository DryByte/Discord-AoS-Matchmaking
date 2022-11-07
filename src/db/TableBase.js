class TableBase {
    constructor(db){
        this.db = db;

        this.keys = {};
        this.constraints = {};
        this.depends = [];
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

        for (let constraint in this.constraints) {
            query+=`,CONSTRAINT ${constraint} ${this.constraints[constraint]}`;
        }

        query+=");";

        this.db.exec(query).then(() => this.updateTableColumns());
    }

    updateTableColumns() {
        this.db.exec(`DESCRIBE ${this.name};`).then(columns => {
            if (columns.length < Object.keys(this.keys).length) {
                for (let key in this.keys) {
                    if(!columns.find(i=>i.Field==key))
                        this.db.exec(`ALTER TABLE ${this.name}
                                      ADD COLUMN ${key} ${this.keys[key]};`);
                }

            } else if (columns.length > Object.keys(this.keys).length) {
                for (let column of columns) {
                    if (!this.keys[column.Field])
                        this.db.exec(`ALTER TABLE ${this.name}
                                      DROP COLUMN ${column.Field}`);
                }
            }
        });
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