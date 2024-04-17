import type { FetchArgsValueObject } from "../../core/fetch-args.value-object"

export function checkRawData(
  body: FetchArgsValueObject["body"]
): body is URLSearchParams | FormData {
  return body instanceof FormData || body instanceof URLSearchParams
}
