const ItemRepository = require('../models/ItemRepository')

module.exports = class ItemList {
  async print (request, response) {
    response.render('item/list', { items: await (new ItemRepository()).findAll() })
  }
}
