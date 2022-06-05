import Sequelize from "sequelize";
import mongoose from "mongoose";

import User from "../app/models/User";
import File from "../app/models/File";
import Appointments from "../app/models/Appointment";
import databaseConfig from "../config/database";

const models = [User, File, Appointments];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  async mongo() {
    this.mongoConnection = await mongoose.connect(
      "mongodb://localhost:27017/sistemadeagendamento",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );


    // const conn = await mongoose
    //   .createConnection("mongodb://localhost:27017/sistemadeagendamento")
    //   .asPromise();
    // console.log(conn.readyState);
  }
}

export default new Database();
