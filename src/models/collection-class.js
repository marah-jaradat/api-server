"use strict";
class collection {
  constructor(model) {
    this.model = model;
  }

  async createRecord(body) {
    console.log("model is", this.model);
    try {
      return await this.model.create(body);
    } catch (error) {
      console.error(
        "not able to create a new record for model: ",
        this.model.name
      );
    }
  }

  async readRecord(id) {
    try {
      if (id) {
        return await this.model.findOne({ where: { id: id } });
      } else {
        return await this.model.findAll();
      }
    } catch (error) {
      console.error("error in reading record(s) for model: ", this.model.name);
    }
  }
  async updateRecord(body, id) {
    try {
      if ((body, id)) {
        return await this.model.update(body, {
          where: { id: id },
          returning: true,
        });
      }
    } catch (error) {
      console.error("error in updating record(s) for model: ", this.model.name);
    }
  }
  async deleteRecord(id) {
    try {
      if (id) {
        return await this.model.destroy({ where: { id: id } });
      }
    } catch (error) {
      console.error("error in removing record(s) for model: ", this.model.name);
    }
  }
}

module.exports = collection;
