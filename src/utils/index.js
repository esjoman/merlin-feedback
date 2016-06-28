// @flow

export function isObject(value: any): boolean {
  const type: string = typeof value;
  return !!value && (type == 'object' || type == 'function');
}
