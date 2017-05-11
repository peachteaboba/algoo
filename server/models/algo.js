/**
 * Created by andyf on 3/02/17.
 */

// Require Mongoose
var mongoose = require('mongoose');

// Create the algo schema
var AlgoSchema = new mongoose.Schema({
  title: {type: String, required: true, minlength: 3},
  description: {type: String, required: true, minlength: 3},
  hint: {type: String, required: true},
  order: {type: Number, required: true},
  difficulty: {type: Number, required: true},
  _track: {type: mongoose.Schema.Types.ObjectId, ref: 'Track'},
  _photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}]
}, {timestamps: true});

// We are setting this Schema in our Models as 'Algo'
mongoose.model('Algo', AlgoSchema);
