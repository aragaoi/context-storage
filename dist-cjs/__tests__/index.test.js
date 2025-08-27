"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
describe("Index exports", () => {
    it("should export ContextStorage class", () => {
        expect(index_1.ContextStorage).toBeDefined();
        expect(typeof index_1.ContextStorage).toBe("function");
    });
    it("should export createRequestContext function", () => {
        expect(index_1.createRequestContext).toBeDefined();
        expect(typeof index_1.createRequestContext).toBe("function");
    });
    it("should export RequestContextStorage class", () => {
        expect(index_1.RequestContextStorage).toBeDefined();
        expect(typeof index_1.RequestContextStorage).toBe("function");
    });
    it("should allow creating ContextStorage instance from export", () => {
        const storage = new index_1.ContextStorage(() => ({ test: "value" }));
        expect(storage).toBeDefined();
        expect(typeof storage.runWithContext).toBe("function");
    });
    it("should allow using createRequestContext from export", () => {
        const context = (0, index_1.createRequestContext)();
        expect(context).toHaveProperty("requestId");
        expect(context).toHaveProperty("startedAt");
        expect(context).toHaveProperty("startedAtTimestamp");
    });
    it("should allow using RequestContextStorage from export", () => {
        const storage = new index_1.RequestContextStorage();
        storage.runWithContext(() => {
            const context = storage.getContext();
            expect(context).toHaveProperty("requestId");
        });
    });
});
//# sourceMappingURL=index.test.js.map