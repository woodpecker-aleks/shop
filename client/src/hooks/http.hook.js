import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => setError(null), []);
  const request = useCallback( async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    
    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      const res = await fetch(url, { method, body, headers });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Bad request');

      setLoading(false);

      return data;
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }, []);

  return { loading, request, error, clearError, setError };
}