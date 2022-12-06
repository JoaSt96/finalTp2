const { Schema, model } = require('mongoose')


const TemperatureSchema = Schema({
  magnitude: {
    type: Number,
    required: [ true, 'La magnitud es obligatoria' ]
  },
  unit: {
    type: String,
    required: [ true, 'La unidad es obligatoria' ]
  }
})

module.exports = model('Temperature', TemperatureSchema)
