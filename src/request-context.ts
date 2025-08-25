import {randomUUID} from 'crypto';
import { ContextStorage } from "./context-storage.js";

export type UUID = string;

export type RequestContext = {
  requestId: UUID;
  userId?: string;
  tenantId?: string;
  startedAt: string;
  startedAtTimestamp: number;
  token?: string;
};

export const createRequestContext = (): RequestContext => {
  const now = new Date();
  return {
    requestId: randomUUID(),
    startedAtTimestamp: now.getTime(),
    startedAt: now.toISOString(),
  };
};

export const requestContextStorage = new ContextStorage<RequestContext>(
  createRequestContext,
  'Request context'
);

export const contextStorage = requestContextStorage;
