import { useState, useEffect } from 'react';

export const useIntersectionObservation = (
  targetRef: React.RefObject<HTMLDivElement>,
  options?: IntersectionObserverInit
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        } else {
          setIsIntersecting(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.75,
      ...options,
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [targetRef, options]);

  return isIntersecting;
}
