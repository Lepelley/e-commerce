const mongoose = require('mongoose')

mongoose.connect(
  'mongodb+srv://root:VdhrKsSY32ZxkD40@cluster0-0ubxs.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
const db = mongoose.connection
db.once('open', () => {
  console.log('Connected!')
})
