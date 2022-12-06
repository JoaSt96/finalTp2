const express = require('express')
const { check } = require('express-validator')
const { saveTemperature, getTemperaturesWithinRange } = require('../controllers/temperatureController')
const { validateFields } = require('../middleware/validate-fields')

const router = express.Router()

router.get(
  '/',
  [ validateFields ],
  getTemperaturesWithinRange
)

router.post('/',
  [
    check('magnitude', 'Magnitude is required').not().isEmpty(),
    check('unit', 'Unit is required').not().isEmpty(),
    check('unit', { errorMsg: 'Unit must be celsius, farenheit or kelvin' }).isIn([ 'celsius', 'farenheit', 'kelvin', 'Farenheit', 'Celsius', 'Kelvin' ]),
    validateFields
  ], saveTemperature)

module.exports = router
