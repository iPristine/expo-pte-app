import type { HeadersTypeValueObject } from "../../core/headers-type.value-object"

export function cleanUndefinedInHeaders(
  obj: HeadersTypeValueObject
): Record<string, string> {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key]
    }
  })
  return obj as Record<string, string>
}
