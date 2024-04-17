import { makeAutoObservable } from "../mobx/mobx-proxy"

type ArgsType<T, E> = {
  data?: T
  isLoading?: boolean
  error?: E
}

export class DataState<T, E> {
  data?: T = undefined
  isLoading = true
  error?: E = undefined

  constructor(args?: ArgsType<T, E>) {
    this.data = args?.data
    this.isLoading = args?.isLoading ?? true
    this.error = args?.error

    makeAutoObservable(this)
  }

  get isDataLoaded(): boolean {
    if (this.isLoading) {
      return false
    }
    return !!this.data
  }

  get isError(): boolean {
    return !!this.error
  }

  setData = (data?: T): void => {
    this.data = data
  }

  setIsLoading = (value: boolean): void => {
    if (value) {
      this.error = undefined
    }
    this.isLoading = value
  }

  setError = (value?: E): void => {
    this.error = value
  }
}
