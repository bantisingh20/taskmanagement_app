import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const useApi = ({ url = '', method = 'GET', autoFetch = false, body = null }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);
  const [callApi, setCallApi] = useState(false);

  const execute = useCallback(
    async (override = {}) => {
      const {
        url: overrideUrl,
        method: overrideMethod,
        body: overrideBody,
        headers: overrideHeaders,
      } = override;

      const finalUrl = overrideUrl || url;
      const finalMethod = (overrideMethod || method).toUpperCase();
      const finalBody = overrideBody !== undefined ? overrideBody : body;

      setCallApi(true);
      setLoading(true);
      setError(null);

      try {
        const response = await axios({
          url: `${API_BASE_URL}${finalUrl}`,
          method: finalMethod,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...overrideHeaders,
          },
          data: finalBody,
        });

        setData(response.data);
        setCallApi(false);
        return response.data;
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        setError(message);
        setCallApi(false);
        return { success: false, message };
      } finally {
        setLoading(false);
        setCallApi(false);
      }
    },
    [url, method, body]
  );

  useEffect(() => {
    if (autoFetch && method.toUpperCase() === 'GET') {
      execute();
    }
  }, [autoFetch, execute, method]);

  return { data, error, loading, execute, callApi};
};
