import {useCallback, useEffect, useRef, useState} from 'react';
import {clampCardIndex, getClosestCardIndex} from '../utils/assessments';

export function useCarouselSync(cardCount: number) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCard = useCallback(
    (index: number) => {
      const targetIndex = clampCardIndex(index, cardCount);
      const track = trackRef.current;
      if (track) {
        const cards = track.querySelectorAll<HTMLElement>('.tool-card');
        const targetCard = cards[targetIndex];
        if (targetCard && typeof targetCard.scrollIntoView === 'function') {
          targetCard.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start',
          });
        }
      }
      setActiveIndex(targetIndex);
    },
    [cardCount],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track || cardCount <= 0) {
      return undefined;
    }

    let frameId: number | null = null;

    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }
      frameId = window.requestAnimationFrame(() => {
        const trackRect = track.getBoundingClientRect();
        const cardLeftOffsets = Array.from(track.querySelectorAll<HTMLElement>('.tool-card')).map(
          (card) => card.getBoundingClientRect().left,
        );
        const closest = getClosestCardIndex(cardLeftOffsets, trackRect.left);
        setActiveIndex(closest);
        frameId = null;
      });
    };

    track.addEventListener('scroll', handleScroll, {passive: true});
    return () => {
      track.removeEventListener('scroll', handleScroll);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [cardCount]);

  return {
    trackRef,
    activeIndex,
    selectCard,
  };
}
