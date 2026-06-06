'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { ApiResponse } from '@/lib/types';
import { loadWithFallback } from '@/lib/api';

export function useApiData<T>(
  fetcher: () => Promise<ApiResponse<T>>,
  storageKey: string,
  defaultValue: T
) {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loadedRef = useRef(false);

  const load = useCallback(async () => {
    if (loadedRef.current) return;
    setLoading(true);
    try {
      const result = await loadWithFallback(fetcher, storageKey, defaultValue);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      // Fallback to localStorage
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          try {
            setData(JSON.parse(stored));
          } catch {
            // ignore
          }
        }
      }
    } finally {
      setLoading(false);
      loadedRef.current = true;
    }
  }, [fetcher, storageKey, defaultValue]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, setData, loading, error, reload: load };
}
