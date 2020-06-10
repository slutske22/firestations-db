const express = require('express')
const mongoose = require('mongoose')
const Schema = require('./StationSchema')

const app = express()

const PORT = 3000

app.use(express.static('../client/dist'))






const uri = "mongodb+srv://slutske22:FSCluster@fscluster-tmsah.mongodb.net/FireStarter?retryWrites=true&w=majority";

mongoose.connect(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const db = mongoose.connection

db.once('open', function() {
  console.log('Connected to FireStarter DB Successfully')

  find("FEMA_stations", {"HQ city": "San Diego"}, (err, docs) => {
    console.dir(docs)
  })

});



function find (name, query, cb) {
    mongoose.connection.db.collection(name, function (err, collection) {
       collection.find(query).toArray(cb);
   });
}






app.listen(PORT, () => console.log(`Listening on port ${PORT}`)) 