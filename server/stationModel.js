const mongoose = require('mongoose')

export const StationSchema = new mongoose.Schema({
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
   "Active Firefighters - Volunteer":  Number,
   "Active Firefighters - Paid per Call": Number,
   "Non-Firefighting - Civilian": Number,
   "Non-Firefighting - Volunteer": Number,
   "Primary agency for emergency mgmt": Boolean,
   "Latitude:": Number,
   "Longitude:": Number,
   "Accuracy Score": Number,
   "Accuracy Type": String
}, {collection: "FEMA_stations"}) 