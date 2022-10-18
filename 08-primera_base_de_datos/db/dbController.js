
const knex = require('knex')

class dbController {
    
    constructor( tableName, knexConfig ) {

        this.knexConfig =  knexConfig

        this.sqliteConfig = {
            client: 'sqlite3',
            connection: {
                filename: './db/ecommerce.sqlite',
            },
            useNullAsDefault: true,
        }
        
        this.createTable(tableName);
        this.createMessageTable()
    }

    async createTable( tableName ) {

        const knexInstance = knex( this.knexConfig )

        try {
            const exists = await knexInstance.schema.hasTable(tableName);

            if( exists ) {
                console.log(`The table ${tableName} already exists` );
                return;
            }

            await knexInstance.schema.createTable( tableName, ( table ) => {

                table.increments('id').notNullable
                table.string('title').notNullable
                table.float("price").notNullable
                table.string("thumbnail").notNullable
                table.primary('id')
            })

        } catch ( error ) {

            console.log("An error occured while creating the table ", tableName);
            console.error(error);

        } finally {
            knexInstance.destroy()
        }   
    }

    async createMessageTable() {

        const knexInstance = knex(this.sqliteConfig);
        
        try {
            const exists = await knexInstance.schema.hasTable('messages');

            if( exists ) {
                console.log(`The table messages already exists`);
                return;
            }

            await knexInstance.schema.createTable('messages', (table) => {
                table.increments('id').notNullable();
                table.string('message').notNullable();
                table.string('email', 25).notNullable();
                table.string('date', 30).notNullable();
                table.string('time', 30).notNullable();
            });

        } catch (error) {
            console.error(error.message);

        } finally {
            knexInstance.destroy();
        }
    }
    
    // Saves data in table and it works for products and messages data
    async saveInTable( dataToSave, dbData, table ) {

        const knexInstance = knex( dbData === 'knex' ? this.knexConfig : this.sqliteConfig )

        try {
            return await knexInstance( table ).insert([dataToSave]);

        } catch ( error ) {

            console.log("An error occured while adding an element to the table ", table );
            console.error(error);

            return undefined

        } finally {
            knexInstance.destroy()
        }
    }


    // Recovers data in table and it works for products and messages data
    async getByID( id, dbData, table ) {

        const knexInstance = knex( dbData === 'knex' ? this.knexConfig : this.sqliteConfig )

        try {
            return await knexInstance
                .from( table )
                .select("*")
                .where("id", id)
                .limit(1); 

        } catch ( error ) {

            console.log("An error occured while recovering an element to the table ", table );
            console.error(error);

            return undefined

        } finally {
            knexInstance.destroy()
        }
    }


    // Updates data in table and it works for products and messages data
    async updateByID( id, newData, dbData, table ) {

        const knexInstance = knex( dbData === 'knex' ? this.knexConfig : this.sqliteConfig )

        try {
    
            return await knexInstance(table).update(newData).where("id", id)
            
        } catch ( error ) {

            console.log("An error occured while recovering an element to the table ", table) ;
            console.error(error);

            return undefined

        } finally {
            knexInstance.destroy()
        }
    }

    // Recovers all data in table and it works for products and messages data
    async getAll( dbData, table ) {

        const knexInstance = knex( dbData === 'knex' ? this.knexConfig : this.sqliteConfig )

        try {
            return await knexInstance.from(table).select("*");

        } catch ( error ) {

            console.log("An error occured while recovering all the elements from the table ", table );
            console.error(error);

            return undefined

        } finally {
            knexInstance.destroy()
        }
    }


    // Deletes data in table and it works for products and messages data
    async deleteByID( id, dbData, table ) {

        const knexInstance = knex( dbData === 'knex' ? this.knexConfig : this.sqliteConfig )

        try {
            return await knexInstance.from(table).where("id", id).del();
        } catch ( error ) {

            console.log("An error occured while deleting an elements from the table ", table );
            console.error(error);

            return undefined

        } finally {
            knexInstance.destroy()
        }
    }
    
    // Deletes all data in table and it works for products and messages data
    async deleteAll( dbData, table ) {

        const knexInstance = knex( dbData === 'knex' ? this.knexConfig : this.sqliteConfig )

        try {
            return await knexInstance.from(table).del();


        } catch ( error ) {
            console.log("An error occured while deleting all the elements from the table ", table );
            console.error(error);

            return undefined

        } finally {
            knexInstance.destroy()
        }
    }
}

module.exports = dbController;