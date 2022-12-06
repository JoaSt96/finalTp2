const mongoose = require("mongoose");

class DB {
  connect = () => {
    return new Promise((resolve) => {
      mongoose.connect('mongodb+srv://joaco:joaco1996@clusterfinaltp2.btukosz.mongodb.net/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const db = mongoose.connection;

      db.on("error", () => {
        console.error("Error al conectar la BD");
        resolve(db);
        process.exit(1);
      });

      db.once("open", function () {
        console.log("BD conectada");
        resolve(db);
      });
    });
  };

  async disconnect() {
    await mongoose.disconnect();
    console.log("BD desconectada");
  }
}

module.exports = new DB();