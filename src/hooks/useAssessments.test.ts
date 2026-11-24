import {act, renderHook} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {ASSESSMENTS_CATALOGUE} from '../data/assessments';
import type {AssessmentTool} from '../types/assessment';
import {useAssessments} from './useAssessments';

describe('useAssessments hook — Blue Pill & Red Pill', () => {
  it('Blue Pill: initializes in ready state with all three assessments', () => {
    const {result} = renderHook(() => useAssessments());

    expect(result.current.status).toBe('ready');
    expect(result.current.errorMessage).toBeNull();
    expect(result.current.tools).toHaveLength(3);
  });

  it('Red Pill: enters empty state when given an empty or all-invalid list and recovers on retry', () => {
    const invalidOnly = [
      {...ASSESSMENTS_CATALOGUE[0], url: 'javascript:alert(1)'},
    ] as AssessmentTool[];

    const {result} = renderHook(() => useAssessments({initialTools: invalidOnly}));

    expect(result.current.status).toBe('empty');
    expect(result.current.tools).toHaveLength(0);

    act(() => {
      result.current.retry();
    });

    expect(result.current.status).toBe('ready');
    expect(result.current.tools).toHaveLength(3);
  });

  it('Red Pill: enters error state on invalid non-array data and recovers on retry', () => {
    const malformedPayload = {invalid: true} as unknown as AssessmentTool[];
    const {result} = renderHook(() => useAssessments({initialTools: malformedPayload}));

    expect(result.current.status).toBe('error');
    expect(result.current.errorMessage).toBe('Assessment catalogue data must be an array.');

    act(() => {
      result.current.retry();
    });

    expect(result.current.status).toBe('ready');
    expect(result.current.tools).toHaveLength(3);
  });

  it('Red Pill: respects explicit loading state', () => {
    const {result} = renderHook(() => useAssessments({initialStatus: 'loading'}));

    expect(result.current.status).toBe('loading');
    expect(result.current.tools).toHaveLength(0);
  });
});
