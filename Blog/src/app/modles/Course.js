const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Course = new Schema({
    name: { type: String, maxlength: 225, required:true},
    description: { type: String, maxlength: 600},
    img: { type: String, maxlength: 225},
    youtubeid: { type: String, maxlength: 500, required:true},
    slug: { type: String, slug: 'name', unique:true },
  },{
    timestamps:true,
  });

  module.exports = mongoose.model('Course', Course);