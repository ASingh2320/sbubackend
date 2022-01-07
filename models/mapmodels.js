/**
 * Import mongoose
 * Connect to mongo database using link to mongoose database
 */
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to MongoDB...')

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


/**
 * Schemas for buildings, entrances, floors, and rooms to be used for formatting data
 */
const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    block: [Number],
    door: [Number],
})
const Room = mongoose.model('Room', roomSchema)

const floorSchema = new mongoose.Schema({
    level: {
        type: String,
        required: true,
    },
    hallway: [Number],
    rooms: [roomSchema],
})
const Floor = mongoose.model('Floor', floorSchema)

const entranceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    coordinates: [Number]
})
const Entrance = mongoose.model('Entrance', entranceSchema)

const buildingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    entrances: [entranceSchema],
    floors: [floorSchema],
})

const Building = mongoose.model('Building', buildingSchema)

module.exports = {Room, Floor, Entrance, Building}