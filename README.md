# Context Storage

[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/seachegue/context-storage)
A lightweight, type-safe AsyncLocalStorage wrapper for managing context in Node.js applications.

## Features

- 🔒 **Type-safe**: Full TypeScript support with generics
- 🚀 **Zero dependencies**: Only uses Node.js built-ins
- 🧹 **Automatic cleanup**: Context is automatically cleaned up after async operations
- 🎯 **Simple API**: Easy to use with minimal boilerplate
- 🔄 **Async support**: Works seamlessly with async/await

## Installation

```bash
npm install context-storage
```

## Quick Start

### Basic Usage

```typescript
import { ContextStorage } from "context-storage";

// Create a context storage for user data
const userContext = new ContextStorage(() => ({
  userId: "",
  role: "guest"
}));

// Use context in your application
userContext.runWithContext(() => {
  // Set user data
  userContext.updateContext({ userId: "user-123", role: "admin" });
  
  // Access context anywhere in this scope
  const user = userContext.getContext();
  console.log(user); // { userId: "user-123", role: "admin" }
});
```

### Request Context (Pre-configured)

```typescript
import { requestContextStorage } from "context-storage";

// Use the pre-configured request context
requestContextStorage.runWithContext(() => {
  // Add user info to context
  requestContextStorage.updateContext({
    userId: "user-123",
    tenantId: "tenant-456"
  });
  
  // Access request context anywhere
  const context = requestContextStorage.getContext();
  console.log(context.requestId); // Unique request ID
  console.log(context.userId); // "user-123"
});
```

## API Reference

### ContextStorage<T>

#### Constructor
```typescript
new ContextStorage<T>(contextFactory: () => T, contextName?: string)
```

#### Methods

- `runWithContext<T>(callback: () => T): T` - Run code within a context
- `getContext(): T | null` - Get current context (nullable)
- `getContextOrThrow(): T` - Get current context (throws if missing)
- `updateContext(partial: Partial<T>): void` - Update current context

### RequestContext

Pre-configured context type for HTTP requests:

```typescript
type RequestContext = {
  requestId: string;
  userId?: string;
  tenantId?: string;
  startedAt: string;
  startedAtTimestamp: number;
  token?: string;
};
```

## Examples

### Express.js Middleware

```typescript
import { requestContextStorage } from "context-storage";

app.use((req, res, next) => {
  requestContextStorage.runWithContext(() => {
    // Add request data to context
    requestContextStorage.updateContext({
      userId: req.user?.id,
      token: req.headers.authorization
    });
    
    next();
  });
});

// In your route handlers
app.get("/api/data", (req, res) => {
  const context = requestContextStorage.getContextOrThrow();
  console.log(`Request ${context.requestId} from user ${context.userId}`);
  // ... handle request
});
```

### Database Operations

```typescript
import { ContextStorage } from "context-storage";

const dbContext = new ContextStorage(() => ({
  transactionId: "",
  userId: ""
}));

async function createUser(userData: any) {
  return dbContext.runWithContext(async () => {
    dbContext.updateContext({
      transactionId: generateId(),
      userId: userData.id
    });
    
    // All database operations have access to context
    await db.beginTransaction();
    await db.insertUser(userData);
    await db.logActivity("user_created");
    await db.commit();
  });
}
```

## Requirements

- Node.js 16.0.0 or higher
- TypeScript (recommended)

## License

MIT
