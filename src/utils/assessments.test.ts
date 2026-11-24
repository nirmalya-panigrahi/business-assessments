import {describe, expect, it} from 'vitest';
import {ASSESSMENTS_CATALOGUE} from '../data/assessments';
import type {AssessmentTool} from '../types/assessment';
import {
  clampCardIndex,
  getClosestCardIndex,
  isValidHttpUrl,
  normalizeAssessment,
  validateAssessments,
} from './assessments';

describe('assessments utilities — Blue Pill (happy path)', () => {
  it('accepts valid HTTP and HTTPS URLs', () => {
    expect(isValidHttpUrl('https://behaviour-assessments.vercel.app/')).toBe(true);
    expect(isValidHttpUrl('http://localhost:3000/test')).toBe(true);
    expect(isValidHttpUrl('  https://interview-assessments.vercel.app/  ')).toBe(true);
  });

  it('normalizes and preserves valid assessment records', () => {
    const raw: AssessmentTool = {
      id: 'aptitude',
      indexLabel: ' 02 ',
      name: ' Aptitude Assessments ',
      description: ' Structured talent evaluation platforms. ',
      guidePrompt: ' Evaluate candidates in a structured way ',
      url: ' https://interview-assessments.vercel.app/ ',
      tintColor: ' ',
    };

    expect(normalizeAssessment(raw)).toEqual({
      id: 'aptitude',
      indexLabel: '02',
      name: 'Aptitude Assessments',
      description: 'Structured talent evaluation platforms.',
      guidePrompt: 'Evaluate candidates in a structured way',
      url: 'https://interview-assessments.vercel.app/',
      tintColor: 'var(--surface)',
    });
  });

  it('validates the default three-tool catalogue without loss', () => {
    const validated = validateAssessments(ASSESSMENTS_CATALOGUE);
    expect(validated).toHaveLength(3);
    expect(validated.map((item) => item.name)).toEqual([
      'Behaviour Assessments',
      'Aptitude Assessments',
      'Personality Assessments',
    ]);
  });

  it('computes the closest card index from scroll offsets', () => {
    expect(getClosestCardIndex([-320, 12, 344], 16)).toBe(1);
    expect(getClosestCardIndex([-640, -300, 18], 16)).toBe(2);
  });

  it('clamps card indices within valid bounds', () => {
    expect(clampCardIndex(1, 3)).toBe(1);
    expect(clampCardIndex(2, 3)).toBe(2);
  });
});

describe('assessments utilities — Red Pill (adversarial & edge cases)', () => {
  it('rejects dangerous or malformed URLs', () => {
    expect(isValidHttpUrl('javascript:alert(1)')).toBe(false);
    expect(isValidHttpUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
    expect(isValidHttpUrl('ftp://example.com/file')).toBe(false);
    expect(isValidHttpUrl('')).toBe(false);
    expect(isValidHttpUrl('not a url')).toBe(false);
    expect(isValidHttpUrl(null)).toBe(false);
    expect(isValidHttpUrl(12345)).toBe(false);
  });

  it('drops incomplete or unsafe assessment objects', () => {
    expect(normalizeAssessment(null)).toBeNull();
    expect(normalizeAssessment(undefined)).toBeNull();
    expect(
      normalizeAssessment({
        ...ASSESSMENTS_CATALOGUE[0],
        url: 'javascript:void(0)',
      }),
    ).toBeNull();
    expect(
      normalizeAssessment({
        ...ASSESSMENTS_CATALOGUE[0],
        name: '   ',
      }),
    ).toBeNull();
  });

  it('throws on non-array catalogue payloads and strips invalid entries from mixed arrays', () => {
    expect(() => validateAssessments(null)).toThrow('Assessment catalogue data must be an array.');
    expect(() => validateAssessments({bad: true})).toThrow();

    const mixed = [
      ASSESSMENTS_CATALOGUE[0],
      {...ASSESSMENTS_CATALOGUE[1], url: 'javascript:alert(1)'},
      ASSESSMENTS_CATALOGUE[2],
    ];
    const result = validateAssessments(mixed);
    expect(result).toHaveLength(2);
    expect(result.map((t) => t.id)).toEqual(['behaviour', 'personality']);
  });

  it('handles empty, NaN, and out-of-range carousel calculations safely', () => {
    expect(getClosestCardIndex([], 16)).toBe(0);
    expect(getClosestCardIndex([Number.NaN, Number.POSITIVE_INFINITY], Number.NaN)).toBe(0);
    expect(clampCardIndex(-5, 3)).toBe(0);
    expect(clampCardIndex(99, 3)).toBe(2);
    expect(clampCardIndex(Number.NaN, 3)).toBe(0);
    expect(clampCardIndex(1, 0)).toBe(0);
  });
});
