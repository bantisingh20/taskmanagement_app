
import React from "react";
 
export const useApi = (url, options = {}) => {
  const API_BASE_URL = "http://localhost:5000/api/";
  const API_HEADERS = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/${url}`, {
          method: options.method || 'GET',
          headers: { ...API_HEADERS, ...options.headers },
          body: options.body ? JSON.stringify(options.body) : null,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, error, loading };
};
