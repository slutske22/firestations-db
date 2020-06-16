import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes'

const app = express()
const PORT = 8080

app.use(express.static('../client/dist'))


// mongo connection:
const uri = "mongodb+srv://slutske22:FSCluster@fscluster-tmsah.mongodb.net/FireStarter?retryWrites=true&w=majority";

mongoose.connect(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const db = mongoose.connection

db.once('open', function() {
  console.log('Connected to FireStarter DB Successfully')

});


// body parser setup:
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// CORS setup
app.use(cors())


// routes setup
routes(app)




app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
}) 