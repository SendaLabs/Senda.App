process.env.NODE_ENV = "test";
process.env.LOG_LEVEL = "silent";
process.env.CORS_ORIGINS = "http://localhost:3000";
// Never connected to: tests only exercise routes that do not query the DB.
process.env.DATABASE_URL =
  "postgresql://test:test@127.0.0.1:1/senda_test?schema=public";
