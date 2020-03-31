const UserRepository = require('../models/UserRepository')

module.exports = class Register {
  print (request, response) {
    response.render('user/register')
  }

  async process (request, response) {
    const result = await (new UserRepository()).add(
      request.body.form_lastname,
      request.body.form_firstname,
      request.body.form_email,
      request.body.form_password
    )
    if (result !== false) {
      request.flash('flash', 'La création de compte a été réussie !')
      response.redirect('/')
    } else {
      response.render('user/register', { exists: true })
    }
  }
}
