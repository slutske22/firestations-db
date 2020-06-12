import mongoose from 'mongoose'

function find (name, query, cb) {
   mongoose.connection.db.collection(name, function (err, collection) {
      collection.find(query).toArray(cb);
  });
}

const routes = app => {

   app.route('/api/findstations')
      .post( (req, res) => {

         find("FEMA_stations", req.body, (err, docs) => {
            console.log(err)
            res.err(err)
            res.json(docs)
         })

      })

   app.route('/api/test')
      .post( (req, res) => {

         console.log(req.body)

         const { north, south, east, west } = req.body.coords

         const query = {
            lat: { $gt: south },
            lat: { $lt: north },
            lng: { $gt: east },
            lng: { $gt: west }
         }

         find("FEMA_stations", {"HQ city": "San Diego"}, (err, docs) => {
            console.log(err)
            res.json(docs)
         })

      })

}

export default routes