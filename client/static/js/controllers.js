/**
 * Created by andyf on 3/02/17.
 */

app.controller('loginController', function($scope, loginFactory, $location, $cookies, $timeout){
  $scope.buttonText = "ENTER";
  $scope.red = false;
  $scope.login = {};

  $scope.loginAdmin = function(){
    if ($scope.login.password) {
      // call factory method to log in admin
      loginFactory.login($scope.login, function(output){
        if(output.status == 200){
          // good ======
          $location.url('/dashboard');
        } else {
          // bad ======
          document.getElementById("pass").focus();
          $scope.buttonText = "NOPE";
          $scope.red = true;
          $timeout(revertRed, 100);
          $timeout(revert, 1000);
        }
      });
      // clear input
      $scope.login = {};
    } else {
      // bad ======
      document.getElementById("pass").focus();
      $scope.buttonText = "NOPE";
      $scope.red = true;
      $timeout(revertRed, 100);
      $timeout(revert, 1000);
    }
  }

  $scope.myFunct = function(keyEvent) {
  if (keyEvent.which === 13)
    $scope.loginAdmin();
  }

  function revert(){
    $scope.buttonText = "ENTER";
  }
  function revertRed(){
    $scope.red = false;
  }

});


app.controller('dashboardController', function($scope, loginFactory, $location, trackFactory){

  // authenticate user =================================
  // loginFactory.auth(function(output){
  //   if(output.status == 200){
  //     // good ======
  //     console.log("hi");
  //   } else {
  //     // bad ======
  //     console.log("bye");
  //     $location.url('/');
  //   }
  // });
  // ===================================================

  $scope.leftTitle = "Tracks";
  $scope.rightTitle = "Algos";
  $scope.showAddBG = false;
  $scope.newTrack = {};
  $scope.newAlgo = {};
  $scope.selectedTrack = {};


  $scope.selectedAlgo = {};
  $scope.editAlgo = false;



  $scope.editTrack = false;

  $scope.showAddAlgo = false;

  var selectedTrackIndex;

  $scope.tracks = [];
  $scope.algosToShow = [];
  // Get all tracks
  function getAllTracks(callback){
    trackFactory.getAllTracks(function(output){
      $scope.tracks = output;
      console.log($scope.tracks);
      if(typeof callback === "function"){
        callback();
      }
    })
  }
  getAllTracks();







  $scope.addTrack = function(){
    console.log("add track btn pressed");
    $scope.showAddAlgo = false;
    $scope.editTrack = false;
    $scope.newTrack = {};
    if(!$scope.showAddBG){
      $scope.showAddBG = true;
    }
  }
  $scope.editTrackk = function(){
    console.log("edit track btn pressed");
    $scope.editTrack = true;
    $scope.editAlgo = false;
    $scope.showAddAlgo = false;

    $scope.newTrack = {};


    $scope.newTrack = $scope.selectedTrack;




    $scope.focusT = true;
    $scope.focusD = true;
    $scope.focusP = true;

    if(!$scope.showAddBG){
      $scope.showAddBG = true;
    }
  }
  $scope.addAlgo = function(){
    console.log("add algo btn pressed");
    $scope.showAddAlgo = true;
    $scope.editAlgo = false;

    if(!$scope.showAddBG){
      $scope.showAddBG = true;
    }
  }

  $scope.cancelAdd = function(){
    if($scope.showAddBG){
      $scope.showAddBG = false;

      // Reset stuffs
      $scope.editTrack = false;
      $scope.editAlgo = false;
      $scope.newAlgo = {};


    }
  }

  $scope.$watch('repair.test', function(newvalue,oldvalue) {
    console.log('hi');
  });


  $scope.addTrackSubmit = function(){
    console.log($scope.newTrack);

    if($scope.editTrack){
      $scope.newTrack._id = $scope.selectedTrack._id;
      // Call factory method to edit track
      trackFactory.editTrack($scope.newTrack, function(output){
        console.log("Successfully edited track");
        console.log(output.status);
        if (output.status == 200){
          if($scope.showAddBG){
            $scope.showAddBG = false;
          }
          getAllTracks();
        } else {
          // Some error in the back-end occurred
          console.log("ERROR!");
        }
      });
    } else {
      // Call factory method to add new track
      trackFactory.submitNewTrack($scope.newTrack, function(output){
        console.log("Successfully added a new track");
        console.log(output.status);
        if (output.status == 200){
          if($scope.showAddBG){
            $scope.showAddBG = false;
          }
          getAllTracks();
        } else {
          // Some error in the back-end occurred
          console.log("ERROR!");
        }
      });
    }

    $scope.newTrack = {};


  }

  $scope.selectTrack = function(track, index){
    $scope.selectedTrack = track;
    $scope.algosToShow = $scope.selectedTrack._algos;
    selectedTrackIndex = index;
    console.log(track);
    console.log(selectedTrackIndex);
  }

  $scope.deleteTrack = function(){

    console.log("track ---> " + $scope.editTrack);
    console.log("algo ---> " + $scope.editAlgo);

    if($scope.editTrack){
      // Delete Track
      if (confirm('Are you sure you would like to delete the '+$scope.selectedTrack.title+' track from the database?')) {
        trackFactory.deleteTrack($scope.selectedTrack, function(output){
          console.log("Successfully deleted track");
          console.log(output.status);
          if (output.status == 200){
            if($scope.showAddBG){
              $scope.showAddBG = false;
            }
            getAllTracks();
          } else {
            // Some error in the back-end occurred
            console.log("ERROR!");
          }
        });
      } else {
        console.log("nope");
      }
    } else if($scope.editAlgo){
      // Delete Algo
      if (confirm('Are you sure you would like to delete the '+$scope.selectedAlgo.title+' algo from the database?')) {
        trackFactory.deleteAlgo($scope.selectedAlgo, function(output){
          console.log("Successfully deleted algo");
          console.log(output.status);
          if (output.status == 200){
            if($scope.showAddBG){
              $scope.showAddBG = false;
            }
            // getAllTracks and reset the show algo data for that track
            getAllTracks(function(){
              console.log("running callback");
              $scope.algosToShow = $scope.tracks[selectedTrackIndex]._algos;
            });
          } else {
            // Some error in the back-end occurred
            console.log("ERROR!");
          }
        });
      } else {
        console.log("nope");
      }

    }

  }



  $scope.addAlgoSubmit = function(){


    if($scope.editAlgo){
      console.log("Editing Algo");

      // Call factory method to edit algo
      trackFactory.editAlgo($scope.newAlgo, function(output){
        console.log("Successfully edited algo");
        console.log(output.status);
        if (output.status == 200){
          if($scope.showAddBG){
            $scope.showAddBG = false;
          }
          // getAllTracks and reset the show algo data for that track
          getAllTracks(function(){
            console.log("running callback");
            $scope.algosToShow = $scope.tracks[selectedTrackIndex]._algos;
          });
        } else {
          // Some error in the back-end occurred
          console.log("ERROR!");
        }
      });


    } else {

      // Call factory method to add new algo
      $scope.newAlgo.track_id = $scope.selectedTrack._id;

      trackFactory.submitNewAlgo($scope.newAlgo, function(output){
        console.log("Successfully added a new algo");
        console.log(output.status);
        if (output.status == 200){
          if($scope.showAddBG){
            $scope.showAddBG = false;
          }
          // getAllTracks and reset the show algo data for that track
          getAllTracks(function(){
            console.log("running callback");
            $scope.algosToShow = $scope.tracks[selectedTrackIndex]._algos;
          });
        } else {
          // Some error in the back-end occurred
          console.log("ERROR!");
        }
      });
    }

    $scope.newAlgo = {};


  } // end addAlgoSubmit

  $scope.selectAlgo = function(algo){

    $scope.editAlgo = true;
    $scope.selectedAlgo = algo;
    $scope.newAlgo = algo;
    console.log($scope.selectedAlgo);
    if(!$scope.showAddBG){
      $scope.showAddBG = true;
    }





  }








}); // End dashboardController














// end
