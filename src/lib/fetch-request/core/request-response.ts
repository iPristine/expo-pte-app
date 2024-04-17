export type RequestResponse<T> = {
  ok: boolean
  status: number
  json?: T
}
