const ItemRepository = require('../models/ItemRepository')

module.exports = class BasketList {
  async print (request, response) {
    if (request.session.user) {
      const items = []
      if (request.session.basket) {
        const repo = new ItemRepository()
        for (const item of request.session.basket) {
          items.push(await repo.find(item))
        }
      }
      response.render('basket/list', { items })
    } else {
      request.flash('error', 'Vous devez être connecté pour accéder à votre panier.')
      response.redirect('/login')
    }
  }
}
