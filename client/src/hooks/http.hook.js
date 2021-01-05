import { useState, useCallback } from 'react';
import { ERROR, GET, IDLE, LOADING, SUCCESS } from '../constants';

export const useHttp = () => {
  const [status, setStatus] = useState(IDLE);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => setError(null), []);
  const request = useCallback( async (url, method = GET, body = null, headers = {}) => {
    setStatus(LOADING);
    
    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      const res = await fetch(url, { method, body, headers });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Bad request');

      setStatus(SUCCESS);

      return data;
    } catch (err) {
      setStatus(ERROR);
      setError(err);
    }
  }, []);

  return { status, request, error, clearError, setError };
}