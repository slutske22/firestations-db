import mongoose from 'mongoose'
import { getStations } from './stationControllers'

function find (name, query, cb) {
   mongoose.connection.db.collection(name, function (err, collection) {
      collection.find(query).toArray(cb);
  });
}

const routes = app => {

   // Working:
   app.route('/api/findstationswithfind')
      .post( (req, res) => {

         find("FEMA_stations", req.body, (err, docs) => {
            console.log(err)
            res.err(err)
            res.json(docs)
         })

      })


      // Working:
      app.route('/api/getstations')
         .post(getStations)

}

export default routes