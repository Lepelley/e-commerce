module.exports = class UserLogin {
  process (request, response) {
    delete request.session.user
    request.flash('flash', 'Vous êtes maintenant déconnecté !')
    response.redirect('/')
  }
}
