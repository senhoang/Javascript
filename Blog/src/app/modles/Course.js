const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose);


const Course = new Schema({
  _id: { type: Number, },
  name: { type: String, maxlength: 225, required:true},
  description: { type: String, maxlength: 600},
  img: { type: String, maxlength: 225},
  youtubeid: { type: String, maxlength: 500, required:true},
  slug: { type: String, slug: 'name', unique:true },
},{
  _id: false,
  timestamps:true,
});

// Add plugins
mongoose.plugin(slug);

Course.plugin(AutoIncrement)
Course.plugin(mongoose_delete,{
  deletedAt : true ,
  overrideMethods: 'all',
});

  module.exports = mongoose.model('Course', Course);