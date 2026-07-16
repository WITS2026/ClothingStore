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
    const claims = event.requestContext?.authorizer?.jwt?.claims;
    const userId = claims?.sub;
    const { productId } = event.pathParameters || {};

    if (!productId) {
      return response(400, {
        message: "productId is required in the path",
      });
    }

    const PK = `CART#USER#${userId}`;
    const SK = `PRODUCT#${productId}`;

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
