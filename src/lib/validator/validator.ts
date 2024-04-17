import { makeAutoObservable } from "mobx"
import { z } from "zod"

import { getInitialFields } from "./get-initial-fields"
import { handleSubmit } from "./handle-submit"

import type { FailedValidation, SuccessValidation } from "./handle-submit"

export type ValidatorOptions<T extends z.ZodRawShape> = {
  name?: string
  onFieldChange?: (name: any, value: any) => void
  initialFields?: Partial<z.infer<z.ZodObject<T>>>
}

export class Validator<T extends z.ZodRawShape> {
  private readonly zodScheme: z.ZodObject<T>
  private readonly initialFields: z.infer<z.ZodObject<T>>
  private readonly initialErrorFields: {
    [k in keyof z.baseObjectOutputType<T>]: string
  }

  public values: z.infer<z.ZodObject<T>>
  public errors: { [k in keyof z.baseObjectOutputType<T>]: string }
  public handlers: {
    [k in NonNullable<keyof z.baseObjectOutputType<T>>]: (
      args: z.baseObjectOutputType<T>[k]
    ) => void
  }

  static scheme = {
    ...z,
  }

  constructor(scheme: T, options?: ValidatorOptions<T>) {
    this.zodScheme = z.object(scheme)
    const initialFields = getInitialFields(this.zodScheme)
    this.initialFields = { ...initialFields, ...options?.initialFields }

    const keys = Object.keys(scheme) as Array<keyof z.baseObjectOutputType<T>>

    this.initialErrorFields = keys.reduce(
      (acc, key) => {
        acc[key] = ""
        return acc
      },
      {} as {
        [k in keyof T]: string
      }
    )

    this.values = { ...this.initialFields }
    this.errors = { ...this.initialErrorFields }

    this.handlers = keys.reduce(
      (acc, fieldName) => {
        acc[fieldName] = (
          value: z.baseObjectOutputType<T>[typeof fieldName]
        ) => {
          this.onFieldChange(fieldName, value)
        }
        return acc
      },
      {} as {
        [k in keyof z.baseObjectOutputType<T>]: (
          args: z.baseObjectOutputType<T>[k]
        ) => void
      }
    )

    makeAutoObservable(this)
  }

  reset(): void {
    this.errors = {
      ...this.initialErrorFields,
    }
    this.values = { ...this.initialFields }
  }

  resetErrors(): void {
    this.errors = {
      ...this.initialErrorFields,
    }
  }

  setError<V extends keyof z.baseObjectOutputType<T>>(
    fieldName: V,
    message: string
  ): void {
    if (this.errors[fieldName] === message) {
      return
    }

    this.errors[fieldName] = message
  }

  submit(): SuccessValidation<T> | FailedValidation<T> {
    this.errors = {
      ...this.initialErrorFields,
    }
    const result = handleSubmit(this.zodScheme, this.values)

    if (!result.isValid) {
      this.errors = result.errors
    }

    return result
  }

  private onFieldChange<V extends keyof z.baseObjectOutputType<T>>(
    fieldName: V,
    fieldValue: z.baseObjectOutputType<T>[V]
  ): void {
    this.setError(fieldName, this.initialErrorFields[fieldName])

    // @ts-ignore
    this.values[fieldName] = fieldValue
  }
}
