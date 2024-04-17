import { FetchArgsValueObject, RequestResponse } from "@/src/lib/fetch-request"

type RequestProps = Omit<FetchArgsValueObject, "type">

type FetchHandler<T = any> = (
  url: string,
  args?: FetchArgsValueObject
) => Promise<RequestResponse<T>>

export class RestApiClient {
  constructor(private readonly fetch: FetchHandler) {}

  async get<T>(url: string, args?: RequestProps): Promise<RequestResponse<T>> {
    return this.fetch(url, {
      type: "GET",
      ...args,
    })
  }

  async post<T>(url: string, args?: RequestProps): Promise<RequestResponse<T>> {
    return this.fetch(url, {
      type: "POST",
      ...args,
    })
  }

  async put<T>(url: string, args?: RequestProps): Promise<RequestResponse<T>> {
    return this.fetch(url, {
      type: "PUT",
      ...args,
    })
  }

  async patch<T>(
    url: string,
    args?: RequestProps
  ): Promise<RequestResponse<T>> {
    return this.fetch(url, {
      type: "PATCH",
      ...args,
    })
  }

  async delete<T>(
    url: string,
    args?: RequestProps
  ): Promise<RequestResponse<T>> {
    return this.fetch(url, {
      type: "DELETE",
      ...args,
    })
  }
}
