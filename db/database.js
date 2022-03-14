const Sequelize = require('sequelize');
const { STRING, INTEGER, UUID, UUIDV4 } = Sequelize
const database = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-react-redux', { logging:false });
const faker = require('faker');
const { fa } = require('faker/lib/locales');

const People = database.define('person', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: STRING,
        allowNull: false,
    },
    age: {
        type: INTEGER,
        allowNull: false
    },
})

People.randomPerson = function () {
    return this.create({
        name: faker.name.findName(),
        age: Math.ceil(Math.random()*100)
    })
}

const init = async() =>{
    await database.sync({ force:true });
    await Promise.all(Array(5).fill('').map(x=>{
        return People.randomPerson()
    }))
    console.log('CONNECTED TO DATABASE')
}

module.exports = {
    database,
    init,
    People,
};