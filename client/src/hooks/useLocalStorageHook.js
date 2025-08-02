import React,{useState} from "react";

export const useLocalStorageHook = (key, initialValue) => {
  const getlocalStorageValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getlocalStorageValue);

  const setLocalStorageValue = () => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn("Error setting localStorage key:", key, error);
    }
  };

  

  return [storedValue, setLocalStorageValue];
};
