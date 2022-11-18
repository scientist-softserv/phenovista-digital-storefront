import axios from 'axios'

const baseURL = `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME}.scientist.com/api/${process.env.NEXT_PUBLIC_SCIENTIST_API_VERSION}`
const defaultHeaders = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` }

export const a = axios.create({ baseURL, headers: defaultHeaders })

export const fetcher = (...args) => {
  return a.get(...args)
    .then(res => res.data)
}
