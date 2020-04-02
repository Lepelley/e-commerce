const ItemSchema = require('./ItemSchema')

module.exports = class UserRepository {
  findAll () {
    return ItemSchema.find({})
  }

  find (id) {
    return ItemSchema.findOne({ _id: id })
  }

  update (id, item) {
    return ItemSchema.updateOne({ _id: id }, item)
  }
}
