# AsyncLocalStorage Guide

## What is AsyncLocalStorage?

AsyncLocalStorage is like a "magic box" that can store data that follows your code as it jumps between different async operations. Think of it as a backpack that automatically travels with your code wherever it goes in the async world.

## Why do we need it?

In Node.js, when you have async operations (like database calls, HTTP requests, etc.), it's hard to pass data through all the function calls without explicitly passing it as parameters. AsyncLocalStorage solves this problem.

## How it works (Simple Example)

```javascript
import { AsyncLocalStorage } from "node:async_hooks";

// Create a storage instance
const storage = new AsyncLocalStorage();

// Store data in the current async context
storage.run({ userId: 123, requestId: "abc" }, () => {
  // Inside this function and any async operations it calls,
  // you can access the stored data

  someAsyncFunction();
});

async function someAsyncFunction() {
  // Even though we're in a different function,
  // we can still access the stored data
  const data = storage.getStore();
  console.log(data.userId); // 123
  console.log(data.requestId); // 'abc'
}
```

## Real-world Example: Web Request Context

```javascript
import { AsyncLocalStorage } from "node:async_hooks";

const requestContext = new AsyncLocalStorage();

// Middleware to capture request info
app.use((req, res, next) => {
  requestContext.run(
    {
      userId: req.user?.id,
      requestId: req.headers["x-request-id"],
      startTime: Date.now(),
    },
    () => {
      next();
    }
  );
});

// Any function in your request can access this data
async function processOrder() {
  const context = requestContext.getStore();
  console.log(`Processing order for user ${context.userId}`);

  // Even deep in async operations
  await saveToDatabase();
}

async function saveToDatabase() {
  const context = requestContext.getStore();
  console.log(`Saving to DB for request ${context.requestId}`);
}
```

## Key Concepts

### 1. **Context Isolation**

Each `run()` call creates a new isolated context. Data from one context doesn't leak into another.

### 2. **Automatic Propagation**

The stored data automatically follows your code through all async operations (promises, callbacks, etc.).

### 3. **Thread Safety**

Each Node.js thread has its own storage, so there's no conflict between different requests.

## Common Use Cases

- **Request Tracking**: Store request ID, user info, timestamps
- **Database Transactions**: Pass transaction context through all DB operations
- **Logging**: Include context info in all log messages
- **Authentication**: Pass user info through the entire request lifecycle

## Important Notes

- Data is only available within the `run()` callback and any async operations it triggers
- Once the `run()` callback finishes, the stored data is automatically cleaned up
- You can't access the stored data outside of the async context where it was set

## When to Use AsyncLocalStorage

✅ **Use when:**

- You need to pass data through many async function calls
- You want to avoid "parameter drilling" (passing data through every function)
- You need request-scoped data in a web application

❌ **Don't use when:**

- You only need to pass data to one or two functions (just use parameters)
- You need global state that persists across requests
- You're working with synchronous code only

## Comparison with Alternatives

| Method                  | Pros                          | Cons                              |
| ----------------------- | ----------------------------- | --------------------------------- |
| **Function Parameters** | Simple, explicit              | Parameter drilling, messy         |
| **Global Variables**    | Easy access                   | Not thread-safe, global pollution |
| **AsyncLocalStorage**   | Clean, automatic, thread-safe | More complex setup                |

AsyncLocalStorage is the cleanest solution for passing context through async operations in Node.js!

## Why Use a Wrapper Instead of Raw AsyncLocalStorage?

While Node.js's AsyncLocalStorage is powerful, using a wrapper like `@aragaoi/context-storage` provides several benefits:

### 1. **Type Safety**

```typescript
// Raw AsyncLocalStorage - no type safety
const storage = new AsyncLocalStorage();
storage.run({ userId: 123 }, () => {
  const data = storage.getStore(); // data is any
  console.log(data.userId); // No autocomplete, no type checking
});

// With wrapper - full TypeScript support
const userContext = new ContextStorage(() => ({ userId: "", role: "guest" }));
userContext.runWithContext(() => {
  const data = userContext.getContext(); // data is properly typed
  console.log(data.userId); // Full autocomplete and type checking
});
```

### 2. **Default Values & Initialization**

```typescript
// Raw AsyncLocalStorage - you need to handle null/undefined
const storage = new AsyncLocalStorage();
const data = storage.getStore();
if (data) {
  console.log(data.userId); // Manual null checking
}

// With wrapper - automatic default values
const userContext = new ContextStorage(() => ({ userId: "", role: "guest" }));
const data = userContext.getContext(); // Always returns a valid object
console.log(data.userId); // No null checking needed
```

### 3. **Better Error Handling**

```typescript
// Raw AsyncLocalStorage - silent failures
const storage = new AsyncLocalStorage();
const data = storage.getStore();
console.log(data.userId); // undefined if no context

// With wrapper - explicit error handling
const userContext = new ContextStorage(() => ({ userId: "", role: "guest" }));
try {
  const data = userContext.getContextOrThrow(); // Throws if no context
  console.log(data.userId);
} catch (error) {
  // Handle missing context explicitly
}
```

### 4. **Simplified API**

```typescript
// Raw AsyncLocalStorage - verbose
const storage = new AsyncLocalStorage();
storage.run(initialData, () => {
  // Your code here
});

// With wrapper - cleaner syntax
const userContext = new ContextStorage(() => ({ userId: "", role: "guest" }));
userContext.runWithContext(() => {
  // Your code here
});
```

### 5. **Context Updates**

```typescript
// Raw AsyncLocalStorage - manual store replacement
const storage = new AsyncLocalStorage();
storage.run({ userId: 123 }, () => {
  const current = storage.getStore();
  storage.enterWith({ ...current, role: "admin" }); // Complex update
});

// With wrapper - simple partial updates
const userContext = new ContextStorage(() => ({ userId: "", role: "guest" }));
userContext.runWithContext(() => {
  userContext.updateContext({ role: "admin" }); // Simple partial update
});
```

### 6. **Pre-configured Contexts**

```typescript
// Raw AsyncLocalStorage - you build everything from scratch
const requestStorage = new AsyncLocalStorage();
const requestId = generateId();
const startTime = Date.now();
requestStorage.run({ requestId, startTime }, () => {
  // Handle request
});

// With wrapper - pre-configured request context
import { requestContextStorage } from "context-storage";
requestContextStorage.runWithContext(() => {
  // requestId and startTime are automatically set
  const context = requestContextStorage.getContext();
  console.log(context.requestId); // Auto-generated
  console.log(context.startedAt); // Auto-formatted timestamp
});
```

### When to Use Raw AsyncLocalStorage vs Wrapper

**Use Raw AsyncLocalStorage when:**

- You need maximum performance and minimal overhead
- You're building a low-level library
- You want complete control over the API
- You don't need TypeScript support

**Use the Wrapper when:**

- You want type safety and better developer experience
- You're building application code (not libraries)
- You want simpler, more readable code
- You need pre-configured contexts for common use cases
- You want better error handling and debugging

The wrapper provides a more developer-friendly interface while maintaining the same underlying power of AsyncLocalStorage!
