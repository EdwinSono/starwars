const VehicleDTO = require('./vehicleDTO')

class VehicleDTOList {
  constructor () {
    this.vehicles = []
  }
  list(vehicles) {
    vehicles.forEach(element => {
      this.vehicles.push(new VehicleDTO(element))
    });
    return this.vehicles;
  }
}

module.exports = VehicleDTOList
