import {
  ContextStorage,
  createRequestContext,
  requestContextStorage,
  contextStorage,
} from "../index.js";

describe("Index exports", () => {
  it("should export ContextStorage class", () => {
    expect(ContextStorage).toBeDefined();
    expect(typeof ContextStorage).toBe("function");
  });

  it("should export createRequestContext function", () => {
    expect(createRequestContext).toBeDefined();
    expect(typeof createRequestContext).toBe("function");
  });

  it("should export requestContextStorage instance", () => {
    expect(requestContextStorage).toBeDefined();
  });

  it("should export contextStorage alias", () => {
    expect(contextStorage).toBeDefined();
  });

  it("should allow creating ContextStorage instance from export", () => {
    const storage = new ContextStorage(() => ({ test: "value" }));
    expect(storage).toBeDefined();
    expect(typeof storage.runWithContext).toBe("function");
  });

  it("should allow using createRequestContext from export", () => {
    const context = createRequestContext();
    expect(context).toHaveProperty("requestId");
    expect(context).toHaveProperty("startedAt");
    expect(context).toHaveProperty("startedAtTimestamp");
  });

  it("should allow using requestContextStorage from export", () => {
    requestContextStorage.runWithContext(() => {
      const context = requestContextStorage.getContext();
      expect(context).toHaveProperty("requestId");
    });
  });
});
