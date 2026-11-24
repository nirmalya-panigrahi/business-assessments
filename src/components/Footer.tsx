import {STUDIO_ALL_TOOLS_URL} from '../data/assessments';

export function Footer() {
  return (
    <footer className="bg-[var(--forest)] text-[var(--cream)] py-12 md:pt-16 md:pb-14">
      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 md:gap-8">
          <p className="m-0 text-[17px] leading-[1.5] text-[var(--cream)]">
            Find more tools at:{' '}
            <a
              href={STUDIO_ALL_TOOLS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--lime)] font-bold underline underline-offset-4 break-words"
            >
              {STUDIO_ALL_TOOLS_URL}
            </a>
          </p>
          <p className="m-0 text-[15px] leading-[1.5] text-[var(--cream-muted)]">
            Business Assessment Suite — studio tool directory.
          </p>
        </div>
      </div>
    </footer>
  );
}
