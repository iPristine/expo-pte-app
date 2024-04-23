import {
    FetchArgsValueObject,
    RequestResponse,
    fetchRequest,
} from "@/src/lib/fetch-request"
import { ApiClientStore } from "../stores/api-client.store"
import { getResult } from "../../infra/mappers/get-result"
import { FetchInterceptor } from "./fetch-interceptor"
import { RestApiClient } from "./rest-api-client"
import {AuthStore} from "@/src/modules/auth/interfaces/stores/auth.store";

const FETCH_TIMEOUT = 30000

export class ApiClient {
    private static instance: ApiClient

    private readonly fetchInterceptor = new FetchInterceptor()
    secured: RestApiClient
    basic: RestApiClient

    static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient()
        }

        return ApiClient.instance
    }

    private constructor() {
        this.secured = new RestApiClient(this.fetchAuth.bind(this))
        this.basic = new RestApiClient(this.fetch.bind(this))
    }

    private async fetch<T>(
        url: string,
        args?: FetchArgsValueObject
    ): Promise<RequestResponse<T>> {
        let response

        try {
            response = await fetchRequest(url, { ...args, timeout: FETCH_TIMEOUT })

        } catch (e) {
            return { ok: false, status: 503, json: e as T }
        }

        const result = await getResult<T>(response, args?.resultType)

        if (args?.skipIntercept) return result

        return this.fetchInterceptor.onFetch<T>({
            response: result,
            type: "basic",
        })
    }

    private async fetchAuth<T>(
        url: string,
        args?: FetchArgsValueObject
    ): Promise<RequestResponse<T>> {

        const token = AuthStore.getInstance().token.data
        let response

        try {
            response = await fetchRequest(url, {
                ...args,
                headers: {
                    ...args?.headers,
                    Authorization: `Bearer ${token}`,
                },
                timeout: FETCH_TIMEOUT,
            })
        } catch (e) {
            return { ok: false, status: 503, json: e as T }
        }

        const result = await getResult<T>(response, args?.resultType)

        if (args?.skipIntercept) return result

        return this.fetchInterceptor.onFetch<T>({
            response: result,
            type: "secured",
        })
    }
}
