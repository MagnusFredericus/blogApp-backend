const sequelizeImplementation = require('./SQLDatabase/sequelize/databaseImplementation')


//TO BE IMPLEMENTED
//Checks config and defines which database implementation to use
//For now just returns the sequelize implementation

class databaseFactory {
    //verity object interface
    constructor(config) {  }

    createDatabase() {
        const sequelizeImp = new sequelizeImplementation()
        return sequelizeImp
    }
}

module.exports = databaseFactory