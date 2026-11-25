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

const HERO_PHOTO_SRC = `${import.meta.env.BASE_URL}assets/aistudio/Gemini_Generated_Image-Photoroom_d08f7ed9.png`;

export function Hero() {
  return (
    <section className="pt-4 pb-10 md:pt-6 md:pb-14" aria-labelledby="hero-heading">
      <div className="site-container">
        <div className="relative overflow-x-clip bg-[var(--forest)] text-[var(--cream)] rounded-[24px] px-6 pt-8 pb-[284px] sm:pb-[332px] md:px-10 md:py-14 lg:px-16 lg:py-[72px] border border-[rgba(241,240,234,0.14)]">
          <div className="relative z-10 md:max-w-[50%] lg:max-w-[46%]">
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

          <img
            src={HERO_PHOTO_SRC}
            alt="Consultant reviewing assessment analytics on a laptop"
            width={1408}
            height={768}
            className="pointer-events-none select-none absolute bottom-0 right-0 z-30 h-[270px] sm:h-[320px] md:h-[310px] lg:h-[108%] w-auto max-w-none translate-x-[18%] sm:translate-x-[14%] md:translate-x-[14%] lg:translate-x-[16%] object-contain object-right-bottom border-0 rounded-none"
          />
        </div>
      </div>
    </section>
  );
}
