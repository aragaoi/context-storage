"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_context_1 = require("../request-context");
const requestContextStorage = new request_context_1.RequestContextStorage();
describe("RequestContext", () => {
    describe("createRequestContext", () => {
        it("should create a request context with required fields", () => {
            const context = (0, request_context_1.createRequestContext)();
            expect(context).toHaveProperty("requestId");
            expect(context).toHaveProperty("startedAt");
            expect(context).toHaveProperty("startedAtTimestamp");
            expect(typeof context.requestId).toBe("string");
            expect(typeof context.startedAt).toBe("string");
            expect(typeof context.startedAtTimestamp).toBe("number");
        });
        it("should generate unique request IDs", () => {
            const context1 = (0, request_context_1.createRequestContext)();
            const context2 = (0, request_context_1.createRequestContext)();
            expect(context1.requestId).not.toBe(context2.requestId);
        });
        it("should set startedAtTimestamp to current time", () => {
            const before = Date.now();
            const context = (0, request_context_1.createRequestContext)();
            const after = Date.now();
            expect(context.startedAtTimestamp).toBeGreaterThanOrEqual(before);
            expect(context.startedAtTimestamp).toBeLessThanOrEqual(after);
        });
        it("should set startedAt to ISO string", () => {
            const context = (0, request_context_1.createRequestContext)();
            const date = new Date(context.startedAt);
            expect(date.toISOString()).toBe(context.startedAt);
        });
        it("should not include optional fields by default", () => {
            const context = (0, request_context_1.createRequestContext)();
            expect(context).not.toHaveProperty("userId");
            expect(context).not.toHaveProperty("tenantId");
            expect(context).not.toHaveProperty("token");
        });
    });
    describe("requestContextStorage", () => {
        it("should be an instance of ContextStorage", () => {
            expect(requestContextStorage).toBeDefined();
            expect(typeof requestContextStorage.runWithContext).toBe("function");
            expect(typeof requestContextStorage.getContext).toBe("function");
            expect(typeof requestContextStorage.getContextOrThrow).toBe("function");
            expect(typeof requestContextStorage.updateContext).toBe("function");
        });
        it("should create RequestContext when running with context", () => {
            requestContextStorage.runWithContext(() => {
                const context = requestContextStorage.getContext();
                expect(context).toHaveProperty("requestId");
                expect(context).toHaveProperty("startedAt");
                expect(context).toHaveProperty("startedAtTimestamp");
                expect(typeof context?.requestId).toBe("string");
                expect(typeof context?.startedAt).toBe("string");
                expect(typeof context?.startedAtTimestamp).toBe("number");
            });
        });
        it("should allow updating context fields", () => {
            requestContextStorage.runWithContext(() => {
                const originalContext = requestContextStorage.getContext();
                requestContextStorage.updateContext({
                    userId: "user-123",
                    tenantId: "tenant-456",
                    token: "jwt-token",
                });
                const updatedContext = requestContextStorage.getContext();
                expect(updatedContext?.userId).toBe("user-123");
                expect(updatedContext?.tenantId).toBe("tenant-456");
                expect(updatedContext?.token).toBe("jwt-token");
                expect(updatedContext?.requestId).toBe(originalContext?.requestId);
                expect(updatedContext?.startedAt).toBe(originalContext?.startedAt);
                expect(updatedContext?.startedAtTimestamp).toBe(originalContext?.startedAtTimestamp);
            });
        });
        it("should throw error when accessing context outside of runWithContext", () => {
            expect(() => {
                requestContextStorage.getContextOrThrow();
            }).toThrow("Request context not found. This usually means the context middleware was not properly applied.");
        });
        it("should throw error when updating context outside of runWithContext", () => {
            expect(() => {
                requestContextStorage.updateContext({
                    userId: "user-123",
                });
            }).toThrow("Cannot update context outside of a request context");
        });
    });
    describe("requestContextStorage", () => {
        it("should work with context", () => {
            requestContextStorage.runWithContext(() => {
                const context = requestContextStorage.getContext();
                expect(context).toHaveProperty("requestId");
                expect(context).toHaveProperty("startedAt");
                expect(context).toHaveProperty("startedAtTimestamp");
            });
        });
    });
    describe("RequestContext type", () => {
        it("should allow optional fields", () => {
            const context = {
                requestId: "test-id",
                startedAt: "2023-01-01T00:00:00.000Z",
                startedAtTimestamp: 1672531200000,
            };
            expect(context).toBeDefined();
        });
        it("should allow all fields", () => {
            const context = {
                requestId: "test-id",
                userId: "user-123",
                tenantId: "tenant-456",
                startedAt: "2023-01-01T00:00:00.000Z",
                startedAtTimestamp: 1672531200000,
                token: "jwt-token",
            };
            expect(context).toBeDefined();
        });
    });
});
//# sourceMappingURL=request-context.test.js.map