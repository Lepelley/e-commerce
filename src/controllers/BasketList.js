module.exports = class BasketList {
  print (request, response) {
    if (request.session.user) {
      response.render('basket/list')
    } else {
      request.flash('error', 'Vous devez être connecté pour accéder à votre panier.')
      response.redirect('/login')
    }
  }
}
