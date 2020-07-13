'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _stationControllers = require('./stationControllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = function routes(app) {

   // Get statoins list from DB:
   app.route('/api/getstations').post(_stationControllers.getStations);

   // Geocode a station with GeoCodio:
   app.route('/api/geocodestation').post(_stationControllers.geocodeStation);

   // Add station to DB:
   app.route('/api/addstation').post(_stationControllers.addstation);

   // Delete station from DB:
   app.route('/api/deleteStation').post(_stationControllers.deleteStation);

   app.route('/api/editStation').post(_stationControllers.editStation);
};

module.exports = routes;