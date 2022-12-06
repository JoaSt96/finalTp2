const DB = require('../helpers/dbHelpers')
const express = require('express')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3030;
    this.path = {
      temperatures: '/api/temperatures',
    }

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  listen() {
    DB.connect().then(()=> {
      this.app.listen(this.port, () => {
        console.log(`Server listening on port ${this.port}`)
      })
    })
  }

  middlewares() {
    this.app.use(express.json({ extended: true }))
  }

  routes() {
    this.app.use(this.path.temperatures, require('../routes/temperatureRoute'))
  }
}

module.exports = Server
