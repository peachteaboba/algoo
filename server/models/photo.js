/**
 * Created by andyf on 3/09/17.
 */

// Require Mongoose
var mongoose = require('mongoose');

// Create the photo schema
var PhotoSchema = new mongoose.Schema({
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  _track: {type: mongoose.Schema.Types.ObjectId, ref: 'Track'},
  _algo: {type: mongoose.Schema.Types.ObjectId, ref: 'Algo'},
  link: {type: String, required: true, minlength:1}
}, {timestamps: true});

// We are setting this Schema in our Models as 'Photo'
mongoose.model('Photo', PhotoSchema);
