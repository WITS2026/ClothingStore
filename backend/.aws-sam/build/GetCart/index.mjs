import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME;

const response = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
  },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  const userId = event.pathParameters?.userId;

  if (event.requestContext?.http?.method === "OPTIONS") {
    return response(200, {});
  }

  try {
    const result = await dynamo.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
        ExpressionAttributeValues: {
          ":pk": `CART#USER#${userId}`,
          ":sk": "PRODUCT#",
        },
      })
    );
    console.log(event.pathParameters);
    return response(200, {
      items: result.Items || [],
    });
  } catch (error) {
    console.log(error.message);
    return response(500, {
      message: "Could not get cart",
      error: error.message,
    });
  }
};