export function getTimeoutControl(timeout?: number): {
  signal: undefined | AbortSignal
  stop: () => void
} {
  if (!timeout)
    return {
      signal: undefined,
      stop: () => {},
    }

  const controller = new AbortController()
  const id = setTimeout(() => {
    timeout && controller.abort()
  }, timeout)

  return {
    signal: controller.signal,
    stop: () => {
      clearTimeout(id)
    },
  }
}
