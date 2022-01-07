//M
/**
 * Import Mongo models and constant from env
 */
require('dotenv').config()
const {Room, Floor, Entrance, Building} = require('../models/mapmodels.js')

//E
//Import express

const express = require('express')
const app = express()
app.use(express.json())

/**
 * Middleware to log request on console when it comes in
 */
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

app.use(requestLogger)

const cors = require('cors')

app.use(cors())

//default get request
  app.get('/', (request, response) => {
    response.send('<h1>It Works!</h1>')
  })

  //Get request returns all buildings in the database
  app.get('/api/buildings', (request, response) => {
    Building.find({}).then(buildings => {
      response.json(buildings)
    })
  })

  //Post request to add buildings into the database
  app.post('/api/buildings', (request, response, next) => {
    const body = request.body
    const building = new Building(body)
    building.save()
    .then(savedBuild => {
      response.json(savedBuild.toJSON())
    })
    .catch(error => next(error))
  })

  //Middleware if request is sent to an invalid endpoint
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

  //Error handler, not really used. Only added so when more requests are written, it can be propoerly used
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  app.use(errorHandler)
  

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})