const express = require('express')
const mongoose = require('mongoose')

const app = express()

const PORT = 3000

app.use(express.static('../client/dist'))

const uri = "mongodb+srv://slutske22:FSCluster@fscluster-tmsah.mongodb.net/FSCluster?retryWrites=true&w=majority";
mongoose.connect(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});
const db = mongoose.connection
db.once('open', function() {
  console.log('Connected to FSCluster DB Successfully')
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`)) 