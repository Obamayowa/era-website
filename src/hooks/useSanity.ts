import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity'

/**
 * Generic hook to fetch a single Sanity document by GROQ query.
 * Falls back to `fallback` if the fetch fails or returns null.
 */
export function useSanity<T>(query: string, fallback: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    sanityClient
      .fetch<T>(query)
      .then((result) => {
        if (result) setData(result)
      })
      .catch((err) => {
        console.warn('[Sanity] fetch failed, using fallback:', err.message)
      })
      .finally(() => setLoading(false))
  }, [query])

  return { data, loading }
}
