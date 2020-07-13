'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require('mongoose');
var Geocodio = require('geocodio-library-node');
var StationSchema = require('./stationModel');

var Station = mongoose.model('Station', StationSchema, 'FEMA_stations');
var geocodio_api_key = '55fb5d6a4dee5cf4c25aaf48ea4528ad28acbb5';

// Shape of search object coming from front end:
var searchShape = {
   "search_type": 'or',
   simpleInputs: {
      "FDID": '',
      "Fire dept name": '',
      "HQ city": '',
      "HQ state": '',
      "HQ zip": '',
      "County": ''
   },
   arrays: {
      "Dept Type": [],
      "Organization Type": []
   },
   minmax: {
      "Number Of Stations": '',
      // "Number Of Stations min": '',
      // "Number Of Stations max": '',
      "Active Firefighters - Career": '',
      // "Active Firefighters - Career min": '',
      // "Active Firefighters - Career max": '',
      "Active Firefighters - Volunteer": '',
      // "Active Firefighters - Volunteer min": '',
      // "Active Firefighters - Volunteer max": '',
      "Active Firefighters - Paid per Call": '',
      // "Active Firefighters - Paid per Call min": '',
      // "Active Firefighters - Paid per Call max": '',
      "Non-Firefighting - Civilian": '',
      // "Non-Firefighting - Civilian min": '',
      // "Non-Firefighting - Civilian max": '',
      "Non-Firefighting - Volunteer": ''
      // "Non-Firefighting - Volunteer min": '',
      // "Non-Firefighting - Volunteer max": '',
   }
};

var getStations = exports.getStations = function getStations(req, res) {
   var _req$body = req.body,
       searchTerms = _req$body.searchTerms,
       newSearch = _req$body.newSearch;

   var north = void 0,
       south = void 0,
       east = void 0,
       west = void 0;
   if (req.body.coords) {
      north = req.body.coords.north;
      south = req.body.coords.south;
      east = req.body.coords.east;
      west = req.body.coords.west;
   }
   var search_type = searchTerms ? searchTerms.search_type || "$or" : "$or";

   // console.log('searchTerms \n', searchTerms)
   // console.log('"search_type" \n', search_type)

   // query variable represents part of query coming from search form
   // start query as object with either '$or' or '$and' property, which is an empty array
   var query = {};
   query[search_type] = [];

   // ----- Build Query from Search Terms coming in from req.body -------- //

   if (searchTerms) {

      // Get simple inputs
      for (var key in searchShape.simpleInputs) {
         if (searchTerms[key] !== "" && key !== "County") {
            query[search_type].push(_defineProperty({}, key, searchTerms[key].toString().replace(/ +/g, ' ')) // trim extra spaces if needed
            );
         }
         if (key === "County" && searchTerms.County !== "") {
            query[search_type].push({ '$or': [{ "County": searchTerms.County.replace(/ +/g, ' ') }, { "County": searchTerms.County.replace(/ +/g, ' ') + ' county' }] });
         }
      }

      // Only good accuracy scores
      query[search_type].push({ "Accuracy Score": { $gt: 0.5 } });

      // Get array inputs
      for (var key in searchShape.arrays) {
         if (searchTerms[key].length > 0) {
            (function () {
               var group = { '$or': [] };
               searchTerms[key].forEach(function (item) {
                  group.$or.push(_defineProperty({}, key, item));
               });
               query[search_type].push(group);
            })();
         }
      }

      // Get minmax inputs
      for (var key in searchShape.minmax) {

         if (searchTerms[key + ' min'] || searchTerms[key + ' max']) {
            var minmaxGroup = {};
            if (searchTerms[key + ' min']) {
               minmaxGroup['$gt'] = searchTerms[key + ' min'];
            }
            if (searchTerms[key + ' max']) {
               minmaxGroup['$lt'] = searchTerms[key + ' max'];
            }
            query[search_type].push(_defineProperty({}, key, minmaxGroup));
         }
      }
   } // if (searchTerms) end

   // Write query which is combination of bounds (if they exist), and searchTerms (if they exist)
   var totalQuery = {
      $and: []

      // Apply LatLng bounds
   };if (req.body.coords) {
      totalQuery.$and.push({
         $and: [{ Latitude: { $gt: south, $lt: north } }, { Longitude: { $gt: west, $lt: east } }]
      });
   }
   if (searchTerms) {
      totalQuery.$and.push(query);
   }

   // console.log('totalQuery \n', JSON.stringify(totalQuery, null, 2))

   Station.find(totalQuery).collation({ locale: 'en_US', strength: 2 }).then(function (docs) {
      return res.json({
         stations: docs,
         fitMapToResults: newSearch
      });
   }).catch(function (err) {
      return res.status(200).send(err);
   });
};

var geocodeStation = exports.geocodeStation = function geocodeStation(req, res) {

   var geocoder = new Geocodio(geocodio_api_key);

   geocoder.geocode({
      street: req.body["HQ addr1"],
      city: req.body["HQ city"],
      state: req.body["HQ state"],
      postal_code: req.body["HQ zip"]
   }).then(function (r) {
      res.status(200).send(r);
   }).catch(function (err) {
      console.log(err);
      res.status(404).send(err);
   });
};

var addstation = exports.addstation = function addstation(req, res) {

   var newStation = new Station(req.body);
   newStation["Original FEMA dataset"] = "No";

   newStation.save().then(function (r) {
      res.status(200).send(JSON.stringify(r));
   }).catch(function (error) {
      return console.log('Error saving:', error);
   });
};

var deleteStation = exports.deleteStation = function deleteStation(req, res) {
   var id = req.body.id;


   Station.deleteOne({ _id: id }).then(function (r) {
      return res.status(200).send(r);
   }).catch(function (error) {
      return console.log('Error deleting:', error);
   });
};

var editStation = exports.editStation = function editStation(req, res) {
   var _id = req.body._id;

   Station.updateOne({ _id: _id }, req.body).then(function (r) {
      res.status(200).send(r);
   }).catch(function (error) {
      console.log("Error editing", error);
      res.status(400).send(error);
   });
};