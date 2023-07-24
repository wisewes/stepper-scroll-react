import { useEffect, useState } from 'react';

type ScrollDirection = 'up' | 'down';

export const useScrollDirection = (): ScrollDirection => {
  const [prevScrollY, setPrevScrollY] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('down');

  useEffect(() => {
    const currentScrollY = window.scrollY;

    const handleScroll = () => {

      if (currentScrollY > prevScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);

  return scrollDirection;
};