import React, { useState } from "react";

export const useSubmitHook = (url, initialData = null) => {
  const [data, setData] = useState(initialData); // Data to be sent
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [successMessage, setSuccessMessage] = useState(null); // Success message state
  const API_BASE_URL = "http://localhost:5000/api/";

  // Function to trigger the API call
  const submitData = async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setSuccessMessage("Data submitted successfully!");
      return result;
    } catch (err) {
      setError(err.message || "An error occurred while submitting the data.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, successMessage, submitData };
};
