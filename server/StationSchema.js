const mongoose = require('mongoose')

export const stationSchema = new mongoose.Schema({
   "FDID": Number,
   "Fire dept name": String,
   "HQ addr1": String,
   "HQ city": String,
   "HQ state": String,
   "HQ zip": String,
   "HQ phone": String,
   "County": String,
   "Dept Type": String,
   "Website": String,
   "Number Of Stations": Number,
   "Active FF - Career": Number,
   "Active FF - Volunteer": Number,
   "Active FF - Paid per Call": Number,
   "Non-FF - Civilian": Number,
   "Non-Firefighting - Volunteer": Number,
   "Primary agency for emergency mgmt": String,
   "lat": Number,
   "lng": Number,
   "Accuracy Score": Number
}) 