'use strict';
const DynamoHelper = require('./DynamoHelper');
const dynamo = new DynamoHelper;
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
}
const TABLE = 'vehicles'

module.exports.vehicles = async (event) => {
  if (event.httpMethod === 'GET') {
    console.log('Get requested')
    try {
      const data = await dynamo.loadData(TABLE);
      console.log('Data read correctly');
      const body = JSON.stringify({
         items: data.Items
      });
      return sendResponse(200, body, headers);
    } catch (e) {
        console.error('Error retrieving vehicles', e);
        return sendResponse(500, JSON.stringify({
            message: 'Internal server error'
        }), headers);
    }
    return sendReponse(code, body, heardes)
  }

  if (event.httpMethod === 'POST') {
    console.log('Post requested')
    try {
      const body = JSON.parse(event.body);
      const timestamp = new Date().getTime();
      const item = {
        name: body.name,
        model: body.model,
        vehicle_class: body.vehicle_class,
        manufacturer: body.manufacturer,
        created: timestamp
      };

      await dynamo.saveData(TABLE, item);
      console.log('Vehicle saved correctly');
      return sendResponse(200, JSON.stringify({
          message: 'Vehicle saved correctly'
      }), headers);
    } catch (e) {
        console.error('Error saving vehicle', e);
        if (e.name === 'ConditionalCheckFailedException') {
            return sendResponse(409, JSON.stringify({
                message: 'Vehicles already exists'
            }), headers);
        } else {
            return sendResponse(500, JSON.stringify({
                message: 'Internal server error'
            }), headers);
        }
    }
    return sendReponse(code, body, heardes)
  }
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
      body: body
  };

  return response;
};
