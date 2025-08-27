import {
  ContextStorage,
  createRequestContext,
  RequestContextStorage,
} from "../index";

describe("Index exports", () => {
  it("should export ContextStorage class", () => {
    expect(ContextStorage).toBeDefined();
    expect(typeof ContextStorage).toBe("function");
  });

  it("should export createRequestContext function", () => {
    expect(createRequestContext).toBeDefined();
    expect(typeof createRequestContext).toBe("function");
  });

  it("should export RequestContextStorage class", () => {
    expect(RequestContextStorage).toBeDefined();
    expect(typeof RequestContextStorage).toBe("function");
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

  it("should allow using RequestContextStorage from export", () => {
    const storage = new RequestContextStorage();
    storage.runWithContext(() => {
      const context = storage.getContext();
      expect(context).toHaveProperty("requestId");
    });
  });
});
