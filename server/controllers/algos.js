/**
 * Created by andyf on 3/03/17.
 */

// Require Mongoose
var mongoose = require('mongoose');

// Require the model and save it in a variable
var Algo = mongoose.model('Algo');
var Track = mongoose.model('Track');


module.exports = (function() {
  return {

    addAlgo: function(req, res) {
      // Create the algo object and save into database
      var algo = new Algo({
        title: req.body.title,
        description: req.body.description,
        hint: req.body.hint,
        order: req.body.order,
        difficulty: req.body.difficulty,
        _track: req.body.track_id
      });


      algo.save(function(err){
        if(err){
          console.log("===== error when saving new algo =====".red);
          res.status(400).send({error_message: "Server error"});
        } else {
          console.log("===== successfully added a new algo =====".green);

          // Add the algo's _id to the track
          Track.findOne({_id: req.body.track_id}).exec(function(err, result){
            if(err){
              console.log("===== error when finding track =====".red);
              res.status(400).send({error_message: "Server error"});
            } else {
              console.log("===== successfully found an existing track =====".green);
              result._algos.push(algo._id);

              result.save(function(err){
                if(err){
                  console.log("===== error when adding algo to track =====".red);
                  res.status(400).send({error_message: "Server error"});
                } else {
                  console.log("===== successfully added algo to track =====".green);
                  res.status(200).send();
                }
              }); // end result.save
            }
          }); // end Track.findOne
        }
      }); // end algo.save
    }, // end addAlgo

    editAlgo: function(req, res) {
      console.log(req.body);

      Algo.findOne({_id: req.body._id}).exec(function(err, result){
        if(err){
          console.log("===== error when finding one existing algo =====".red);
          res.status(400).send({error_message: "Server error"});
        } else {
          console.log("===== successfully found the algo to edit =====".green);

          result.title = req.body.title;
          result.description = req.body.description;
          result.hint = req.body.hint;
          result.order = req.body.order;
          result.difficulty = req.body.difficulty;

          result.save(function(err){
            if(err){
              console.log("===== error when saving an edited algo =====".red);
              res.status(400).send({error_message: "Server error"});
            } else {
              console.log("===== successfully saved an edited algo =====".green);
              res.json(result);
            }
          });
        }
      });
    }, // End editAlgo

    deleteAlgo: function(req, res) {
      Algo.remove({_id: req.body._id}, function(err){
        if(err){
          console.log("===== error when deleting an algo =====".red);
          res.status(400).send({error_message: "Server error"});
        } else {
          console.log("===== successfully deleted an algo =====".green);
          res.status(200).send();
        }
      });
    },

    getAlgoCount: function(req, res){

      Algo.count({}).exec(function(err, result){
        if(err){
          console.log("===== error when getting algo count =====".red);
          res.status(400).send({error_message: "Server error"});
        } else {
          console.log("===== successfully got algo count =====".green);
          res.json(result);
        }
      })


    }



     // End deleteAlgo







  }
})();
