const ItemRepository = require('../models/ItemRepository')

module.exports = class ItemEdit {
  async print (request, response) {
    response.render('admin/item/edit', { item: await (new ItemRepository()).find(request.params.id) })
  }

  async process (request, response) {
    const result = await (new ItemRepository()).update(
      request.params.id,
      {
        name: request.body.form_name,
        price: request.body.form_price,
        description: request.body.form_description,
        image: request.body.form_image
      }
    )

    if (result.n === 1) {
      request.flash('flash', 'Article modifié !')
    } else {
      request.flash('error', 'L\'article n\'a pas pu être modifié.')
    }
    response.redirect('/admin/list')
  }
}
