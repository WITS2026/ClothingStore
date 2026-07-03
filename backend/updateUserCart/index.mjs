import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  UpdateCommand,
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
    const body = JSON.parse(event.body || "{}");

    if (!body.productId || !body.name || body.price === undefined) {
      return response(400, {
        message: "Missing productId, name, or price",
      });
    }

    const quantityToAdd = body.quantity ? Number(body.quantity) : 1;

    const result = await dynamo.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: {
          PK: `CART#USER#${userId}`,
          SK: `PRODUCT#${body.productId}`,
        },
        UpdateExpression: `
          SET productId = :productId,
              #name = :name,
              price = :price,
              color = :color,
              quantity = if_not_exists(quantity, :zero) + :quantityToAdd
        `,
        ExpressionAttributeNames: {
          "#name": "name",
        },
        ExpressionAttributeValues: {
          ":productId": body.productId,
          ":name": body.name,
          ":price": Number(body.price),
          ":color": body.color || "",
          ":quantityToAdd": quantityToAdd,
          ":zero": 0,
        },
        ReturnValues: "ALL_NEW",
      })
    );

    const cartProduct = result.Attributes;

    return response(200, {
      message: "Product added to cart",
      cartProduct,
    });
  } catch (error) {
    return response(500, {
      message: "Could not add product to cart",
      error: error.message,
    });
  }
};