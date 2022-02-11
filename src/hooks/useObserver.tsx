import { useState, useEffect } from "react";

export function useObserver(ref: any) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
  );

  useEffect(() => {
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => { observer.disconnect(); };
  }, []);

  return isIntersecting;
};

export default useObserver;