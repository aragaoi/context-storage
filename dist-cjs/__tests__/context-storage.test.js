"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_storage_1 = require("../context-storage");
describe("ContextStorage", () => {
    let storage;
    let contextFactory;
    beforeEach(() => {
        contextFactory = () => ({
            id: "test-id",
            name: "test-name",
            count: 0,
        });
        storage = new context_storage_1.ContextStorage(contextFactory, "TestContext");
    });
    describe("constructor", () => {
        it("should create a ContextStorage instance with default name", () => {
            const defaultStorage = new context_storage_1.ContextStorage(contextFactory);
            expect(defaultStorage).toBeDefined();
        });
        it("should create a ContextStorage instance with custom name", () => {
            const customStorage = new context_storage_1.ContextStorage(contextFactory, "CustomContext");
            expect(customStorage).toBeDefined();
        });
    });
    describe("runWithContext", () => {
        it("should run callback with context and return result", () => {
            const result = storage.runWithContext(() => {
                const context = storage.getContext();
                expect(context).toEqual({
                    id: "test-id",
                    name: "test-name",
                    count: 0,
                });
                return "test-result";
            });
            expect(result).toBe("test-result");
        });
        it("should run async callback with context", async () => {
            const result = await storage.runWithContext(async () => {
                const context = storage.getContext();
                expect(context).toEqual({
                    id: "test-id",
                    name: "test-name",
                    count: 0,
                });
                return "async-result";
            });
            expect(result).toBe("async-result");
        });
        it("should isolate context between different runs", () => {
            let firstContext = null;
            let secondContext = null;
            storage.runWithContext(() => {
                firstContext = storage.getContext();
                storage.updateContext({ count: 5 });
            });
            storage.runWithContext(() => {
                secondContext = storage.getContext();
            });
            expect(firstContext).not.toBe(secondContext);
            expect(firstContext.count).toBe(5);
            expect(secondContext.count).toBe(0);
        });
    });
    describe("getContext", () => {
        it("should return null when no context is set", () => {
            const context = storage.getContext();
            expect(context).toBeNull();
        });
        it("should return context when inside runWithContext", () => {
            storage.runWithContext(() => {
                const context = storage.getContext();
                expect(context).toEqual({
                    id: "test-id",
                    name: "test-name",
                    count: 0,
                });
            });
        });
    });
    describe("getContextOrThrow", () => {
        it("should throw error when no context is set", () => {
            expect(() => {
                storage.getContextOrThrow();
            }).toThrow("TestContext not found. This usually means the context middleware was not properly applied.");
        });
        it("should return context when inside runWithContext", () => {
            storage.runWithContext(() => {
                const context = storage.getContextOrThrow();
                expect(context).toEqual({
                    id: "test-id",
                    name: "test-name",
                    count: 0,
                });
            });
        });
    });
    describe("updateContext", () => {
        it("should throw error when updating context outside of runWithContext", () => {
            expect(() => {
                storage.updateContext({ count: 5 });
            }).toThrow("Cannot update context outside of a testcontext");
        });
        it("should update context when inside runWithContext", () => {
            storage.runWithContext(() => {
                storage.updateContext({ count: 5, name: "updated-name" });
                const context = storage.getContext();
                expect(context).toEqual({
                    id: "test-id",
                    name: "updated-name",
                    count: 5,
                });
            });
        });
        it("should partially update context", () => {
            storage.runWithContext(() => {
                storage.updateContext({ count: 10 });
                const context = storage.getContext();
                expect(context).toEqual({
                    id: "test-id",
                    name: "test-name",
                    count: 10,
                });
            });
        });
    });
    describe("context isolation", () => {
        it("should maintain separate contexts for nested calls", () => {
            let outerContext = null;
            let innerContext = null;
            storage.runWithContext(() => {
                outerContext = storage.getContext();
                storage.updateContext({ count: 5 });
                storage.runWithContext(() => {
                    innerContext = storage.getContext();
                    storage.updateContext({ count: 10 });
                });
            });
            expect(outerContext.count).toBe(5);
            expect(innerContext.count).toBe(10);
        });
    });
});
//# sourceMappingURL=context-storage.test.js.map