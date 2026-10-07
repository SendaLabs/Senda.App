import type { NestExpressApplication } from "@nestjs/platform-express";
import { Test } from "@nestjs/testing";
import type { ApiErrorResponse } from "@senda/shared";
import request from "supertest";

import { AppModule } from "../src/app.module";
import { configureApp } from "../src/bootstrap/configure-app";
import { APP_CONFIG } from "../src/config/config.module";
import type { AppConfig } from "../src/config/env";

describe("backend-business HTTP stack (e2e)", () => {
  let app: NestExpressApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication<NestExpressApplication>({
      bodyParser: false,
    });
    configureApp(app, app.get<AppConfig>(APP_CONFIG));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const server = () => app.getHttpServer() as Parameters<typeof request>[0];

  it("GET /v1/health reports liveness with a request id", async () => {
    const res = await request(server()).get("/v1/health").expect(200);

    expect(res.body).toMatchObject({ status: "ok" });
    expect(res.headers["x-request-id"]).toEqual(expect.any(String));
  });

  it("echoes a safe upstream request id", async () => {
    const res = await request(server())
      .get("/v1/health")
      .set("X-Request-Id", "edge-req-12345")
      .expect(200);

    expect(res.headers["x-request-id"]).toBe("edge-req-12345");
  });

  it("sets security headers and hides the framework", async () => {
    const res = await request(server()).get("/v1/health").expect(200);

    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    expect(res.headers["x-powered-by"]).toBeUndefined();
  });

  it("only allows configured CORS origins", async () => {
    const allowed = await request(server())
      .get("/v1/health")
      .set("Origin", "http://localhost:3000");
    expect(allowed.headers["access-control-allow-origin"]).toBe(
      "http://localhost:3000",
    );

    const denied = await request(server())
      .get("/v1/health")
      .set("Origin", "https://evil.example");
    expect(denied.headers["access-control-allow-origin"]).toBeUndefined();
  });

  it("returns the error contract for unknown routes", async () => {
    const res = await request(server()).get("/v1/nope").expect(404);
    const body = res.body as ApiErrorResponse;

    expect(body.error.code).toBe("NOT_FOUND");
    expect(body.error.requestId).toBe(res.headers["x-request-id"]);
  });

  it("rejects malformed JSON without leaking parser details", async () => {
    const res = await request(server())
      .post("/v1/auth/login")
      .set("Content-Type", "application/json")
      .send("{not json")
      .expect(400);
    const body = res.body as ApiErrorResponse;

    expect(body.error.code).toBe("VALIDATION_FAILED");
    expect(body.error.message).toBe("The request is invalid.");
  });

  it("validates DTOs with field-level details", async () => {
    const res = await request(server())
      .post("/v1/auth/login")
      .send({ email: "not-an-email" })
      .expect(400);
    const body = res.body as ApiErrorResponse;

    expect(body.error.code).toBe("VALIDATION_FAILED");
    expect(body.error.details?.map((detail) => detail.path)).toEqual(
      expect.arrayContaining(["email", "password"]),
    );
  });

  it("answers 501 for endpoints that are not built yet", async () => {
    const res = await request(server())
      .post("/v1/auth/login")
      .send({ email: "ana@example.com", password: "irrelevant" })
      .expect(501);

    expect((res.body as ApiErrorResponse).error.code).toBe("NOT_IMPLEMENTED");
  });

  it("validates Stellar payment intents", async () => {
    const res = await request(server())
      .post("/v1/payments/intents")
      .send({
        companyId: "cmp_1",
        destination: "not-a-key",
        asset: "USDC",
        amount: "0",
      })
      .expect(400);
    const paths = (res.body as ApiErrorResponse).error.details?.map(
      (detail) => detail.path,
    );

    expect(paths).toEqual(expect.arrayContaining(["destination", "amount"]));
  });
});
