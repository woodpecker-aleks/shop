import { useState, useCallback } from 'react';
import { GET } from '../constants';

export const useHttp = () => {
  const [status, setStatus] = useState({ isIdle: true });

  const request = useCallback( async (url, method = GET, body = null, headers = {}) => {
    setStatus({ isLoading: true });
    
    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      const res = await fetch(url, { method, body, headers });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Bad request');

      setStatus({ isSuccess: true });

      return data;
    } catch (err) {
      setStatus({ isError: true, message: err.message });
      return {
        error: true,
        errorMessage: err.message
      }
    }
  }, []);

  return { status, request };
}