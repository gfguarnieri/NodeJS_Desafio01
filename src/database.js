import fs from "node:fs/promises"

const databasePath = new URL("database.json", import.meta.url)

export class Database {

    #database = {}

    constructor() {

        fs.readFile(databasePath).then((data) => {
            this.#database = JSON.parse(data);
        }).catch(() => {
            this.#database = {};
        });

    }

    async #persist() {
        console.log(databasePath);
        await fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    select(table, search) {
        let data = this.#database[table] ?? [];

        if(search){
            console.log(search);
            data = data.filter(row =>{
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase());
                });
            });
        }

        return data;
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }
        this.#persist();
        return data;
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex((item) => item.id === id);
        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1);
            this.#persist();
            return true;
        }
        return false;
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex((item) => item.id === id);
        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...this.#database[table][rowIndex], ...data }
            this.#persist();
        }
    }

    find(table, id){
        const rowIndex = this.#database[table].findIndex((item) => item.id === id);
        if (rowIndex > -1) {
            return this.#database[table][rowIndex];
        }
    }

}