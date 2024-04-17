import { RequestResponse } from "@lib/fetch-request"
import type { FetchInterceptorInterface } from "./fetch-interceptor.interface"

export class FetchInterceptor implements FetchInterceptorInterface {
  // eslint-disable-next-line @typescript-eslint/require-await
  async onFetch<T>({
    response,
  }: {
    response: RequestResponse<T>
    type: "basic" | "secured"
  }): Promise<RequestResponse<T>> {
    return response
  }
}
