const ItemRepository = require('../models/ItemRepository')

module.exports = class ItemList {
  async print (request, response) {
    response.render('admin/item/list', { items: await (new ItemRepository()).findAll() })
  }
}
