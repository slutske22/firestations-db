const mongoose = require('mongoose')

export const StationSchema = new mongoose.Schema({
   "FDID": String,
   "Fire dept name": String,
   "HQ addr1": String,
   "HQ addr2": String,
   "HQ city": String,
   "HQ state": String,
   "HQ zip": String,
   "HQ phone": String,
   "HQ fax": String,
   "County": String,
   "Dept Type": String,
   "Organization Type": String,
   "Website": String,
   "Number Of Stations": String,
   "Number Of Stations": String,
   "Active Firefighters - Career": String,
   "Active Firefighters - Volunteer":  String,
   "Active Firefighters - Paid per Call": String,
   "Non-Firefighting - Civilian": String,
   "Non-Firefighting - Volunteer": String,
   "Primary agency for emergency mgmt": String,
   "Latitude:": Number,
   "Longitude:": Number,
   "Accuracy Score": Number,
   "Accuracy Type": String
}, {collection: "FEMA_stations"}) 