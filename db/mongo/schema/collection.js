const mongoose = require('mongoose')
const { Schema } = mongoose

const embedSchema = new Schema({
  doc_field_1: {
    type: String,
    requried: true,
    unique: true,
    minlength: 6
  }
})

const collectionSchema = new Schema({
  doc_field_1: {
    type: String,
    requried: true,
    unique: true,
    minlength: 6
  },
  doc_field_2: {
    type: Schema.Types.ObjectId,
    ref: 'Collection2'
  },
  doc_field_3: {
    type: Boolean,
    default: false
  },
  doc_field_4: Number,
  doc_field_5: {
    type: Date,
    required: true
  },
  doc_field_6: [embedSchema]
})

collectionSchema.pre('save', function (next) {
  // const doc = this
  next()
})

// collectionSchema.methods.method_name = function(attr1, callback) {
//   // return callback(new Error('Error'))
//   // callback(null, result)
// }

const Collection = mongoose.model('Collection', collectionSchema)

module.exports = Collection
