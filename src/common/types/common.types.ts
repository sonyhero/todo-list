type FieldErrorType = {
  error: string
  field: string
}

export type ResponseAppType<T = {}> = {
  resultCode: number
  messages: string[]
  data: T
  fieldsErrors: FieldErrorType[]
}
