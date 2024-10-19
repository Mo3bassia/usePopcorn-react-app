import { useEffect } from "react";
export function useKey(action, key, ...dependencies) {
  let myKey = key.slice(0, 1).toUpperCase() + key.slice(1).toLowerCase();
  useEffect(
    function () {
      function listenterFunction(e) {
        if (e.key === myKey) {
          action();
        }
      }
      document.addEventListener("keyup", listenterFunction);

      return () => document.removeEventListener("keyup", listenterFunction);
    },
    [...dependencies]
  );
}
