import type { BodyTypeValueObject } from "./body-type.value-object"
import type { HeadersTypeValueObject } from "./headers-type.value-object"
import type { MethodTypeValueObject } from "./method-type.value-object"
import type { QuerySearchParamsValueObject } from "./query-search-params.value-object"
import type { ResultTypeValueObject } from "./result-type.value-object"

export type FetchArgsValueObject = {
  type?: MethodTypeValueObject
  body?: BodyTypeValueObject | string
  headers?: HeadersTypeValueObject
  timeout?: number
  querySearchParams?: QuerySearchParamsValueObject
  withCache?: boolean
  resultType?: ResultTypeValueObject
  skipIntercept?: boolean
}
