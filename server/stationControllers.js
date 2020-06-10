const mongoose = require('mongoose')
import { StationSchema } from './stationModel'

const Station = mongoose.model('Station', StationSchema)



export const getStations = (req, res) => {

   let search = req.body


   Station.find(search, (err, Player) => {
      if (err) {
         res.send(err)
      }
      res.json(Station)
   })

}