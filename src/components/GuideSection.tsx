import type {AssessmentTool} from '../types/assessment';

interface GuideSectionProps {
  tools: AssessmentTool[];
}

export function GuideSection({tools}: GuideSectionProps) {
  if (tools.length === 0) {
    return null;
  }

  return (
    <section className="bg-[var(--bg)] pt-4 pb-16 md:pt-6 md:pb-20" aria-labelledby="guide-heading">
      <div className="site-container">
        <h2
          id="guide-heading"
          className="font-serif-display font-normal text-[clamp(2.25rem,4.5vw,3.5rem)] tracking-[-0.02em] leading-[1.05] text-[var(--ink)] m-0 mb-6 md:mb-8"
        >
          Which one do I need?
        </h2>

        <ul className="list-none m-0 p-0 border-t border-[var(--border)]">
          {tools.map((tool) => (
            <li key={tool.id} className="border-b border-[var(--border)]">
              <a
                className="guide-link flex items-center justify-between gap-4 min-h-16 py-5 no-underline text-[clamp(17px,2vw,20px)] leading-[1.4]"
                href={tool.url}
              >
                <span className="max-w-[62ch]">
                  {tool.guidePrompt}:{' '}
                  <span className="font-bold underline decoration-1 underline-offset-4">
                    {tool.name}
                  </span>
                </span>
                <span
                  className="guide-arrow font-bold shrink-0 inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
