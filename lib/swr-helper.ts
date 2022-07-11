
class SWRError extends Error {
  public status: number
  constructor(public response: Response, msg: string) {
    super(msg)
    this.status = response.status
  }
}

export const fetcher = async (input: RequestInfo | URL, init?: RequestInit) => {
  const res = await fetch(input, init)
  if (res.status >= 400) {
    throw new SWRError(res, "Fetch Error")
  }
  return res.json()
}