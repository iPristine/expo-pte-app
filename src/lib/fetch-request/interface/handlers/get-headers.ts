import type { HeadersTypeValueObject } from "../../core/headers-type.value-object"
import { cleanUndefinedInHeaders } from "./clean-undefined-in-headers"

export function getHeaders(
  headers: HeadersTypeValueObject = {}
): Record<string, string> {
  const extraHeaders = {
    "X-Rosi-Auth": "guest",
    ...headers,
    "Content-Type": Object.hasOwn(headers, "Content-Type")
      ? headers["Content-Type"]
      : "application/json",
  }

  return cleanUndefinedInHeaders(extraHeaders)
}
