const process = require('process')
const faker = require('faker')
const chalk = require('chalk')
const mongoose = require('mongoose')

const ItemSchema = require('../src/models/ItemSchema')
const config = require('../app/config')

mongoose.connect(
  config.mongodb,
  { connectTimeoutMS: 3000, socketTimeoutMS: 20000, useNewUrlParser: true, useUnifiedTopology: true }
)
mongoose.connection.once('open', () => {
  console.log(chalk.magenta(`Connection to MongoDB: ${chalk.green('OK')}`))
})

if (process.argv[3] === '-c') {
  ItemSchema.collection.drop()
}

faker.locale = 'fr'

console.log(`Ajout de ${process.argv[2]} produits : `)
for (let index = 0; index < process.argv[2]; index++) {
  ItemSchema.create({
    name: faker.commerce.productName(),
    price: faker.commerce.price()
  }, (error, item) => {
    if (error) {
      console.error(error)
    } else {
      console.log(chalk.green(item.name + ' ajouté à la collection.'))
    }
  })
}
