/**
 * Created by andyf on 3/03/17.
 */

// Require Mongoose
var mongoose = require('mongoose');

// Require the model and save it in a variable
var Track = mongoose.model('Track');



module.exports = (function() {
    return {

      addTrack: function(req, res) {
        // Create the track object and save into database
        var track = new Track({title: req.body.title, description: req.body.description, chapter: req.body.chapter});
        track.save(function(err){
          if(err){
            console.log("===== error when saving new track =====".red);
            res.status(400).send({error_message: "Server error"});
          } else {
            console.log("===== successfully added a new track =====".green);
            res.json(track);
          }
        });
      },

      getAllTracks: function(req, res) {
        Track.find({}).sort({chapter: 1}).populate({path: '_algos'}).exec(function(err, tracks){
          if(err){
            console.log("===== error when getting all tracks =====".red);
            res.status(400).send({error_message: "Server error"});
          } else {
            console.log("===== successfully got all tracks =====".green);
            res.json(tracks);
          }
        });
      },

      deleteTrack: function(req, res) {
        Track.remove({_id: req.body._id}, function(err){
          if(err){
            console.log("===== error when deleting a track =====".red);
            res.status(400).send({error_message: "Server error"});
          } else {
            console.log("===== successfully deleted a track =====".green);
            res.status(200).send();
          }
        });
      },

      editTrack: function(req, res){
        Track.findOne({_id: req.body._id}).exec(function(err, result){
          if(err){
            console.log("===== error when editing a track =====".red);
            res.status(400).send({error_message: "Server error"});
          } else {

            result.title = req.body.title;
            result.description = req.body.description;
            result.chapter = req.body.chapter;

            result.save(function(err){
              if(err){
                console.log("===== error when saving new track =====".red);
                res.status(400).send({error_message: "Server error"});
              } else {
                console.log("===== successfully added a new track =====".green);
                res.json(result);
              }
            });
          }
        });
      }






    }
})();
