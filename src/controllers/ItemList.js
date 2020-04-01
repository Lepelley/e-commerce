const ItemRepository = require('../models/ItemRepository')
const ItemSchema = require('../models/ItemSchema')

module.exports = class ItemList {
  print (request, response) {
    // response.render('item/list', { items: (new ItemRepository()).findAll() })
    ItemSchema.find({}, (error, items) => {
      if (error) {
        throw error
      }
      response.render('item/list', { items })
    })
  }
}
