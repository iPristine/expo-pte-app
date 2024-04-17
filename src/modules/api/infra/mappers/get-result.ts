import { RequestResponse, ResultTypeValueObject } from "@/src/lib/fetch-request"

async function getData<T>(
  res: Response,
  resultType: ResultTypeValueObject
): Promise<T> {
  switch (resultType) {
    case "json":
      return (await res.json()) as T
    case "text":
      return (await res.text()) as T
    case "array-buffer":
      return (await res.arrayBuffer()) as T
  }
}

export async function getResult<T>(
  res: Response,
  resultType?: ResultTypeValueObject
): Promise<RequestResponse<T>> {
  try {
    const data = await getData<T>(res, resultType || "json")

    return {
      ok: res.ok,
      status: res.status,
      json: data,
    }
  } catch (e) {
    return {
      ok: res.ok,
      status: res.status,
    }
  }
}
