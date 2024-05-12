import {RequestResponse} from "@/src/lib/fetch-request";

export type FetchInterceptorInterface = {
  onFetch<T>({
    response,
  }: {
    response: RequestResponse<T>
    type: "basic" | "secured"
  }): Promise<RequestResponse<T>>
}
