const fs = require("fs");
const multer = require("multer");
const path = require("path");

class DataAccessor {
  /**
   * @param data
   * @param path
   */

  constructor(type) {
    this.path = `./data/${type}.json`;
    this.data = JSON.parse(readFile(this.path));
  }

  find(id) {
    let record = this.data.filter((element) => element["id"] == id); //fix id.id

    if (record.length < 1) {
      record = null;
    } else {
      record = record[0];
    }

    return record;
  }

  where(key, value) {
    const keyParts = key.split(".");

    let record = this.data.filter((element) => {
      // If the keyParts length is 1, it's an unnested property
      if (keyParts.length === 1) {
        // Access the direct property
        return element[key]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      } else {
        // Access nested properties
        let nestedValue = keyParts.reduce(
          (obj, keyPart) => obj && obj[keyPart],
          element
        );
        return (
          nestedValue &&
          nestedValue.toString().toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    return record;
  }

  create(json) {
    const existing_ids = this.data.map(({ id }) => id);
    let max_id = Math.max(...existing_ids);
    let new_id = max_id + 1;

    json["id"] = new_id;

    this.data.push(json);
    this.save();

    return json;
  }

  update(json) {
    let record = this.find(json["id"]);
    const existing_ids = this.data.map(({ id }) => id);
    let index = existing_ids.indexOf(record["id"]);

    this.data[index] = json;
    this.save();
    return json;
  }

  delete(id) {
    let record = this.find(id);
    record["deleted"] = "true";

    this.save();
  }

  delete_session(id) {
    let record = this.find(id);
    const existing_ids = this.data.map(({ id }) => id);
    let index = existing_ids.indexOf(record["id"]);

    this.data.splice(index, 1);
    this.save();
  }

  save() {
    writeFile(this.path, this.data);
    this.reload_data();
  }

  reload_data() {
    this.data = JSON.parse(readFile(this.path));
  }

  all() {
    return this.data;
  }
}

function readFile(path) {
  return fs.readFileSync(path, "utf8", (error) => {
    if (error) {
      throw error;
    }
  });
}

function writeFile(path, data) {
  fs.writeFileSync(path, JSON.stringify(data), (error) => {
    if (error) {
      throw error;
    }
  });
}

module.exports = DataAccessor;
