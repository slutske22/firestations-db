const mongoose = require('mongoose')
import { StationSchema } from './stationModel'

const Station = mongoose.model('Station', StationSchema, 'FEMA_stations')



export const getStations = (req, res) => {

   const { north, south, east, west } = req.body.coords
   const { searchTerms } = req.body

   const query = {
      Latitude: { $gt: south, $lt: north },
      Longitude: { $gt: west, $lt: east }
   }

   Station.find(query, (err, Station) => {
      if (err) {
         res.send(err)
      }
      // console.log('Station', Station)
      res.json(Station)
   })

}