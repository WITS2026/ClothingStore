import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME;

const response = (statusCode, body) => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
  },
  body: JSON.stringify(body),
});

export const handler = async () => {
  try {
    const result = await dynamo.send(
      new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: "begins_with(PK, :product)",
        ExpressionAttributeValues: {
          ":product": "PRODUCT#",
        },
      })
    );

    return response(200, {
      products: result.Items || [],
    });
  } catch (error) {
    console.error(error);

    return response(500, {
      message: "Failed to retrieve products",
      error: error.message,
    });
  }
};