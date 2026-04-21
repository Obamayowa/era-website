import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity'

const CACHE_PREFIX = 'era_sanity_'

/** Turn a GROQ query string into a short stable cache key */
function cacheKey(query: string): string {
  // Simple, fast hash — good enough for local storage keys
  let h = 0
  for (let i = 0; i < query.length; i++) {
    h = (Math.imul(31, h) + query.charCodeAt(i)) | 0
  }
  return CACHE_PREFIX + Math.abs(h).toString(36)
}

function readCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function writeCache<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // localStorage quota exceeded or unavailable — silently ignore
  }
}

/**
 * Fetch a Sanity document by GROQ query.
 *
 * Priority order:
 *   1. Fresh data from Sanity (always attempted first)
 *   2. Last successful response stored in localStorage
 *   3. Hardcoded `fallback` value (only if cache is also empty)
 *
 * This means edits made in the studio persist on the live site even
 * when Sanity is temporarily unreachable.
 */
export function useSanity<T>(query: string, fallback: T): { data: T; loading: boolean } {
  const key = cacheKey(query)

  // Initialise from cache so the page renders without flash on repeat visits
  const [data, setData] = useState<T>(() => readCache<T>(key) ?? fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    sanityClient
      .fetch<T>(query)
      .then((result) => {
        if (result) {
          setData(result)
          writeCache(key, result)
        }
      })
      .catch((err) => {
        // Sanity unreachable — try to serve from cache
        const cached = readCache<T>(key)
        if (cached) {
          setData(cached)
          console.info('[Sanity] offline — serving last cached response')
        } else {
          console.warn('[Sanity] fetch failed and no cache available, using hardcoded fallback:', err.message)
        }
      })
      .finally(() => setLoading(false))
  }, [query, key])

  return { data, loading }
}
