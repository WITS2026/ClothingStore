import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

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

export const handler = async (event) => {
  try {
    const { userId, productId } = event.pathParameters || {};

    if (!userId || !productId) {
      return response(400, {
        message: "userId and productId are required in the path",
      });
    }

    const PK = `CART#USER#${userId}`;
    const SK = `PRODUCT#${productId}`;

    console.log("Looking for item with PK:", PK, "and SK:", SK);
    // Check if item exists
    const existingItem = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: {
          PK,
          SK,
        },
      })
    );

    if (!existingItem.Item) {
      return response(404, {
        message: "Item not found in cart",
        userId,
        productId,
      });
    }

    // Delete item
    await docClient.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: {
          PK,
          SK,
        },
      })
    );

    return response(200, {
      message: "Item deleted from cart",
      deletedItem: existingItem.Item,
    });
  } catch (err) {
    console.error(err);

    return response(500, {
      message: "Server error",
      error: err.message,
    });
  }
};