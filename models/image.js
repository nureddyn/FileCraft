const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  name: {type: String, required: true},
  }, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      return ret;
    }
  }
});
imageSchema.pre('save', async function(next) {
  // 'this' is the image doc
  if (!this.isModified('name')) return next();
  return next();
});

module.exports = mongoose.model('Image', imageSchema);