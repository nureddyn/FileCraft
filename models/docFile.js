const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docFileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  docFileName: {type: String, required: true},
  docFileData: { data: Buffer, contentType: String } // type of field ?????
  }, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      return ret;
    }
  }
});
docFileSchema.pre('save', async function(next) {
  // 'this' is the docFile doc
  if (!this.isModified('name')) return next();
  return next();
});

module.exports = mongoose.model('DocFile', docFileSchema);