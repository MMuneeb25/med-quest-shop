/**
 * @deprecated Use React Query (useQuery/useMutation) instead.
 * This hook is kept for backward compatibility only and will be removed.
 * See src/hooks/useProducts.ts for the recommended pattern.
 */
import { useState, useEffect } from 'react';
import { type AxiosResponse } from 'axios';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>(
  fetchFunction: () => Promise<AxiosResponse<T>>,
  dependencies: unknown[] = []
): UseFetchState<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setState({ data: null, loading: true, error: null });
        const response = await fetchFunction();
        if (isMounted) {
          setState({ data: response.data, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({ data: null, loading: false, error: error as Error });
        }
      }
    };

    void fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return state;
}
