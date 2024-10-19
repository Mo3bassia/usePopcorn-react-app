import { useState, useEffect } from "react";
export function useLocalStorageState(initialState, key) {
  const [state, setState] = useState(() =>
    !localStorage.getItem(key)
      ? initialState
      : JSON.parse(localStorage.getItem(key))
  );

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(state));
    },
    [state]
  );

  return [state, setState];
}
