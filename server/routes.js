import mongoose from 'mongoose'
import { getStations, geocodeStation, addstation } from './stationControllers'

// function find (name, query, cb) {
//    mongoose.connection.db.collection(name, function (err, collection) {
//       collection.find(query).toArray(cb);
//   });
// }

const routes = app => {

   // Working:
   // app.route('/api/findstationswithfind')
   //    .post( (req, res) => {

   //       find("FEMA_stations", req.body, (err, docs) => {
   //          console.log(err)
   //          res.err(err)
   //          res.json(docs)
   //       })

   //    })


      // Get statoins list from DB:
      app.route('/api/getstations')
         .post(getStations)

      // Geocode a station with GeoCodio:
      app.route('/api/geocodestation')
         .post(geocodeStation)

      // Add station to DB:
      app.route('/api/addstation')
         .post(addstation)

}

export default routes