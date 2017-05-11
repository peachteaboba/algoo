/**
 * Created by andyf on 2/27/17.
 */

// Require Mongoose
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {
            type: String,
            required: true,
            validate: [{
              validator: function( email ) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
              },
              message: "{ VALUE } is not a valid email"
            }]
          },
    username: {type: String, required: true, minlength: 4},
    password: {type: String, required: true, minlength: 4},
    _photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}],
    algosCompleted: {type: Number, default: 0},
    code: {type: String, required: true, minlength: 5}

}, {timestamps: true});

mongoose.model('User', UserSchema);
