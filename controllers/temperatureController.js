const Temperature = require('../models/Temperature')


const saveTemperature = async (req, res) => {
  const { magnitude, unit } = req.body
  const temperature = new Temperature({ magnitude, unit })
  await temperature.save()

  switch (unit.toLowerCase()) {
    case 'celsius':
      if (magnitude < -273) {
        console.log(`send email, Temperature of ${magnitude} Celsius registered`)
      }
      break;
    case 'kelvin':
      if (magnitude < 0) {
        console.log(`send email, Temperature of ${magnitude} Kelvin registered`)
      }
      break

    case 'farenheit':
      if (magnitude < -460) {
        console.log(`send email, Temperature of ${magnitude} Farenheit registered`)
      }
      break
    default:
      break;
  }

  res.status(200).json({ temperature })
}


const getTemperaturesWithinRange = async (req, res) => {
  const { min, max } = req.query

  const temperatures = await Temperature.find({
    magnitude: {
      $gte: min,
      $lte: max
    }
  })
  res.status(200).json({ temperatures })
}

const getAllTemperatures = async (req, res) => {
  const temperatures = await Temperature.find()
  res.status(200).json({ temperatures })
}

module.exports = {
  saveTemperature,
  getTemperaturesWithinRange,
  getAllTemperatures
}