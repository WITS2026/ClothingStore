import { mockClient } from "aws-sdk-client-mock";
import {
  DynamoDBDocumentClient,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { handler } from "./index.mjs";

const dynamoMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => {
  dynamoMock.reset();
  process.env.TABLE_NAME = "test-table";
});

test("returns an empty array if the cart has no items", async () => {
  dynamoMock.on(QueryCommand).resolves({});

  const event = {
    pathParameters: {
      userId: "123",
    },
    requestContext: {
      http: {
        method: "GET",
      },
    },
  };

  const result = await handler(event);
  const body = JSON.parse(result.body);

  expect(result.statusCode).toBe(200);
  expect(body.items).toEqual([]);
});

test("handles OPTIONS request for CORS", async () => {
  const event = {
    requestContext: {
      http: {
        method: "OPTIONS",
      },
    },
  };

  const result = await handler(event);
  const body = JSON.parse(result.body);

  expect(result.statusCode).toBe(200);
  expect(body).toEqual({});
  expect(dynamoMock.calls()).toHaveLength(0);
});

test("returns 500 if DynamoDB fails", async () => {
  dynamoMock.on(QueryCommand).rejects(new Error("DynamoDB error"));

  const event = {
    pathParameters: {
      userId: "123",
    },
    requestContext: {
      http: {
        method: "GET",
      },
    },
  };

  const result = await handler(event);
  const body = JSON.parse(result.body);

  expect(result.statusCode).toBe(500);
  expect(body.message).toBe("Could not get cart");
  expect(body.error).toBe("DynamoDB error");
});