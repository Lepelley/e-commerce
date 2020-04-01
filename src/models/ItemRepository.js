const ItemSchema = require('./ItemSchema')

module.exports = class UserRepository {
  findAll () {
    ItemSchema.find({}, (error, docs) => {
      if (error) {
        throw error
      }
      console.log(docs)
      return docs
    })
  }
}
