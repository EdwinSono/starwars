'use strict';
const DynamoHelper = require('./infra/dynamoHelper');
const Vehicle = require('./domain/vehicle');
const VehicleDTOList = require('./domain/vehicleDTOList');
const dynamo = new DynamoHelper;
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
}
const TABLE = 'vehicles'

module.exports.list = async (event) => {
  try {
    const data = await dynamo.loadData(TABLE);
    const vehicleDTOList = new VehicleDTOList();
    const body = {vehicles: vehicleDTOList.list(data.Items)};
    return sendResponse(200, body, headers);
  } catch (e) {
      console.error('Error retrieving vehicles', e);
      return sendResponse(500, {message: 'Internal server error'}, headers);
  }
  return sendReponse(code, body, heardes)
};

module.exports.save = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const vehicle = new Vehicle(body);
    await dynamo.saveData(TABLE, vehicle);
    return sendResponse(200, {message: 'Vehicle saved correctly'}, headers);
  } catch (e) {
    console.error('Error saving vehicle', e);
    if (e.name === 'ConditionalCheckFailedException') {
      return sendResponse(409, {message: 'Vehicles already exists'}, headers);
    } else {
      return sendResponse(500, {message: 'Internal server error'}, headers);
    }
  }
  return sendReponse(code, body, heardes)
};

/**
 * Function to send response to client
 * @param statusCode {number}
 * @param body {*}
 * @param headers {*}
 * @returns {{statusCode: *, headers: string, body: *}}
 */
 const sendResponse = (statusCode, body, headers = '') => {
  const response = {
      statusCode: statusCode,
      headers: headers,
      body: JSON.stringify(body)
  };

  return response;
};
