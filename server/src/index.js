import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import routes from './routes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname, '../../client/dist')))
console.log(__dirname)

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


app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'))
})


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
}) 