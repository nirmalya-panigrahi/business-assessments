import {useCallback, useEffect, useState} from 'react';
import {ASSESSMENTS_CATALOGUE} from '../data/assessments';
import type {
  AssessmentTool,
  CatalogueStatus,
  UseAssessmentsOptions,
  UseAssessmentsResult,
} from '../types/assessment';
import {validateAssessments} from '../utils/assessments';

interface CatalogueState {
  tools: AssessmentTool[];
  status: CatalogueStatus;
  errorMessage: string | null;
}

function buildInitialState(options?: UseAssessmentsOptions): CatalogueState {
  if (options?.initialStatus === 'loading') {
    return {tools: [], status: 'loading', errorMessage: null};
  }
  if (options?.initialStatus === 'error') {
    return {
      tools: [],
      status: 'error',
      errorMessage: options.initialError ?? 'Unable to load the assessment catalogue.',
    };
  }
  if (options?.initialStatus === 'empty') {
    return {tools: [], status: 'empty', errorMessage: null};
  }

  try {
    const source = options?.initialTools ?? ASSESSMENTS_CATALOGUE;
    const validTools = validateAssessments(source);
    return {
      tools: validTools,
      status: validTools.length === 0 ? 'empty' : 'ready',
      errorMessage: null,
    };
  } catch (err) {
    return {
      tools: [],
      status: 'error',
      errorMessage:
        err instanceof Error ? err.message : 'Unable to load the assessment catalogue.',
    };
  }
}

export function useAssessments(options?: UseAssessmentsOptions): UseAssessmentsResult {
  const [state, setState] = useState<CatalogueState>(() => buildInitialState(options));

  useEffect(() => {
    setState(buildInitialState(options));
  }, [options?.initialTools, options?.initialStatus, options?.initialError]);

  const retry = useCallback(() => {
    try {
      const validTools = validateAssessments(ASSESSMENTS_CATALOGUE);
      setState({
        tools: validTools,
        status: validTools.length === 0 ? 'empty' : 'ready',
        errorMessage: null,
      });
    } catch (err) {
      setState({
        tools: [],
        status: 'error',
        errorMessage:
          err instanceof Error ? err.message : 'Unable to load the assessment catalogue.',
      });
    }
  }, []);

  return {
    tools: state.tools,
    status: state.status,
    errorMessage: state.errorMessage,
    retry,
  };
}
