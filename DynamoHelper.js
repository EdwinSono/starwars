const AWS = require('aws-sdk');
const docDynamo = new AWS.DynamoDB.DocumentClient();
class DynamoHelper {
    saveData(table, item) {
        const params = {
            TableName: table,
            Item: item,
            // ConditionExpression : 'attribute_not_exists(name)',
        };

        return docDynamo.put(params).promise();
    }

    loadData(table) {
        const params = {
            TableName: table
        };

        return docDynamo.scan(params).promise();
    }
}

module.exports = DynamoHelper;
