interface CatalogueEmptyStateProps {
  onReload: () => void;
}

interface CatalogueErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function CatalogueLoadingState() {
  return (
    <div
      className="site-container"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading assessments"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[var(--border)]">
        {['01', '02', '03'].map((slot) => (
          <div
            key={slot}
            className="border-r border-b border-[var(--border)] bg-[var(--surface)] p-4 md:p-5 animate-pulse"
          >
            <div className="w-full aspect-[4/3] rounded-[24px] bg-[var(--border-subtle)]" />
            <div className="mt-5 pt-5 border-t border-[var(--border-subtle)] space-y-3">
              <div className="h-5 w-2/3 rounded bg-[var(--border-subtle)]" />
              <div className="h-4 w-5/6 rounded bg-[var(--border-subtle)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CatalogueEmptyState({onReload}: CatalogueEmptyStateProps) {
  return (
    <div className="site-container">
      <div
        role="status"
        className="border border-[var(--border)] bg-[var(--surface)] p-8 md:p-12 flex flex-col items-start gap-4"
      >
        <h3 className="m-0 text-xl font-bold tracking-[-0.02em]">No assessments available</h3>
        <p className="m-0 text-[17px] text-[var(--ink-muted)] max-w-[52ch]">
          The assessment catalogue is currently empty. Reload the default suite to view available tools.
        </p>
        <button
          type="button"
          onClick={onReload}
          className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-full bg-[var(--lime)] text-[var(--always-ink)] font-bold text-base cursor-pointer whitespace-nowrap"
        >
          Reload assessments
        </button>
      </div>
    </div>
  );
}

export function CatalogueErrorState({message, onRetry}: CatalogueErrorStateProps) {
  return (
    <div className="site-container">
      <div
        role="alert"
        className="border border-[var(--border)] bg-[var(--surface)] p-8 md:p-12 flex flex-col items-start gap-4"
      >
        <h3 className="m-0 text-xl font-bold tracking-[-0.02em]">Unable to display assessments</h3>
        <p className="m-0 text-[17px] text-[var(--ink-muted)] max-w-[56ch]">{message}</p>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-full bg-[var(--lime)] text-[var(--always-ink)] font-bold text-base cursor-pointer whitespace-nowrap"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
