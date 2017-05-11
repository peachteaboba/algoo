/**
 * Created by andyf on 3/02/17.
 */

app.factory('loginFactory', function ($http) {
    var factory = {};
    var token;


    // Login method
    factory.login = function(input, callback){
      $http.post('/loginAdmin', input).then(function(output){
        token = output.data.token;
        callback(output);
      });
    }

    // Set token from cookie
    factory.setToken = function(data, callback){
      token = data;
      callback();
    }

    // Login method
    factory.auth = function(callback){
      var obj = {};
      obj.token = token;

      $http.post('/authAdmin', obj).then(function(output){
        callback(output);
      });
    }



    return factory;
});




app.factory('trackFactory', function($http){
  var factory = {};

  factory.submitNewTrack = function(input, callback){
    $http.post('/tracks/new', input).then(function(output){
      callback(output);
    });
  }
  factory.submitNewAlgo = function(input, callback){
    $http.post('/algos/new', input).then(function(output){
      callback(output);
    });
  }

  factory.getAllTracks = function(callback){
    $http.get('/tracks/all').then(function(output){
      callback(output.data);
    });
  }

  factory.deleteTrack = function(input, callback){
    $http.post('/tracks/delete', input).then(function(output){
      callback(output);
    });
  }

  factory.editTrack = function(input, callback){
    $http.post('/tracks/edit', input).then(function(output){
      callback(output);
    });
  }

  factory.editAlgo = function(input, callback){
    $http.post('/algos/edit', input).then(function(output){
      callback(output);
    });
  }

  factory.deleteAlgo = function(input, callback){
    $http.post('/algos/delete', input).then(function(output){
      callback(output);
    });
  }



  return factory;
});


















// end
