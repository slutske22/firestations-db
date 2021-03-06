const mongoose = require('mongoose')
const Geocodio = require('geocodio-library-node')
const StationSchema = require('./stationModel')

const Station = mongoose.model('Station', StationSchema, 'FEMA_stations')
const geocodio_api_key = '55fb5d6a4dee5cf4c25aaf48ea4528ad28acbb5'



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
      "Non-Firefighting - Volunteer": '',
      // "Non-Firefighting - Volunteer min": '',
      // "Non-Firefighting - Volunteer max": '',
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

   // console.log('searchTerms \n', searchTerms)
   // console.log('"search_type" \n', search_type)

   // query variable represents part of query coming from search form
   // start query as object with either '$or' or '$and' property, which is an empty array
   const query = {}
   query[search_type] = []


   // ----- Build Query from Search Terms coming in from req.body -------- //

   if (searchTerms) {

      // Get simple inputs
      for (var key in searchShape.simpleInputs) {
         if (searchTerms[key] !== "" && key !== "County") {
            query[search_type].push(
               { [key]: searchTerms[key].toString().replace(/ +/g, ' ') } // trim extra spaces if needed
            ) 
         }
         if (key === "County" && searchTerms.County !== ""){
            query[search_type].push(
               { '$or': [
                  {"County": searchTerms.County.replace(/ +/g, ' ') },
                  {"County": `${searchTerms.County.replace(/ +/g, ' ')} county`}
               ] }
            )
         }
      }

      // Only good accuracy scores
      query[search_type].push(
         { "Accuracy Score": { $gt: 0.5 } }
      )

      // Get array inputs
      for (var key in searchShape.arrays) {
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

      // Get minmax inputs
      for (var key in searchShape.minmax) {

         if (searchTerms[`${key} min`] || searchTerms[`${key} max`]) {
            const minmaxGroup = {}
            if (searchTerms[`${key} min`]){
               minmaxGroup['$gt'] = searchTerms[`${key} min`]
            }
            if (searchTerms[`${key} max`]) {
               minmaxGroup['$lt'] = searchTerms[`${key} max`]
            }
            query[search_type].push({[key]: minmaxGroup})
         }

      }

   } // if (searchTerms) end

   // Write query which is combination of bounds (if they exist), and searchTerms (if they exist)
   var totalQuery = {
      $and: []
   }

   // Apply LatLng bounds
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
      
   // console.log('totalQuery \n', JSON.stringify(totalQuery, null, 2))
   
   Station.find(totalQuery).collation({ locale: 'en_US', strength: 2 })
      .then( docs => res.json({
         stations: docs,
         fitMapToResults: newSearch
      }))
      .catch( err => res.status(200).send(err) )

}


export const geocodeStation = (req, res) => {

   const geocoder = new Geocodio(geocodio_api_key)

   geocoder.geocode({
      street: req.body["HQ addr1"],
      city: req.body["HQ city"],
      state: req.body["HQ state"],
      postal_code: req.body["HQ zip"]
   })
      .then( r => {
         res.status(200).send(r)
      })
      .catch( err => {
         console.log(err)
         res.status(404).send(err)
      })

}




export const addstation = (req, res) => {

   const newStation = new Station(req.body)
   newStation["Original FEMA dataset"] = "No"

   newStation.save()
      .then( r => {
         res.status(200).send(JSON.stringify(r))
      })
      .catch( error => console.log('Error saving:', error) )

}



export const deleteStation = (req, res) => {

   const { id } = req.body

   Station.deleteOne({ _id: id })
      .then( r => res.status(200).send(r) )
      .catch( error => console.log('Error deleting:', error) )

}

export const editStation = (req, res) => {

   const { _id } = req.body
   Station.updateOne( { _id }, req.body )
      .then( r => {
         res.status(200).send(r)
      })
      .catch( error => {
         console.log("Error editing", error)
         res.status(400).send(error)
      })

}