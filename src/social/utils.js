export const rslError = (errorObject) => {
  const error = []

  error.push(`[${errorObject.provider}][${errorObject.type}] ${errorObject.description}`)

  if (errorObject.error) {
    error.push(JSON.stringify(errorObject.error, null, 2))
  }

  return Error(error.join('\n\nORIGINAL ERROR: '))
}

export const timestampFromNow = (duration) => {
  const expiresAt = new Date()

  return expiresAt.setSeconds(expiresAt.getSeconds() + duration)
}
