import {STUDIO_ALL_TOOLS_URL} from '../data/assessments';

export function Header() {
  return (
    <header className="bg-[var(--bg)] relative z-20">
      <div className="site-container min-h-16 md:min-h-[72px] py-2 md:py-0 flex items-center justify-between gap-4">
        <a
          href="#top"
          className="font-bold text-[clamp(17px,4.5vw,20px)] tracking-[-0.03em] leading-none no-underline whitespace-nowrap shrink-0 min-h-[44px] inline-flex items-center"
        >
          Business Assessment Suite
        </a>
        <div className="flex items-center gap-2 shrink-0 md:hidden">
          <a
            href={STUDIO_ALL_TOOLS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-medium no-underline hover:underline underline-offset-4 whitespace-nowrap min-h-[44px] px-3 inline-flex items-center rounded-full"
          >
            All tools
          </a>
        </div>
      </div>
    </header>
  );
}
