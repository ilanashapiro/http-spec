import { isPlainObject } from '@stoplight/json';
import isEqualWith = require('lodash.isequalwith');

export function entries<T = Record<string, unknown>>(o: { [s: string]: T } | ArrayLike<T>): [string, T][];
export function entries<T = unknown>(o: T): [string, T][];
export function entries<T = unknown>(o: T): [string, T][] {
  return isPlainObject(o) ? Object.entries(o as T) : [];
}

export function isEqual(left: unknown, right: unknown) {
  return isEqualWith(left, right, (value, other, indexOrKey) => {
    if (indexOrKey === 'id') return true;
    return;
  });
}

export function collectExplicitProperties(o: unknown) {
  return isPlainObject(o) ? Object.keys(o).filter(word => word !== 'x-stoplight') : [];
}

export function extractId(schema: unknown): string | undefined {
  if (
    isPlainObject(schema) &&
    isPlainObject(schema['x-stoplight']) &&
    typeof schema['x-stoplight']['id'] === 'string'
  ) {
    return schema['x-stoplight']['id'];
  }

  return;
}
