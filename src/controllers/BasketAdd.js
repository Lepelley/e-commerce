module.exports = class BasketList {
  process (request, response) {
    if (request.session.basket) {
      request.session.basket.push(request.params.id)
    } else {
      request.session.basket = [request.params.id]
    }
    response.redirect('/list')
  }
}
