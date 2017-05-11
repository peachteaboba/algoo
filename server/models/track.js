/**
 * Created by andyf on 3/02/17.
 */

// Require Mongoose
var mongoose = require('mongoose');

// Create the track schema
var TrackSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: 3},
    description: {type: String, required: true, minlength: 3},
    chapter: {type: Number, required: true},
    _algos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Algo'}]
}, {timestamps: true});

mongoose.model('Track', TrackSchema); // We are setting this Schema in our Models as 'Track'
