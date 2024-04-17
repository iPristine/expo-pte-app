import type { QuerySearchParamsValueObject } from "../../core/query-search-params.value-object"

type Args = {
  url?: string
  withCache?: boolean
  params?: QuerySearchParamsValueObject
}

export function getQuerySearchParams({
  params,
  withCache = false,
  url = "",
}: Args): string {
  const cacheParam = withCache ? `_=${Date.now()}` : ""
  if (!params && url) return `?${url}&${cacheParam}`

  if (!params) return `?${cacheParam}`

  const searchParams = new URLSearchParams(`${url}&${cacheParam}`)
  params &&
    Object.keys(params).forEach((key) => {
      const paramValue = params[key]

      if (Array.isArray(paramValue)) {
        paramValue.forEach((subParam: string) => {
          searchParams.append(key, subParam)
        })
        return
      }

      if (paramValue === undefined) return

      searchParams.append(key, String(paramValue))
    })

  return `?${searchParams.toString()}`
}
