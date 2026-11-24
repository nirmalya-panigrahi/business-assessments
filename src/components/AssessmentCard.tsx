import {useEffect, useRef, useState} from 'react';
import type {AssessmentTool} from '../types/assessment';
import {AssessmentIllustration} from './AssessmentIllustration';

interface AssessmentCardProps {
  tool: AssessmentTool;
  prefersReducedMotion: boolean;
}

export function AssessmentCard({tool, prefersReducedMotion}: AssessmentCardProps) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (prefersReducedMotion || typeof window === 'undefined') {
      return true;
    }
    return !('IntersectionObserver' in window);
  });

  useEffect(() => {
    if (prefersReducedMotion || isVisible) {
      return undefined;
    }
    const element = cardRef.current;
    if (!element || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {threshold: 0.12},
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion, isVisible]);

  return (
    <a
      ref={cardRef}
      className={`tool-card ${isVisible ? 'tool-card--visible' : 'tool-card--hidden'}`}
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="p-4 md:p-5 flex-1 flex">
        <div
          className="w-full aspect-[4/3] rounded-[24px] relative overflow-hidden flex items-center justify-center p-6"
          style={{backgroundColor: tool.tintColor}}
        >
          <span className="absolute top-4 left-4 font-bold text-sm leading-none tabular-nums text-[var(--always-ink)] z-[2]">
            {tool.indexLabel}
          </span>
          <AssessmentIllustration id={tool.id} />
        </div>
      </div>

      <div className="border-t border-[var(--border)] px-4 pt-5 pb-6 md:px-5 md:py-6 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="m-0 font-bold text-xl tracking-[-0.02em] leading-[1.1]">{tool.name}</h3>
          <span className="inline-flex items-center justify-center bg-[var(--lime)] text-[var(--always-ink)] rounded-full px-3.5 py-1.5 text-sm font-bold leading-none whitespace-nowrap shrink-0 min-h-8">
            Open <span aria-hidden="true">&nbsp;→</span>
          </span>
        </div>
        <p className="m-0 text-[17px] leading-[1.5] text-[var(--ink-muted)]">{tool.description}</p>
      </div>
    </a>
  );
}
