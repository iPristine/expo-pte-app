import type { HeadersTypeValueObject } from "../../core/headers-type.value-object"
import { cleanUndefinedInHeaders } from "./clean-undefined-in-headers"

export function getHeaders(
  headers: HeadersTypeValueObject = {}
): Record<string, string> {
  const extraHeaders = {
    ...headers,
    // "Content-Type": Object.hasOwn(headers, "Content-Type")
    //   ? headers["Content-Type"]
    //   : "application/json",
  }

  return cleanUndefinedInHeaders(extraHeaders)
}
