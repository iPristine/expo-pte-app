import type { z } from "zod"

export type SuccessValidation<T extends z.ZodRawShape> = {
  isValid: true
  values: {
    [k in keyof z.baseObjectOutputType<T>]: z.baseObjectOutputType<T>[k]
  }
}

export type FailedValidation<T extends z.ZodRawShape> = {
  isValid: false
  errors: { [k in keyof z.baseObjectOutputType<T>]: string }
}

export function handleSubmit<T extends z.ZodRawShape>(
  scheme: z.ZodObject<T>,
  values: z.infer<z.ZodObject<T>>
): SuccessValidation<T> | FailedValidation<T> {
  const result = scheme.safeParse(values)

  if (result.success) {
    return { isValid: true, values: result.data }
  }

  const errors = result.error.issues.reduce((acc, issue) => {
    const key = issue.path[0] as keyof z.baseObjectOutputType<T>
    const message = issue.message
    acc[key] = message
    return acc
  }, {} as { [k in keyof z.baseObjectOutputType<T>]: string })

  return {
    isValid: false,
    errors,
  }
}
