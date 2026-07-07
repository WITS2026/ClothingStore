import { mockClient } from "aws-sdk-client-mock";
import {
  DynamoDBDocumentClient,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { handler } from "./index.mjs";

const dynamoMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => {
  dynamoMock.reset();
  process.env.TABLE_NAME = "test-table";
});

test("returns 400 if userId or productId is missing", async () => {
  const event = {
    pathParameters: {
      userId: "123",
    },
  };

  const result = await handler(event);
  const body = JSON.parse(result.body);

  expect(result.statusCode).toBe(400);
  expect(body.message).toBe("userId and productId are required in the path");
  expect(dynamoMock.calls()).toHaveLength(0);
});

test("returns 404 if item is not found in cart", async () => {
  dynamoMock.on(GetCommand).resolves({});

  const event = {
    pathParameters: {
      userId: "123",
      productId: "shirt1",
    },
  };

  const result = await handler(event);
  const body = JSON.parse(result.body);

  expect(result.statusCode).toBe(404);
  expect(body.message).toBe("Item not found in cart");
  expect(body.userId).toBe("123");
  expect(body.productId).toBe("shirt1");

  expect(dynamoMock.commandCalls(GetCommand)).toHaveLength(1);
  expect(dynamoMock.commandCalls(DeleteCommand)).toHaveLength(0);
});

test("deletes item if it exists", async () => {
  const fakeItem = {
    PK: "CART#USER#123",
    SK: "PRODUCT#shirt1",
    productId: "shirt1",
    quantity: 1,
  };

  dynamoMock.on(GetCommand).resolves({
    Item: fakeItem,
  });

  dynamoMock.on(DeleteCommand).resolves({});

  const event = {
    pathParameters: {
      userId: "123",
      productId: "shirt1",
    },
  };

  const result = await handler(event);
  const body = JSON.parse(result.body);

  expect(result.statusCode).toBe(200);
  expect(body.message).toBe("Item deleted from cart");
  expect(body.deletedItem).toEqual(fakeItem);

  expect(dynamoMock.commandCalls(GetCommand)).toHaveLength(1);
  expect(dynamoMock.commandCalls(DeleteCommand)).toHaveLength(1);
});

test("returns 500 if DynamoDB fails", async () => {
  dynamoMock.on(GetCommand).rejects(new Error("DynamoDB error"));

  const event = {
    pathParameters: {
      userId: "123",
      productId: "shirt1",
    },
  };

  const result = await handler(event);
  const body = JSON.parse(result.body);

  expect(result.statusCode).toBe(500);
  expect(body.message).toBe("Server error");
  expect(body.error).toBe("DynamoDB error");
});