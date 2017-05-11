/**
 * Created by andyf on 2/27/17.
 */

// Require Mongoose
var mongoose = require('mongoose');

// Require Bcrypt
var bcrypt = require('bcrypt');

// Require the model and save it in a variable
var User = mongoose.model('User');

var codeArr = ["0517-B"]

module.exports = (function() {
    return {

      reg: function(req, res) {
          console.log("In the reg method ---> users controller".cyan);
          console.log(req.body);

          User.findOne({email: req.body.email}, function(err, oneUser){
            if(err){
              console.log("===== error =====".red);
              res.status(400).send({error_message: "Server error"});
            } else {
              // 1. User was found
              if(oneUser){
                console.log("===== user was found =====".yellow);
                res.status(400).send({error_message: "Email is already registered"});
              } else {
                // 2. No user was found
                console.log("===== user is good to register =====".green);

                var flag = false;
                // Check to see if the code is in the array
                for(var i=0; i<codeArr.length; i++){
                  if(req.body.code == codeArr[i]){
                    flag = true;
                    break;
                  }
                }

                if(flag){

                  var pw = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));

                  // create the user object and save into database
                  var user = new User({username: req.body.username, email: req.body.email, password: pw, code: req.body.code});
                  user.save(function(err){
                    if(err){
                      console.log("===== error when registering =====".red);
                      res.status(400).send({error_message: "Server error"});
                    } else {
                      console.log("===== successfully registered a new user =====".green);
                      user._photos = [];
                      res.json(user);
                    }
                  });



                } else {
                  // the code is not valid
                  res.status(400).send({error_message: "Code is not valid"});
                }




              }
            }
          });
        },



        login: function(req, res){
          console.log("In the login method ---> users controller".cyan);
          console.log(req.body);

          // find the user with the email
          User.findOne({email: req.body.email}).populate([{path : '_photos'}]).exec(function(err, oneUser){
            if(err){
              console.log("===== error =====".red);
              res.status(400).send({error_message: "Server error"});
            } else {
              // 1. User was not found
              if(!oneUser){
                console.log("===== user was not found =====".yellow);
                res.status(400).send({error_message: "Email is not registered"});

              } else {
                // 2. No user found
                console.log("===== checking password =====".green);
                // authenticate password

                if(bcrypt.compareSync(req.body.password, oneUser.password)){
                  console.log("===== successfully logged a user =====".green);
                  res.json(oneUser);
                } else {
                  res.status(400).send({error_message: "Incorrect password"});
                }
              }
            }
          });
        },

        loginAdmin: function(req, res) {
          // var pw = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
          // Log the admin in. Quick & Dirty..
          if(bcrypt.compareSync(req.body.password, "$2a$08$3kCtbqOVZiUtv8e/hnfes.O3SO7DBW284yUyF7VKLbK0MiQPyFsQu")){
            res.status(200).send({token:"MakeARealTokenSomeday"});
          } else {
            res.status(201).send();
          }
        },

        authAdmin: function(req, res) {
          // Authenticate the admin. Quick & Dirty..
          if (req.body.token == "MakeARealTokenSomeday") {
            res.status(200).send();
          } else {
            res.status(201).send();
          }
        },

        edit: function(req, res){
          User.findOne({_id: req.body._id}).exec(function(err, result){
            if(err){
              console.log("===== error =====".red);
              res.status(400).send({error_message: "Server error"});
            } else {
              if(!result){
                res.status(400).send({error_message: "User not found!"});
              } else {
                // User was found
                result.email = req.body.email;
                result.username = req.body.username;
                result.save(function(err){
                  if(err){
                    console.log("===== error when editing user =====".red);
                    res.status(400).send({error_message: "Server error"});
                  } else {
                    console.log("===== successfully edited a user =====".green);
                    res.json(result);
                  }
                })
              }
            }
          })
        },

        getLeader: function(req, res){
          User.find({}).sort({'algosCompleted': -1}).limit(20).select('username algosCompleted').exec(function(err, result){
            if(err){
              console.log("===== error =====".red);
              res.status(400).send({error_message: "Server error"});
            } else {
              console.log("===== successfully got the leaderboard =====".green);
              res.json(result);
            }
          });
        },

        getLeaderLocal: function(req, res){
          User.find({code: req.params.code}).sort({'algosCompleted': -1}).select('username algosCompleted').exec(function(err, result){
            if(err){
              console.log("===== error =====".red);
              res.status(400).send({error_message: "Server error"});
            } else {
              console.log("===== successfully got the local leaderboard =====".green);
              res.json(result);
            }
          });
        }



    }
})();



















// end
