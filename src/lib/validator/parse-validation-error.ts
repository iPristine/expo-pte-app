import type { Validator } from "./validator"

type ValidationErrors = Record<string, string>

// @TODO: Write correct typings for this class
export class ParseValidationError {
  static parseErrorsToValidatorErrors(
    errors: unknown,
    validator: Validator<any>
  ): void {
    if (!errors) return

    const fieldsWithErrors = this.convertErrors(errors as ValidationErrors)

    if (!fieldsWithErrors) return

    Object.keys(fieldsWithErrors).forEach((key: any) => {
      const value = fieldsWithErrors[key]
      if (!(key in validator.values)) {
        console.error("parseErrorsToValidatorErrors", {
          key,
          value,
        })
        return
      }

      validator.setError(key, fieldsWithErrors[key])
    })
  }

  private static convertErrors(obj: ValidationErrors): ValidationErrors {
    const newObj: ValidationErrors = {}
    for (const [key, value] of Object.entries(obj)) {
      const newKey = key
        .replace(/.*?\.(.*)/, "$1")
        .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
      newObj[newKey] = Array.isArray(value) ? value[0] : value
    }
    return this.convertValidationObject(newObj)
  }

  private static convertValidationObject(
    obj: ValidationErrors
  ): ValidationErrors {
    const newObj: ValidationErrors = {}
    for (const [key, value] of Object.entries(obj)) {
      const newKey = key.replace(/_(\w)/g, (_, letter) => letter.toUpperCase())
      newObj[newKey] = Array.isArray(value) ? value[0] : value
    }
    return newObj
  }
}
