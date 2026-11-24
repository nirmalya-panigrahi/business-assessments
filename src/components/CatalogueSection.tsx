import {useCarouselSync} from '../hooks/useCarouselSync';
import type {AssessmentTool, CatalogueStatus} from '../types/assessment';
import {AssessmentCard} from './AssessmentCard';
import {
  CatalogueEmptyState,
  CatalogueErrorState,
  CatalogueLoadingState,
} from './CatalogueStates';

interface CatalogueSectionProps {
  tools: AssessmentTool[];
  status: CatalogueStatus;
  errorMessage: string | null;
  onRetry: () => void;
  prefersReducedMotion: boolean;
}

export function CatalogueSection({
  tools,
  status,
  errorMessage,
  onRetry,
  prefersReducedMotion,
}: CatalogueSectionProps) {
  const {trackRef, activeIndex, selectCard} = useCarouselSync(tools.length);

  return (
    <section id="catalogue" className="pt-4 pb-12 md:pt-6 md:pb-16" aria-labelledby="catalogue-heading">
      <div className="site-container">
        <h2
          id="catalogue-heading"
          className="font-serif-display font-normal text-[clamp(2.25rem,4.5vw,3.5rem)] tracking-[-0.02em] leading-[1.05] text-[var(--ink)] m-0 mb-6 md:mb-8"
        >
          The assessments
        </h2>
      </div>

      {status === 'loading' ? <CatalogueLoadingState /> : null}

      {status === 'error' ? (
        <CatalogueErrorState
          message={errorMessage ?? 'An unexpected error occurred while preparing the assessments.'}
          onRetry={onRetry}
        />
      ) : null}

      {status === 'empty' || (status === 'ready' && tools.length === 0) ? (
        <CatalogueEmptyState onReload={onRetry} />
      ) : null}

      {status === 'ready' && tools.length > 0 ? (
        <div className="catalogue-grid-shell">
          <div className="catalogue-track" id="catalogue-track" ref={trackRef}>
            {tools.map((tool) => (
              <AssessmentCard
                key={tool.id}
                tool={tool}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-1 mt-2 md:hidden" aria-label="Choose assessment card">
            {tools.map((tool, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => selectCard(index)}
                  aria-current={isActive ? 'true' : 'false'}
                  aria-label={`${tool.name} (card ${index + 1} of ${tools.length})`}
                  className="bg-transparent border-0 p-0 min-w-[44px] min-h-[44px] inline-flex items-center justify-center cursor-pointer"
                >
                  <span
                    aria-hidden="true"
                    className={`h-2 rounded-full bg-[var(--ink)] transition-all duration-150 ${
                      isActive ? 'w-6 opacity-100' : 'w-2 opacity-25'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
