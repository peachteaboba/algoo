/**
 * Created by andyf on 4/25/17.
 */

// Require Mongoose
var mongoose = require('mongoose');

// Require the model and save it in a variable
var Photo = mongoose.model('Photo');
var User = mongoose.model('User');

module.exports = (function() {
  return {

    addPhoto: function(req, res) {
      console.log(req.headers);
      console.log("------------".cyan);
      console.log(req.body);

      if (req.headers.secret == "robot"){
        // Save to db
        var photo = Photo(req.body);
        photo.save(function(err){
          if(err){
            console.log("crap..".red);
            console.log(err);
          } else {
            console.log("successfully saved a new photo!".green);
            console.log(photo);

            // Save the photo to the user
            User.findOne({_id: photo._user}).exec(function(err, result){
              if(err){
                console.log("crap..".red);
                console.log(err);
              } else {

                if(req.body.first == 1){
                  // It's the first photo
                  result.algosCompleted += 1;
                  console.log("Added to algosCompleted!".cyan);
                }


                result._photos.push(photo._id);
                result.save(function(err){
                  if(err){
                    console.log("crap..".red);
                    console.log(err);
                  } else {
                    console.log("successfully added new photo id to user!".green);
                    console.log(result);
                    res.json(photo);
                  }
                }); // end result save
              }
            }); // end user find one


          }
        }); // end photo save
      }
    },

    deletePhoto: function(req, res) {
      console.log(req.headers);
      console.log("------------".cyan);
      console.log(req.body);

      if (req.headers.secret == "robot"){
        // Delete from Photo Model

        Photo.remove({_id: req.body.photoID}).exec(function(err){
          if(err){
            console.log("crap..".red);
            console.log(err);
          } else {
            console.log("successfully deleted photo!".green);
            // Now delete that photo ID from the user
            User.findOne({_id: req.body.userID}).exec(function(err, result){
              for(var i=0; i<result._photos.length; i++){
                if(result._photos[i] == req.body.photoID){
                  result._photos.splice(i, 1);
                  break;
                }
              }
              result.save(function(err){
                if(err){
                  console.log("crap..".red);
                  console.log(err);
                } else {
                  console.log("successfully deleted photo id from user!".green);
                  console.log(result);
                  res.json({});
                }
              }); // end result save
            })
          }
        }); // end remove
      }
    },

    getAlgoPhotos: function(req, res) {
      console.log(req.headers);
      console.log("------ getting photos for this user and this algo ------".cyan);
      console.log(req.body);

      if (req.headers.secret == "robot"){
        Photo.find({_user: req.body._user, _algo: req.body._algo}).exec(function(err, results){
          if(err){
            console.log("crap..".red);
            console.log(err);
          } else {
            console.log("successfully got photos for this algo!".green);
            console.log(results);
            res.json(results);
          }
        });
      } // end secret
    } // end getAlgoPhotos












  }
})();
