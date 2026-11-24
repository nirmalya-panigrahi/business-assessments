import type {CSSProperties} from 'react';

const HERO_WORDS: Array<{text: string; sup?: string; suffix?: string}> = [
  {text: 'Business'},
  {text: 'assessments'},
  {text: 'for'},
  {text: 'behaviour', sup: '1', suffix: ','},
  {text: 'aptitude', sup: '2'},
  {text: 'and'},
  {text: 'personality', sup: '3'},
];

export function Hero() {
  return (
    <section className="pt-4 pb-10 md:pt-6 md:pb-14" aria-labelledby="hero-heading">
      <div className="site-container">
        <div className="bg-[var(--forest)] text-[var(--cream)] rounded-[24px] px-6 py-8 md:px-12 md:py-14 lg:px-16 lg:py-[72px] border border-[rgba(241,240,234,0.14)]">
          <h1 id="hero-heading" className="hero-title">
            {HERO_WORDS.map((word, index) => (
              <span key={word.text}>
                <span className="hw-clip">
                  <span className="hw" style={{'--i': index} as CSSProperties}>
                    {word.text}
                    {word.sup ? <sup>{word.sup}</sup> : null}
                    {word.suffix ?? null}
                  </span>
                </span>
                {index < HERO_WORDS.length - 1 ? ' ' : null}
              </span>
            ))}
          </h1>
          <p className="mt-6 mb-8 md:mt-8 md:mb-10 max-w-[46ch] text-[clamp(17px,1.5vw,20px)] leading-[1.5] text-[var(--cream-muted)]">
            Three focused assessment tools for HR teams, hiring managers, consultants and coaches.
          </p>
          <a
            href="#catalogue"
            className="inline-flex items-center justify-center min-h-[52px] px-7 py-3.5 rounded-full bg-[var(--lime)] text-[var(--always-ink)] font-bold text-[17px] tracking-[-0.01em] no-underline whitespace-nowrap transition-transform duration-150 hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0"
          >
            Browse assessments
          </a>
        </div>
      </div>
    </section>
  );
}
