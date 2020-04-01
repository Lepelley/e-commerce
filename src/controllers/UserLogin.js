const UserRepository = require('../models/UserRepository')

module.exports = class UserLogin {
  print (request, response) {
    response.render('user/login')
  }

  async process (request, response) {
    const user = await (new UserRepository()).checkUser(
      request.body.form_email,
      request.body.form_password
    )
    if (user !== false) {
      // response.locals.user = user.email
      request.session.user = user.email
      request.flash('flash', 'Vous êtes maintenant connecté !')
      response.redirect('/')
    } else {
      response.render('user/login', { email: request.body.form_email })
    }
  }
}
