const mongoose = require('mongoose')
import { StationSchema } from './stationModel'

const Station = mongoose.model('Station', StationSchema, 'FEMA_stations')

// Shape of search object coming from front end:
const searchShape = {
   "search_type": 'or',
   simpleInputs: {
      "FDID": '',
      "Fire dept name": '',
      "HQ city": '',
      "HQ state": '',
      "HQ zip": '',
      "County": '',
   },
   arrays: {
      "Dept Type": [],
      "Organization Type": [],
   },
   minmax: {
      "Number Of Stations": '',
      "Number Of Stations min": '',
      "Number Of Stations max": '',
      "Active Firefighters - Career": '',
      "Active Firefighters - Career min": '',
      "Active Firefighters - Career max": '',
      "Active Firefighters - Volunteer": '',
      "Active Firefighters - Volunteer min": '',
      "Active Firefighters - Volunteer max": '',
      "Active Firefighters - Paid per Call": '',
      "Active Firefighters - Paid per Call min": '',
      "Active Firefighters - Paid per Call max": '',
      "Non-Firefighting - Civilian": '',
      "Non-Firefighting - Civilian min": '',
      "Non-Firefighting - Civilian max": '',
      "Non-Firefighting - Volunteer": '',
      "Non-Firefighting - Volunteer min": '',
      "Non-Firefighting - Volunteer max": '',
   }
}



export const getStations = (req, res) => {

   const { searchTerms, newSearch } = req.body
   let north, south, east, west;
   if (req.body.coords) {
      north = req.body.coords.north
      south = req.body.coords.south
      east = req.body.coords.east
      west = req.body.coords.west
   }
   const search_type = searchTerms ? searchTerms.search_type || "$or" : "$or"

   console.log('searchTerms \n', searchTerms)
   // console.log('"search_type" \n', search_type)

   // query variable represents part of query coming from search form
   // start query as object with either '$or' or '$and' property, which is an empty array
   const query = {}
   query[search_type] = []


   // ----- Build Query from Search Terms coming in from req.body -------- //

   if (searchTerms) {

      // Get simple inputs
      for (var key in searchShape.simpleInputs) {
         if (searchTerms[key] !== "") {
            query[search_type].push(
               { [key]: searchTerms[key].toString().replace(/ +/g, ' ') } // trim extra spaces if needed
            ) 
         }
      }

      // Only good accuracy scores
      query[search_type].push(
         { "Accuracy Score": { $gt: 0.5 } }
      )

      // Get array inputs
      for (var key in searchShape.arrays) {
         console.log(key)
         if (searchTerms[key].length > 0){
            const group = { '$or': [] }
            searchTerms[key].forEach( item => {
               group.$or.push({
                  [key]: item
               })
            })
            query[search_type].push(group)
         }
      }

   } // if (searchTerms) end

   // Write query which is combination of bounds (if they exist), and searchTerms (if they exist)
   var totalQuery = {
      $and: []
   }

   if (req.body.coords){
      totalQuery.$and.push(
         {
            $and: [
               { Latitude: { $gt: south, $lt: north } },
               { Longitude: { $gt: west, $lt: east } }
            ]
         }
      )
   }
   if (searchTerms){
      totalQuery.$and.push(
         query
      )
   }
   

   // Apply LatLng bounds
   
   console.log('totalQuery \n', JSON.stringify(totalQuery, null, 2))
   
   Station.find(totalQuery).collation({ locale: 'en_US', strength: 2 })
      .then( docs => res.json({
         stations: docs,
         fitMapToResults: newSearch
      }))
      .catch( err => res.send(err) )

}