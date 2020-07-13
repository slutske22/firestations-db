import mongoose from 'mongoose'
import { getStations, geocodeStation, addstation, deleteStation, editStation } from './stationControllers'

const routes = app => {

      // Get statoins list from DB:
      app.route('/api/getstations')
         .post(getStations)

      // Geocode a station with GeoCodio:
      app.route('/api/geocodestation')
         .post(geocodeStation)

      // Add station to DB:
      app.route('/api/addstation')
         .post(addstation)

      // Delete station from DB:
      app.route('/api/deleteStation')
         .post(deleteStation)

      app.route('/api/editStation')
         .post(editStation)

}

module.exports = routes