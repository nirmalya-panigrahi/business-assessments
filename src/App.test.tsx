import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';
import App from './App';
import type {AssessmentTool} from './types/assessment';

describe('Business Assessment Suite integration — Blue Pill', () => {
  it('renders brand header, hero headline with superscripts, catalogue cards, guide links, and footer', () => {
    render(<App />);

    expect(screen.getByRole('link', {name: /skip to content/i})).toHaveAttribute(
      'href',
      '#main-content',
    );
    expect(
      screen.getByRole('link', {name: 'Business Assessment Suite'}),
    ).toBeInTheDocument();

    const heading = screen.getByRole('heading', {level: 1});
    expect(heading).toHaveTextContent(
      /Business\s+assessments\s+for\s+behaviour1,\s+aptitude2\s+and\s+personality3/,
    );

    expect(screen.getByRole('link', {name: 'Browse assessments'})).toHaveAttribute(
      'href',
      '#catalogue',
    );

    const behaviourCard = screen.getByRole('link', {
      name: /Behaviour Assessments.*Psychometric framework analytics/i,
    });
    const aptitudeCard = screen.getByRole('link', {
      name: /Aptitude Assessments.*Structured talent evaluation platforms/i,
    });
    const personalityCard = screen.getByRole('link', {
      name: /Personality Assessments.*Advanced behavioral profiling analytics/i,
    });

    expect(behaviourCard).toHaveAttribute('href', 'https://behaviour-assessments.vercel.app/');
    expect(aptitudeCard).toHaveAttribute('href', 'https://interview-assessments.vercel.app/');
    expect(personalityCard).toHaveAttribute(
      'href',
      'https://personality-assessments-seven.vercel.app/',
    );
    expect(behaviourCard).toHaveAttribute('rel', 'noopener noreferrer');

    expect(
      screen.getByRole('link', {name: /Understand how people behave at work:/i}),
    ).toHaveAttribute('href', 'https://behaviour-assessments.vercel.app/');
    expect(
      screen.getByRole('link', {name: /Evaluate candidates in a structured way:/i}),
    ).toHaveAttribute('href', 'https://interview-assessments.vercel.app/');
    expect(
      screen.getByRole('link', {name: /Build a behavioural profile:/i}),
    ).toHaveAttribute('href', 'https://personality-assessments-seven.vercel.app/');

    expect(
      screen.getByRole('link', {name: 'https://nirmalya-panigrahi.github.io/'}),
    ).toBeInTheDocument();
  });

  it('updates mobile carousel indicator dots when clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const dot1 = screen.getByRole('button', {name: /Behaviour Assessments \(card 1 of 3\)/i});
    const dot2 = screen.getByRole('button', {name: /Aptitude Assessments \(card 2 of 3\)/i});

    expect(dot1).toHaveAttribute('aria-current', 'true');
    expect(dot2).toHaveAttribute('aria-current', 'false');

    await user.click(dot2);

    expect(dot1).toHaveAttribute('aria-current', 'false');
    expect(dot2).toHaveAttribute('aria-current', 'true');
  });
});

describe('Business Assessment Suite integration — Red Pill (states & edge cases)', () => {
  it('renders loading skeleton state with aria-busy', () => {
    render(<App catalogueOptions={{initialStatus: 'loading'}} />);

    const loadingRegion = screen.getByRole('status', {name: 'Loading assessments'});
    expect(loadingRegion).toHaveAttribute('aria-busy', 'true');
    expect(screen.queryByRole('heading', {name: 'Behaviour Assessments'})).not.toBeInTheDocument();
  });

  it('renders empty state when catalogue is empty and reloads tools on action click', async () => {
    const user = userEvent.setup();
    render(<App catalogueOptions={{initialTools: []}} />);

    expect(screen.getByRole('heading', {name: 'No assessments available'})).toBeInTheDocument();
    await user.click(screen.getByRole('button', {name: 'Reload assessments'}));

    expect(screen.getByRole('heading', {name: 'Behaviour Assessments'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Aptitude Assessments'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Personality Assessments'})).toBeInTheDocument();
  });

  it('renders error alert when given malformed data and recovers on retry', async () => {
    const user = userEvent.setup();
    const invalidPayload = 'corrupted-data' as unknown as AssessmentTool[];
    render(<App catalogueOptions={{initialTools: invalidPayload}} />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Assessment catalogue data must be an array.');

    await user.click(screen.getByRole('button', {name: 'Try again'}));
    expect(screen.getByRole('heading', {name: 'Behaviour Assessments'})).toBeInTheDocument();
  });

  it('respects prefers-reduced-motion media query without crashing', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<App />);
    const card = screen.getByRole('link', {
      name: /Behaviour Assessments.*Psychometric framework analytics/i,
    });
    expect(card).toHaveClass('tool-card--visible');

    window.matchMedia = originalMatchMedia;
  });
});
