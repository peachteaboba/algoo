/**
 * Created by andyf on 2/27/17.
 */

// Require the controllers
var users = require('./../controllers/users.js');
var tracks = require('./../controllers/tracks.js');
var algos = require('./../controllers/algos.js');
var photos = require('./../controllers/photos.js');

// Define the routes
module.exports = function(app) {

    // User routes ===================================================
    app.post('/reg', function(req, res) {
      users.reg(req, res);
    });

    app.post('/login', function(req, res) {
        users.login(req, res);
    });

    app.post('/loginAdmin', function(req, res) {
        users.loginAdmin(req, res);
    });

    app.post('/authAdmin', function(req, res) {
        users.authAdmin(req, res);
    });

    app.post('/edit', function(req, res) {
      users.edit(req, res);
    });

    app.get('/leader', function(req, res) {
      users.getLeader(req, res);
    });

    app.get('/leader/:code', function(req, res) {
      users.getLeaderLocal(req, res);
    });




    // Track routes ===================================================
    app.post('/tracks/new', function(req, res) {
        tracks.addTrack(req, res);
    });

    app.get('/tracks/all', function(req, res) {
        tracks.getAllTracks(req, res);
    });

    app.post('/tracks/delete', function(req, res) {
        tracks.deleteTrack(req, res);
    });

    app.post('/tracks/edit', function(req, res) {
        tracks.editTrack(req, res);
    });


    // Algo routes ===================================================
    app.post('/algos/new', function(req, res) {
        algos.addAlgo(req, res);
    });

    app.post('/algos/edit', function(req, res) {
        algos.editAlgo(req, res);
    });

    app.post('/algos/delete', function(req, res) {
        algos.deleteAlgo(req, res);
    });

    app.get('/algos/count', function(req, res) {
        algos.getAlgoCount(req, res);
    });



    // Photo Routes ==============================================
    app.post('/photos/new', function(req, res) {
        photos.addPhoto(req, res);
    });

    app.post('/photos/delete', function(req, res) {
        photos.deletePhoto(req, res);
    });

    app.post('/photos/algo', function(req, res) {
        photos.getAlgoPhotos(req, res);
    });


};










 // end
