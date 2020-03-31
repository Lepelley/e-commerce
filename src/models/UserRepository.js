const UserSchema = require('./UserSchema')
const bcrypt = require('bcrypt')

module.exports = class UserRepository {
  async add (lastname, firstname, email, password) {
    const user = await UserSchema.findOne({ email })
    if (user) {
      return false
    }

    bcrypt.hash(password, 10, (error, hash) => {
      if (error) {
        console.error(error)
        return false
      }
      UserSchema.create({ email, firstname, lastname, password: hash }, (error, user) => {
        if (error) {
          console.error(error)
          return false
        }
      })
    })
  }
}
