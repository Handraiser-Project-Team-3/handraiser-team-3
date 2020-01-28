import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [data, setData] = useState(() => {
    try {
      const fromStorage = localStorage.getItem(key);
      return fromStorage ? JSON.parse(fromStorage) : initialValue;
    } catch (err) {
      console.error(err);
    }
  });
  const setAllData = newData => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };
  return [data, setAllData];
};
