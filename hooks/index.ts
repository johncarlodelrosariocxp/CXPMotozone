import { useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement>(callBack: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handClickedOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callBack();
      }
    };
    document.addEventListener("mousedown", handClickedOutside);
    return () => {
      document.removeEventListener("mousedown", handClickedOutside);
    };
  }, [callBack]);
  return ref;
}
