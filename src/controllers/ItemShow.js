const ItemRepository = require('../models/ItemRepository')

module.exports = class ItemList {
  async print (request, response) {
    response.render('item/show', { item: await (new ItemRepository()).find(request.params.id) })
  }
}
