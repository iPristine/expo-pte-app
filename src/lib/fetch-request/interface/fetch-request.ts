import type { FetchArgsValueObject } from "../core/fetch-args.value-object"
import { checkRawData } from "./handlers/check-raw-data"
import { getHeaders } from "./handlers/get-headers"
import { getQuerySearchParams } from "./handlers/get-query-search-params"
import { getTimeoutControl } from "./handlers/get-timeout-control"

export async function fetchRequest(
  url: string,
  args: FetchArgsValueObject = {}
): Promise<Response> {
  const { type = "GET" } = args

  if ((type === "POST" || type === "PUT") && !args.body) {
    throw new Error("Body does not exist for this method, please add it")
  }
  const body = checkRawData(args.body) ? args.body : JSON.stringify(args.body)

  const timeoutControl = getTimeoutControl(args.timeout)

  const [baseUrl, querySearchParamsUrl] = url.split("?")
  const searchParams = getQuerySearchParams({
    url: querySearchParamsUrl,
    params: args.querySearchParams,
    withCache: args.withCache,
  })
  const fullUrl = `${baseUrl}${searchParams}`

  const result = await fetch(fullUrl, {
    headers: getHeaders(args.headers),
    method: type,
    body,
    signal: timeoutControl.signal,
  }).catch((err) => {
    console.error(err)
    throw new Error("Failed to fetch")
  })

  timeoutControl.stop()

  return result
}
