"use strict";

var mongoose = require('mongoose');

var StationSchema = new mongoose.Schema({
   "FDID": String,
   "Fire dept name": String,
   "HQ addr1": String,
   "HQ addr2": String,
   "HQ city": String,
   "HQ state": String,
   "HQ zip": Number,
   "HQ phone": String,
   "HQ fax": String,
   "County": String,
   "Dept Type": String,
   "Organization Type": String,
   "Website": String,
   "Number Of Stations": Number,
   "Active Firefighters - Career": Number,
   "Active Firefighters - Volunteer": Number,
   "Active Firefighters - Paid per Call": Number,
   "Non-Firefighting - Civilian": Number,
   "Non-Firefighting - Volunteer": Number,
   "Primary agency for emergency mgmt": String,
   "Latitude": Number,
   "Longitude": Number,
   "Accuracy Score": Number,
   "Accuracy Type": String,
   "Original FEMA dataset": String
}, { collection: "FEMA_stations" });

module.exports = StationSchema;