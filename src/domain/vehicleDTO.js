class VehicleDTO {
  constructor (obj) {
    return {
      "modelo": obj.model,
      "creado_en": new Date(obj.created),
      "clase": obj.vehicle_class,
      "fabricante": obj.manufacturer,
      "nombre": obj.name
    }
  }
}

module.exports = VehicleDTO
