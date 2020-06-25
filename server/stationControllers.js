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

   const { searchTerms, coords: { north, south, east, west } } = req.body
   const search_type = searchTerms ? searchTerms.search_type || "$or" : "$or"

   console.log('searchTerms \n', searchTerms)
   // console.log('"search_type" \n', search_type)

   // start query as object with either '$or' or '$and' property, which is an empty array
   const query = {}
   query[search_type] = []

   query[search_type].push({
      $and: [
         { Latitude: { $gt: south, $lt: north } },
         { Longitude: { $gt: west, $lt: east } }
      ]      
   })

   // const query = {
   //    Latitude: { $gt: south, $lt: north },
   //    Longitude: { $gt: west, $lt: east }
   // }


   // ----- Build Query from Search Terms coming in from req.body -------- //

   if (searchTerms) {

      // Get simple inputs
      for (var key in searchShape.simpleInputs) {
         if (searchTerms[key] !== "") {
            query[search_type].push(
               { [key]: searchTerms[key] }
            ) 
         }
      }

      // Get array inputs
      for (var key in searchShape.arrays) {
         console.log(key)
         // if (searchTerms[key].length > 0){
         //    const group = { '$or': [] }
         //    searchTerms[key].forEach( item => {
         //       group.$or.push({
         //          [key]: searchTerms[key]
         //       })
         //    })
         //    query[search_type].push(group)
         // }
      }

   } // if (searchTerms) end
   

   // Apply LatLng bounds
   
   console.log('query \n', query)

   Station.find(query, (err, Station) => {
      if (err) {
         res.send(err)
      }
      // console.log('Station', Station)
      res.json(Station)
   })

}