class Vehicle {
  constructor (attributes) {
    const timestamp = new Date().getTime();
    this.model = attributes.model;
    this.vehicle_class = attributes.vehicle_class;
    this.manufacturer = attributes.manufacturer;
    this.name = attributes.name;
    this.created = timestamp;
  }
}

module.exports = Vehicle
